/* ================================================================
   AimRivals — scores.js
   Weekly global leaderboard + IP-based personal bests via Firebase.
   Leaderboard resets every Monday. Personal bests are permanent.
   ================================================================ */

const Scores = (() => {
  'use strict';

  const FIREBASE_URL = 'https://aimrivals-default-rtdb.asia-southeast1.firebasedatabase.app';
  const MODES   = ['tracking', 'flicking', 'switching'];
  const LS_KEY  = 'aimrivals_lb_v5';
  const BEST_KEY = 'aimrivals_best';

  let cache     = null;
  let saving    = false;
  let _ipKey    = null; // resolved once, reused

  // ── Simple hash (djb2) for IP privacy ──────────────────────────
  function hashStr(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
    return (h >>> 0).toString(36); // unsigned 32-bit, base36
  }

  // ── Get persistent anonymous UUID (no IP tracking) ────────────
  async function getIpKey() {
    if (typeof Auth !== 'undefined' && Auth.isSignedIn()) {
      return 'uid_' + Auth.getUid();
    }
    if (_ipKey) return _ipKey;
    let id = localStorage.getItem('aimrivals_uid');
    if (!id) {
      id = 'anon_' + Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2,'0')).join('');
      localStorage.setItem('aimrivals_uid', id);
    }
    _ipKey = id;
    return _ipKey;
  }

  // ── ISO week key ────────────────────────────────────────────────
  function getWeekKey() {
    const now = new Date();
    const day = now.getUTCDay() || 7;
    const mon = new Date(now);
    mon.setUTCDate(now.getUTCDate() - (day - 1));
    const y     = mon.getUTCFullYear();
    const start = new Date(Date.UTC(y, 0, 1));
    const week  = Math.ceil(((mon - start) / 86400000 + start.getUTCDay() + 1) / 7);
    return `${y}-W${String(week).padStart(2, '0')}`;
  }

  function weekPath() { return `/weeks/v2_${getWeekKey()}`; }
  function empty()    { return { tracking:[], flicking:[], switching:[], week: getWeekKey() }; }

  function lsRead()   { try { return JSON.parse(localStorage.getItem(LS_KEY));   } catch { return null; } }
  function lsWrite(d) { try { localStorage.setItem(LS_KEY, JSON.stringify(d));   } catch {} }
  function lsBestRead()   { try { return JSON.parse(localStorage.getItem(BEST_KEY)) || {}; } catch { return {}; } }
  function lsBestWrite(d) { try { localStorage.setItem(BEST_KEY, JSON.stringify(d)); } catch {} }

  // ══════════════════════════════════════════════════════════════
  //  WEEKLY LEADERBOARD
  // ══════════════════════════════════════════════════════════════

  async function load() {
    try {
      const res  = await fetch(`${FIREBASE_URL}${weekPath()}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rec  = data || empty();
      MODES.forEach(m => { if (!Array.isArray(rec[m])) rec[m] = []; });
      rec.week = getWeekKey();
      cache = rec;
      lsWrite(rec);
      // Clean up old weeks in the background (don't await — non-blocking)
      cleanOldWeeks();
      return rec;
    } catch (e) {
      console.warn('[Scores] load failed — using cache:', e.message);
      const cached = lsRead();
      if (cached && cached.week === getWeekKey()) { cache = cached; return cache; }
      cache = empty();
      return cache;
    }
  }

  // ── Delete old week data from Firebase (keep last 2 weeks max) ──
  async function cleanOldWeeks() {
    try {
      const res  = await fetch(`${FIREBASE_URL}/weeks.json?shallow=true`);
      if (!res.ok) return;
      const keys = await res.json();
      if (!keys) return;
      const currentWeek = getWeekKey();
      const allWeeks = Object.keys(keys).sort();
      // Delete any week that isn't the current one
      for (const week of allWeeks) {
        if (week !== currentWeek) {
          await fetch(`${FIREBASE_URL}/weeks/${week}.json`, { method: 'DELETE' });
        }
      }
    } catch (e) {
      console.warn('[Scores] cleanOldWeeks failed:', e.message);
    }
  }

  async function save(data) {
    if (saving) return;
    saving = true;
    lsWrite(data);
    try {
      const res = await fetch(`${FIREBASE_URL}${weekPath()}.json`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      cache = data;
    } catch (e) {
      console.warn('[Scores] save failed:', e.message);
    } finally {
      saving = false;
    }
  }

  // One entry per name per mode — updates if new score beats old one
  async function submit(mode, score, name, difficulty) {
    const data      = await load();
    if (!Array.isArray(data[mode])) data[mode] = [];
    const cleanName = (name || '').trim().slice(0, 20);
    if (!cleanName || cleanName.toLowerCase() === 'anonymous') return data[mode]; // reject blank/anonymous
    const roundedScore = Math.round(score);
    const existing  = data[mode].findIndex(
      e => e.name.toLowerCase() === cleanName.toLowerCase()
    );
    if (existing !== -1) {
      if (roundedScore <= data[mode][existing].score) return data[mode]; // not a new best
      data[mode].splice(existing, 1); // remove old entry, replace with new best
    }
    data[mode].push({
      name:       cleanName,
      score:      roundedScore,
      difficulty: difficulty || 'beginner',
      date:       new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short' }),
      ts:         Date.now(),
    });
    data[mode].sort((a, b) => b.score - a.score);
    if (data[mode].length > 200) data[mode] = data[mode].slice(0, 200);
    await save(data);
    return data[mode];
  }

  async function getTop(mode, n = 10) {
    const data = cache || await load();
    return (data[mode] || []).slice(0, n);
  }

  // ══════════════════════════════════════════════════════════════
  //  GLOBAL PERSONAL BESTS  — stored by hashed IP in Firebase
  //  Path: /bests/<ipKey>/tracking|flicking|switching
  //  Permanent — never resets with the weekly leaderboard.
  // ══════════════════════════════════════════════════════════════

  async function loadBests() {
    const key = await getIpKey();
    try {
      const res  = await fetch(`${FIREBASE_URL}/bests/${key}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const bests = data || {};
      // Merge with localStorage — take the higher value
      const local = lsBestRead();
      MODES.forEach(m => {
        const fb  = bests[m]  ?? null;
        const ls  = local[m]  ?? null;
        bests[m]  = (fb !== null && ls !== null) ? Math.max(fb, ls) : (fb ?? ls);
      });
      lsBestWrite(bests);
      return bests;
    } catch (e) {
      console.warn('[Scores] loadBests failed — using localStorage:', e.message);
      return lsBestRead();
    }
  }

  async function saveBest(mode, score) {
    const key          = await getIpKey();
    const roundedScore = Math.round(score);
    // Update localStorage immediately
    const local = lsBestRead();
    if (local[mode] != null && local[mode] >= roundedScore) return; // not a new best
    local[mode] = roundedScore;
    lsBestWrite(local);
    // Push to Firebase
    try {
      const res = await fetch(`${FIREBASE_URL}/bests/${key}.json`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ [mode]: roundedScore }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      console.warn('[Scores] saveBest failed:', e.message);
    }
  }

  // ── Week label for UI ─────────────────────────────────────────
  function getWeekLabel() {
    const now = new Date();
    const day = now.getUTCDay() || 7;
    const mon = new Date(now);
    mon.setUTCDate(now.getUTCDate() - (day - 1));
    const sun = new Date(mon);
    sun.setUTCDate(mon.getUTCDate() + 6);
    const fmt = d => d.toLocaleDateString('en-GB', { day:'2-digit', month:'short' });
    return `${fmt(mon)} – ${fmt(sun)}`;
  }

  return { load, submit, getTop, getWeekKey, getWeekLabel, loadBests, saveBest };
})();
