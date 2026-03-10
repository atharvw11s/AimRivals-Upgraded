/* ================================================================
   AimRivals — auth.js
   Firebase Authentication: Google + GitHub sign-in.
   Falls back gracefully to IP-based tracking if not signed in.
   ================================================================ */

const Auth = (() => {
  'use strict';

  // ── Firebase config ────────────────────────────────────────────
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

  let app  = null;
  let auth = null;
  let currentUser = null;

  function init() {
    try {
      if (!firebase?.apps?.length) {
        app  = firebase.initializeApp(firebaseConfig);
      } else {
        app  = firebase.apps[0];
      }
      auth = firebase.auth();

      auth.onAuthStateChanged(user => {
        currentUser = user;
        _updateUI(user);
        if (user) {
          // Save display name for leaderboard prefill
          localStorage.setItem('aimrivals_name', user.displayName || user.email?.split('@')[0] || 'Player');
        }
      });
    } catch(e) {
      console.warn('[Auth] Firebase init failed:', e.message);
    }
  }

  function openModal() {
    document.getElementById('authModalBg')?.classList.add('visible');
  }
  function closeModal() {
    document.getElementById('authModalBg')?.classList.remove('visible');
  }

  async function signInGoogle() {
    if (!auth) return;
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      closeModal();
    } catch(e) { console.warn('[Auth] Google sign-in failed:', e.message); }
  }

  async function signInGitHub() {
    if (!auth) return;
    try {
      const provider = new firebase.auth.GithubAuthProvider();
      await auth.signInWithPopup(provider);
      closeModal();
    } catch(e) { console.warn('[Auth] GitHub sign-in failed:', e.message); }
  }

  async function signOut() {
    if (!auth) return;
    try { await auth.signOut(); closeModal(); }
    catch(e) { console.warn('[Auth] Sign-out failed:', e.message); }
  }

  function getUid() {
    // Returns Firebase UID if signed in, null otherwise
    return currentUser?.uid || null;
  }

  function getDisplayName() {
    return currentUser?.displayName || currentUser?.email?.split('@')[0] || null;
  }

  function isSignedIn() { return !!currentUser; }

  function _updateUI(user) {
    const navBtn       = document.getElementById('navSignInBtn');
    const signedOut    = document.getElementById('authSignedOut');
    const signedIn     = document.getElementById('authSignedIn');
    const authAvatar   = document.getElementById('authAvatar');
    const authUsername = document.getElementById('authUsername');
    const authEmail    = document.getElementById('authUserEmail');
    const nmAuthRow    = document.getElementById('nmAuthRow');
    const nmAuthAvatar = document.getElementById('nmAuthAvatar');
    const nmAuthName   = document.getElementById('nmAuthName');
    const nmSignInLink = document.getElementById('nmSignInLink');
    const nmInput      = document.getElementById('nmNameInput');

    if (user) {
      if (navBtn)    { navBtn.textContent = user.displayName?.split(' ')[0] || 'Account'; navBtn.classList.add('signed-in'); }
      if (signedOut) signedOut.style.display = 'none';
      if (signedIn)  signedIn.style.display  = 'block';
      if (authAvatar)   authAvatar.src        = user.photoURL || '';
      if (authUsername) authUsername.textContent = user.displayName || 'Player';
      if (authEmail)    authEmail.textContent    = user.email || '';
      // Name modal — show avatar row, hide sign-in link
      if (nmAuthRow) { nmAuthRow.style.display = 'flex'; }
      if (nmAuthAvatar) nmAuthAvatar.src = user.photoURL || '';
      if (nmAuthName)   nmAuthName.textContent = user.displayName || 'Player';
      if (nmSignInLink) nmSignInLink.style.display = 'none';
      if (nmInput)   { nmInput.value = user.displayName || ''; nmInput.style.display = 'none'; }
    } else {
      if (navBtn)    { navBtn.textContent = 'Sign In'; navBtn.classList.remove('signed-in'); }
      if (signedOut) signedOut.style.display = 'block';
      if (signedIn)  signedIn.style.display  = 'none';
      if (nmAuthRow)    nmAuthRow.style.display    = 'none';
      if (nmSignInLink) nmSignInLink.style.display = 'block';
      if (nmInput)   { nmInput.style.display = ''; }
    }
  }

  // Wire up buttons after DOM ready
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
