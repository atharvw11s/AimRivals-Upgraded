/* ================================================================
   AimRivals — auth.js
   Firebase Authentication: Google + GitHub sign-in.
   Fails gracefully if Firebase is not configured yet.
   ================================================================ */

const Auth = (() => {
  'use strict';

  // ── Paste your real Firebase config here ──────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDIECy6W98CGpksmL74wYRp4BJ--e6clx4",
  authDomain: "aimrivals.firebaseapp.com",
  databaseURL: "https://aimrivals-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aimrivals",
  storageBucket: "aimrivals.firebasestorage.app",
  messagingSenderId: "398111990265",
  appId: "1:398111990265:web:b14c43e36b083d69469d28",
  measurementId: "G-YL9Z24X1RE"
};

  const CONFIGURED = !firebaseConfig.apiKey.startsWith('REPLACE');

  let auth        = null;
  let currentUser = null;

  function init() {
    if (!CONFIGURED) {
      console.info('[Auth] Firebase not configured — running in anonymous mode.');
      _updateUI(null);
      return;
    }
    try {
      if (!firebase?.apps?.length) firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      auth.onAuthStateChanged(user => {
        currentUser = user;
        _updateUI(user);
        if (user) localStorage.setItem('aimrivals_name', user.displayName || user.email?.split('@')[0] || 'Player');
      });
    } catch(e) {
      console.warn('[Auth] Firebase init failed:', e.message);
      _updateUI(null);
    }
  }

  function openModal()  { document.getElementById('authModalBg')?.classList.add('visible'); }
  function closeModal() { document.getElementById('authModalBg')?.classList.remove('visible'); }

  async function signInGoogle() {
    if (!auth) return;
    try { await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); closeModal(); }
    catch(e) { console.warn('[Auth] Google sign-in failed:', e.message); }
  }

  async function signInGitHub() {
    if (!auth) return;
    try { await auth.signInWithPopup(new firebase.auth.GithubAuthProvider()); closeModal(); }
    catch(e) { console.warn('[Auth] GitHub sign-in failed:', e.message); }
  }

  async function signOut() {
    if (!auth) return;
    try { await auth.signOut(); closeModal(); }
    catch(e) { console.warn('[Auth] Sign-out failed:', e.message); }
  }

  function getUid()         { return currentUser?.uid || null; }
  function getDisplayName() { return currentUser?.displayName || currentUser?.email?.split('@')[0] || null; }
  function isSignedIn()     { return !!currentUser; }

  function _updateUI(user) {
    const navBtn       = document.getElementById('navSignInBtn');
    const signedOut    = document.getElementById('authSignedOut');
    const signedIn     = document.getElementById('authSignedIn');
    const nmAuthRow    = document.getElementById('nmAuthRow');
    const nmSignInLink = document.getElementById('nmSignInLink');
    const nmInput      = document.getElementById('nmNameInput');

    if (user) {
      if (navBtn)    { navBtn.textContent = user.displayName?.split(' ')[0] || 'Account'; navBtn.classList.add('signed-in'); }
      if (signedOut) signedOut.style.display = 'none';
      if (signedIn)  {
        signedIn.style.display = 'block';
        const av = document.getElementById('authAvatar');
        const un = document.getElementById('authUsername');
        const em = document.getElementById('authUserEmail');
        if (av) av.src = user.photoURL || '';
        if (un) un.textContent = user.displayName || 'Player';
        if (em) em.textContent = user.email || '';
      }
      if (nmAuthRow) {
        nmAuthRow.style.display = 'flex';
        const na = document.getElementById('nmAuthAvatar');
        const nn = document.getElementById('nmAuthName');
        if (na) na.src = user.photoURL || '';
        if (nn) nn.textContent = user.displayName || 'Player';
      }
      if (nmSignInLink) nmSignInLink.style.display = 'none';
      if (nmInput)      { nmInput.value = user.displayName || ''; nmInput.style.display = 'none'; }
    } else {
      if (navBtn)       { navBtn.textContent = 'Sign In'; navBtn.classList.remove('signed-in'); }
      if (signedOut)    signedOut.style.display  = 'block';
      if (signedIn)     signedIn.style.display   = 'none';
      if (nmAuthRow)    nmAuthRow.style.display    = 'none';
      if (nmSignInLink) nmSignInLink.style.display = 'block';
      if (nmInput)      nmInput.style.display      = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    init();
    document.getElementById('authClose')     ?.addEventListener('click', closeModal);
    document.getElementById('authModalBg')   ?.addEventListener('click', e => { if (e.target.id === 'authModalBg') closeModal(); });
    document.getElementById('authGoogleBtn') ?.addEventListener('click', signInGoogle);
    document.getElementById('authGithubBtn') ?.addEventListener('click', signInGitHub);
    document.getElementById('authSignOutBtn')?.addEventListener('click', signOut);
  });

  return { openModal, closeModal, signInGoogle, signInGitHub, signOut, getUid, getDisplayName, isSignedIn };
})();
