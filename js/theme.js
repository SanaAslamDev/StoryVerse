/* ============================================
   STORYVERSE — THEME.JS
   Theme is locked to light mode.
   Dark mode removed by design choice.
   ============================================ */

// Always force light theme — no toggle
document.documentElement.setAttribute('data-theme', 'light');
localStorage.setItem('storyverse_theme', 'light');