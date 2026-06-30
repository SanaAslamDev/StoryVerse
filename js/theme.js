/* ============================================
   STORYVERSE — THEME.JS
   Handles light/dark mode toggle.
   Saves the user's preference to Local Storage
   so it persists across page refreshes.
   ============================================ */

const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlElement    = document.documentElement; // This is the <html> tag

// The key we use to save theme in Local Storage
const THEME_STORAGE_KEY = APP_PREFIX + 'theme';

/* ── LOAD SAVED THEME ──
   When the page loads, check if the user
   previously chose a theme and apply it.
------------------------------------------------ */
function loadSavedTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  // If they chose dark before, apply it
  if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
  } else {
    // Default to light theme
    htmlElement.setAttribute('data-theme', 'light');
  }
}

/* ── TOGGLE THEME ──
   Switch between light and dark,
   then save the choice.
------------------------------------------------ */
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');

  if (currentTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
  } else {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
  }
}

// Run on page load
loadSavedTheme();

// Toggle when navbar button is clicked
themeToggleBtn.addEventListener('click', toggleTheme);

// Toggle when footer button is clicked (if it exists on this page)
const footerThemeToggleBtn = document.getElementById('footerThemeToggleBtn');
if (footerThemeToggleBtn) {
  footerThemeToggleBtn.addEventListener('click', toggleTheme);
}