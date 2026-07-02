

/* ============================================
   STORYVERSE — STORAGE.JS
   All functions that read and write to
   Local Storage live here.

   WHY: Keeping all storage logic in one file
   means that in Phase 3, we only need to
   update THIS file to swap Local Storage
   for real API calls — nothing else changes.
   ============================================ */


/* ── SAVE DATA ──
   Saves any JavaScript value to Local Storage.
   We use JSON.stringify because Local Storage
   can only store plain text strings.
------------------------------------------------ */
function saveToStorage(key, value) {
  const dataAsString = JSON.stringify(value);
  localStorage.setItem(APP_PREFIX + key, dataAsString);
}


/* ── LOAD DATA ──
   Reads a value back from Local Storage.
   We use JSON.parse to convert the string
   back into the original JavaScript value.
------------------------------------------------ */
function loadFromStorage(key) {
  const dataAsString = localStorage.getItem(APP_PREFIX + key);

  // If nothing was stored under that key, return null
  if (dataAsString === null) {
    return null;
  }

  return JSON.parse(dataAsString);
}


/* ── DELETE DATA ── */
function removeFromStorage(key) {
  localStorage.removeItem(APP_PREFIX + key);
}


/* ── USER-SPECIFIC HELPERS ──
   Shortcuts so we don't repeat the same
   key names throughout the codebase.
------------------------------------------------ */

// Save the full list of registered users
function saveAllUsers(usersArray) {
  saveToStorage('users', usersArray);
}

// Load the full list of registered users
function loadAllUsers() {
  const users = loadFromStorage('users');
  // If no users have registered yet, return an empty array
  return users || [];
}

// Save the currently logged-in user's info
function saveCurrentUser(userObject) {
  saveToStorage('current_user', userObject);
}

// Load the currently logged-in user's info
function loadCurrentUser() {
  return loadFromStorage('current_user');
}

// Remove the current user (i.e. log them out)
function clearCurrentUser() {
  removeFromStorage('current_user');
}