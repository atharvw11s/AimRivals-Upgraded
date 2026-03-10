/* ================================================================
   AimRivals — auth.js
   Firebase Authentication: Google + GitHub sign-in.
   Fails gracefully if Firebase is not configured.
   ================================================================ */

const Auth = (() => {
  'use strict';

  const firebaseConfig = {
    apiKey:            "REPLACE_WITH_YOUR_API_KEY",
    authDomain:        "REPLACE.firebaseapp.com",
    databaseURL:       "https://aimrivals-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId:         "REPLACE",
    storageBucket:     "REPLACE.appspot.com",
    messagingSenderId: "REPLACE",
    appId:             "REPLACE"
  };

  const CONFIGURED = !firebaseConfig.apiKey.startsWith('REPLACE');

  let auth        = null;
  let currentUser = null;
  let _modalOpen  = false;

  function init() {
    if (!CONFIGURED) {
      console.info('[Auth] Firebase not configured — anonymous mode.');
      _updateUI(null);
      return;
    }
    try {
      if (!firebase?.apps?.length) firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      auth.onAuthStateChanged(user => {
        currentUser = user;
        _updateUI(user);
        if (user) {
          // Use custom display name if set, else use provider name
          const saved = localStorage.getItem('aimrivals_display_name');
          if (!saved) localStorage.setItem('aimrivals_display_name', user.displayName || user.email?.split('@')[0] || 'Player');
        }
      });
    } catch(e) {
      console.warn('[Auth] Firebase init failed:', e.message);
      _updateUI(null);
    }
  }

  function openModal() {
    _modalOpen = true;
    document.getElementById('authModalBg')?.classList.add('visible');
  }
  function closeModal() {
    _modalOpen = false;
    document.getElementById('authModalBg')?.classList.remove('visible');
  }

  async function signInGoogle() {
    if (!auth) return;
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      // Use redirect on mobile, popup on desktop
      await auth.signInWithPopup(provider);
      // onAuthStateChanged handles UI — just close modal
      closeModal();
    } catch(e) {
      if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
        console.warn('[Auth] Google sign-in failed:', e.message);
      }
    }
  }

  async function signInGitHub() {
    if (!auth) return;
    try {
      const provider = new firebase.auth.GithubAuthProvider();
      await auth.signInWithPopup(provider);
      closeModal();
    } catch(e) {
      if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
        console.warn('[Auth] GitHub sign-in failed:', e.message);
      }
    }
  }

  async function signOut() {
    if (!auth) return;
    try { await auth.signOut(); closeModal(); }
    catch(e) { console.warn('[Auth] Sign-out failed:', e.message); }
  }

  function getUid()         { return currentUser?.uid || null; }
  function isSignedIn()     { return !!currentUser; }
  function getDisplayName() {
    return localStorage.getItem('aimrivals_display_name')
      || currentUser?.displayName
      || currentUser?.email?.split('@')[0]
      || null;
  }

  function saveDisplayName(name) {
    const clean = name.trim().slice(0, 20);
    if (!clean) return;
    localStorage.setItem('aimrivals_display_name', clean);
    // Update name shown in modal
    const el = document.getElementById('authDisplayName');
    if (el) el.value = clean;
    _updateNavBtn();
  }

  function _updateNavBtn() {
    const navBtn = document.getElementById('navSignInBtn');
    if (!navBtn) return;
    if (currentUser) {
      const name = getDisplayName();
      navBtn.textContent = name?.split(' ')[0] || 'Account';
      navBtn.classList.add('signed-in');
    } else {
      navBtn.textContent = 'Sign In';
      navBtn.classList.remove('signed-in');
    }
  }

  function _updateUI(user) {
    const signedOut    = document.getElementById('authSignedOut');
    const signedIn     = document.getElementById('authSignedIn');
    const nmAuthRow    = document.getElementById('nmAuthRow');
    const nmSignInLink = document.getElementById('nmSignInLink');
    const nmInput      = document.getElementById('nmNameInput');

    _updateNavBtn();

    if (user) {
      if (signedOut) signedOut.style.display = 'none';
      if (signedIn)  signedIn.style.display  = 'block';

      const av = document.getElementById('authAvatar');
      const un = document.getElementById('authUsername');
      const em = document.getElementById('authUserEmail');
      const dn = document.getElementById('authDisplayName');
      if (av) av.src = user.photoURL || '';
      if (un) un.textContent = getDisplayName();
      if (em) em.textContent = user.email || '';
      if (dn) dn.value = getDisplayName() || '';

      if (nmAuthRow) {
        nmAuthRow.style.display = 'flex';
        const na = document.getElementById('nmAuthAvatar');
        const nn = document.getElementById('nmAuthName');
        if (na) na.src = user.photoURL || '';
        if (nn) nn.textContent = getDisplayName();
      }
      if (nmSignInLink) nmSignInLink.style.display = 'none';
      if (nmInput)      { nmInput.value = getDisplayName() || ''; nmInput.style.display = 'none'; }
    } else {
      if (signedOut) signedOut.style.display = 'block';
      if (signedIn)  signedIn.style.display  = 'none';
      if (nmAuthRow)    nmAuthRow.style.display    = 'none';
      if (nmSignInLink) nmSignInLink.style.display = 'block';
      if (nmInput)      nmInput.style.display      = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    init();

    // Backdrop click — only close if clicking the bg itself, not during popup
    document.getElementById('authModalBg')?.addEventListener('mousedown', e => {
      if (e.target.id === 'authModalBg') closeModal();
    });
    document.getElementById('authClose')     ?.addEventListener('click', closeModal);
    document.getElementById('authGoogleBtn') ?.addEventListener('click', signInGoogle);
    document.getElementById('authGithubBtn') ?.addEventListener('click', signInGitHub);
    document.getElementById('authSignOutBtn')?.addEventListener('click', signOut);

    // Save display name on input
    document.getElementById('authDisplayName')?.addEventListener('input', e => {
      saveDisplayName(e.target.value);
    });
  });

  return { openModal, closeModal, signInGoogle, signInGitHub, signOut, getUid, getDisplayName, isSignedIn, saveDisplayName };
})();
