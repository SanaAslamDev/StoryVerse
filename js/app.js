/* ============================================
   STORYVERSE — APP.JS
   This file runs first on every page.
   It sets up global things that every
   other script depends on.
   ============================================ */

// The version of our app data structure.
// If we change how we store data in the future,
// we increment this so old data gets cleared.
const APP_VERSION = '1.0.0';

// The name we use for Local Storage keys
// Using a prefix avoids conflicts with other
// websites that might use the same key names
const APP_PREFIX = 'storyverse_';

// Log that the app started (helpful during development)
console.log('StoryVerse v' + APP_VERSION + ' initialized');