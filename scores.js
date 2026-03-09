/* ================================================================
   AimRivals — scores.js
   Persistent global leaderboard using JSONBin.io
   Free, serverless, survives page reloads, shared across all users.

   HOW IT WORKS:
   - On first run we create a bin at jsonbin.io (free tier, no login)
   - The bin ID is stored in localStorage so future visits reuse it
   - Every score submission reads the bin, appends the entry, writes back
   - Top 10 per mode are displayed in the leaderboard table
   ================================================================ */

const Scores = (() => {
  'use strict';

  // ── JSONBin config ──────────────────────────────────────────────
  // Using a shared master bin key hardcoded so ALL visitors
  // contribute to and read from the same leaderboard.
  // The X-Master-Key is a READ+WRITE key for a free jsonbin.io account
  // created specifically for AimRivals-Upgraded.
  const BIN_ID  = '6849a8778561e97a501e2d96';    // will be set on first init
  const API_KEY = '$2a$10$9b4GoO5ms4qlYAqTu6AXZO9IxJL0Dg7XpPlYBSEaS6kILOTeTn6eW';
  const BASE    = 'https://api.jsonbin.io/v3';

  // ── In-memory cache ─────────────────────────────────────────────
  let cache = null;   // { tracking:[], flicking:[], switching:[] }
  let dirty = false;  // true while a write is in-flight

  const EMPTY = () => ({ tracking:[], flicking:[], switching:[] });

  // ── Fetch leaderboard from bin ──────────────────────────────────
  async function load() {
    try {
      const res = await fetch(`${BASE}/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': API_KEY }
      });
      if (!res.ok) throw new Error('fetch failed');
      const json = await res.json();
      cache = json.record || EMPTY();
      // Normalise — ensure all three modes exist
      ['tracking','flicking','switching'].forEach(m => {
        if (!Array.isArray(cache[m])) cache[m] = [];
      });
      return cache;
    } catch (e) {
      console.warn('[Scores] load error:', e);
      cache = cache || EMPTY();
      return cache;
    }
  }

  // ── Write leaderboard back to bin ───────────────────────────────
  async function save(data) {
    if (dirty) return;   // don't stack writes
    dirty = true;
    try {
      await fetch(`${BASE}/b/${BIN_ID}`, {
        method:  'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify(data)
      });
      cache = data;
    } catch (e) {
      console.warn('[Scores] save error:', e);
    } finally {
      dirty = false;
    }
  }

  // ── Submit a new score ──────────────────────────────────────────
  async function submit(mode, score, name) {
    const data = await load();
    if (!Array.isArray(data[mode])) data[mode] = [];

    const entry = {
      name:  (name || 'Anonymous').trim().slice(0, 20),
      score: Math.round(score),
      date:  new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'2-digit' }),
      ts:    Date.now(),
    };

    data[mode].push(entry);
    // Keep top 100 by score (trim old low scores)
    data[mode].sort((a, b) => b.score - a.score);
    if (data[mode].length > 100) data[mode] = data[mode].slice(0, 100);

    await save(data);
    return data[mode];
  }

  // ── Get top N for a mode ────────────────────────────────────────
  async function getTop(mode, n = 10) {
    const data = cache || await load();
    const list = data[mode] || [];
    return list.slice(0, n);
  }

  return { load, submit, getTop };
})();
