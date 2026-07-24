// js/utils.js  — paste this for now
/* ============================================
   STORYVERSE — UTILS.JS
   Helper functions: dates, reading time, etc.
   Built out fully in a later step.
   ============================================ */
/* ── SHARED TOAST NOTIFICATION ──
   Used by write.js, settings.js, profile.js, article.js
------------------------------------------------ */
const toastBox     = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
  toastMessage.textContent = message;
  toastBox.classList.add('toast--visible');

  setTimeout(function () {
    toastBox.classList.remove('toast--visible');
  }, 2500);
}