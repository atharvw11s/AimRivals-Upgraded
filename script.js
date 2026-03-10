/* ================================================================
   AimRivals — scores.js
   Weekly leaderboard + global personal bests via Firebase.
   Personal bests: Firebase UID (if signed in) OR hashed IP.
   Leaderboard resets every Monday.
   ================================================================ */

const Scores = (() => {
  'use strict';

  const FIREBASE_URL = 'https://aimrivals-default-rtdb.asia-southeast1.firebasedatabase.app';
  const MODES    = ['tracking', 'flicking', 'switching'];
  const LS_KEY   = 'aimrivals_lb_v4'; // bumped — forces fresh leaderboard (reset)
  const BEST_KEY = 'aimrivals_best';

  let cache  = null;
  let saving = false;
  let _ipKey = null;

  // ── djb2 hash for IP privacy ───────────────────────────────────
  function hashStr(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
    return (h >>> 0).toString(36);
  }

  // ── Resolve identity key: UID if signed in, hashed IP otherwise ─
  async function getIdentityKey() {
    // Check if user is signed in via Auth
    if (typeof Auth !== 'undefined' && Auth.isSignedIn()) {
      return 'uid_' + Auth.getUid();
    }
    // Fall back to hashed IP
    if (_ipKey) return _ipKey;
    try {
      const res  = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      _ipKey = 'ip_' + hashStr(data.ip);
    } catch {
      let id = localStorage.getItem('aimrivals_uid');
      if (!id) { id = 'anon_' + Math.random().toString(36).slice(2); localStorage.setItem('aimrivals_uid', id); }
      _ipKey = id;
    }
    return _ipKey;
  }

  // ── ISO week key ───────────────────────────────────────────────
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

  function weekPath() { return `/weeks/${getWeekKey()}`; }
  function empty()    { return { tracking:[], flicking:[], switching:[], week: getWeekKey() }; }

  function lsRead()       { try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch { return null; } }
  function lsWrite(d)     { try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch {} }
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
      return rec;
    } catch (e) {
      console.warn('[Scores] load failed:', e.message);
      const cached = lsRead();
      if (cached && cached.week === getWeekKey()) { cache = cached; return cache; }
      cache = empty();
      return cache;
    }
  }

  async function save(data) {
    if (saving) return;
    saving = true;
    lsWrite(data);
    try {
      const res = await fetch(`${FIREBASE_URL}${weekPath()}.json`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      cache = data;
    } catch (e) { console.warn('[Scores] save failed:', e.message); }
    finally { saving = false; }
  }

  // One entry per name — updates position if new score is higher
  async function submit(mode, score, name) {
    const data      = await load();
    if (!Array.isArray(data[mode])) data[mode] = [];
    const cleanName    = (name || 'Anonymous').trim().slice(0, 20);
    const roundedScore = Math.round(score);
    const existing     = data[mode].findIndex(e => e.name.toLowerCase() === cleanName.toLowerCase());
    if (existing !== -1) {
      if (roundedScore <= data[mode][existing].score) return data[mode]; // not a new best
      data[mode].splice(existing, 1);
    }
    data[mode].push({
      name:  cleanName,
      score: roundedScore,
      date:  new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short' }),
      ts:    Date.now(),
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
  //  GLOBAL PERSONAL BESTS — stored by identity key in Firebase
  //  Path: /bests/<uid_or_ip_hash>/<mode>
  //  Permanent — never reset with weekly leaderboard.
  // ══════════════════════════════════════════════════════════════

  async function loadBests() {
    const key = await getIdentityKey();
    try {
      const res  = await fetch(`${FIREBASE_URL}/bests/${key}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data   = await res.json();
      const bests  = data || {};
      const local  = lsBestRead();
      // Merge — keep the higher value from either source
      MODES.forEach(m => {
        const fb = bests[m] ?? null;
        const ls = local[m] ?? null;
        bests[m] = (fb !== null && ls !== null) ? Math.max(fb, ls) : (fb ?? ls);
      });
      lsBestWrite(bests);
      return bests;
    } catch (e) {
      console.warn('[Scores] loadBests failed:', e.message);
      return lsBestRead();
    }
  }

  async function saveBest(mode, score) {
    const key          = await getIdentityKey();
    const roundedScore = Math.round(score);
    const local        = lsBestRead();
    if (local[mode] != null && local[mode] >= roundedScore) return;
    local[mode] = roundedScore;
    lsBestWrite(local);
    try {
      const res = await fetch(`${FIREBASE_URL}/bests/${key}.json`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [mode]: roundedScore }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (e) { console.warn('[Scores] saveBest failed:', e.message); }
  }

  // ── Week label ─────────────────────────────────────────────────
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
