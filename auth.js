/* ================================================================
   Zenith Aim — auth.js
   Firebase Authentication: Google + GitHub sign-in.
   Fails gracefully if Firebase is not configured.
   ================================================================ */

const Auth = (() => {
  'use strict';

  const firebaseConfig = {
    apiKey:            "AIzaSyDIECy6W98CGpksmL74wYRp4BJ--e6clx4",
    authDomain:        "aimrivals.firebaseapp.com",
    databaseURL:       "https://aimrivals-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId:         "aimrivals",
    storageBucket:     "aimrivals.firebasestorage.app",
    messagingSenderId: "398111990265",
    appId:             "1:398111990265:web:b14c43e36b083d69469d28",
    measurementId:     "G-YL9Z24X1RE"
  };

  const CONFIGURED = true;

  let auth        = null;
  let currentUser = null;
  let _modalOpen  = false;
  let _popupOpen  = false;

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
        const wasSignedOut = !currentUser;
        currentUser = user;
        _updateUI(user);
        if (user) {
          // Close modal on successful sign-in
          if (wasSignedOut) closeModal();
          // Only save to localStorage if nothing stored yet — prefer Google name
          const stored = (localStorage.getItem('zenith_display_name') || '').trim();
          if (!stored) {
            const googleName = (user.displayName || user.email?.split('@')[0] || '').trim();
            if (googleName) localStorage.setItem('zenith_display_name', googleName);
          }
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
    _popupOpen = true;
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      _popupOpen = false;
    } catch(e) {
      if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
        console.warn('[Auth] Google sign-in failed:', e.message);
      }
    }
  }

  async function signInGitHub() {
    if (!auth) return;
    _popupOpen = true;
    try {
      const provider = new firebase.auth.GithubAuthProvider();
      await auth.signInWithPopup(provider);
      _popupOpen = false;
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
    const stored = (localStorage.getItem('zenith_display_name') || '').trim();
    return stored
      || currentUser?.displayName?.trim()
      || currentUser?.email?.split('@')[0]
      || null;
  }

  function saveDisplayName(name) {
    const clean = name.trim().slice(0, 20);
    if (!clean) return;
    localStorage.setItem('zenith_display_name', clean);
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
      if (nmInput)      { nmInput.value = getDisplayName() || ''; nmInput.style.display = ''; }
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
      if (e.target.id === 'authModalBg' && !_popupOpen) closeModal();
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
