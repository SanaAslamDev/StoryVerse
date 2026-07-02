/* ============================================
   STORYVERSE — AUTH.JS
   Handles register and login logic.

   How it works in Phase 1:
   - Register: save user to Local Storage
   - Login: find matching user in Local Storage
   - Both: redirect to dashboard on success
   ============================================ */


/* ============================================
   PART 1: SHARED HELPERS
   Used by both register and login
   ============================================ */

/* Show an error message inside the error box */
function showAuthError(errorBoxId, errorTextId, message) {
  const errorBox  = document.getElementById(errorBoxId);
  const errorText = document.getElementById(errorTextId);

  errorText.textContent = message;
  errorBox.classList.add('auth-error-box--visible');
}

/* Hide the error box */
function hideAuthError(errorBoxId) {
  const errorBox = document.getElementById(errorBoxId);
  errorBox.classList.remove('auth-error-box--visible');
}

/* Check if an email address looks valid */
function isValidEmail(email) {
  // This pattern checks for basic "something@something.something" format
  return email.includes('@') && email.includes('.');
}

/* Set up password show/hide toggle for any password input */
function setupPasswordToggle(toggleButtonId, passwordInputId) {
  const toggleButton  = document.getElementById(toggleButtonId);
  const passwordInput = document.getElementById(passwordInputId);

  // Only set up if both elements exist on the current page
  if (!toggleButton || !passwordInput) {
    return;
  }

  toggleButton.addEventListener('click', function () {
    const isCurrentlyHidden = passwordInput.type === 'password';

    if (isCurrentlyHidden) {
      passwordInput.type = 'text';    // Show the password
    } else {
      passwordInput.type = 'password'; // Hide it again
    }
  });
}

// Set up toggles for both pages (only runs on the page that has them)
setupPasswordToggle('registerPasswordToggle', 'registerPassword');
setupPasswordToggle('loginPasswordToggle', 'loginPassword');


/* ============================================
   PART 2: REGISTER LOGIC
   ============================================ */

const registerForm = document.getElementById('registerForm');

// Only run if we're on the register page
if (registerForm) {

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();    // Stop page from reloading

    // Read all field values
    const fullName  = document.getElementById('registerName').value.trim();
    const email     = document.getElementById('registerEmail').value.trim();
    const username  = document.getElementById('registerUsername').value.trim();
    const password  = document.getElementById('registerPassword').value;

    // Hide any old error before validating again
    hideAuthError('registerErrorBox');


    /* ── VALIDATION ──
       Check each field before saving.
       Show an error and stop if anything is wrong.
    ------------------------------------------------ */

    if (fullName === '') {
      showAuthError('registerErrorBox', 'registerErrorText', 'Please enter your full name.');
      return;
    }

    if (!isValidEmail(email)) {
      showAuthError('registerErrorBox', 'registerErrorText', 'Please enter a valid email address.');
      return;
    }

    if (username === '') {
      showAuthError('registerErrorBox', 'registerErrorText', 'Please choose a username.');
      return;
    }

    if (password.length < 6) {
      showAuthError('registerErrorBox', 'registerErrorText', 'Password must be at least 6 characters.');
      return;
    }

    // Load existing users so we can check for duplicates
    const existingUsers = loadAllUsers();

    // Check if this email is already registered
    const emailAlreadyUsed = existingUsers.find(function (user) {
      return user.email === email;
    });

    if (emailAlreadyUsed) {
      showAuthError('registerErrorBox', 'registerErrorText', 'An account with this email already exists.');
      return;
    }

    // Check if this username is already taken
    const usernameAlreadyTaken = existingUsers.find(function (user) {
      return user.username === username;
    });

    if (usernameAlreadyTaken) {
      showAuthError('registerErrorBox', 'registerErrorText', 'This username is already taken. Try another.');
      return;
    }


    /* ── CREATE THE NEW USER OBJECT ── */
    const newUser = {
      id:          Date.now(),   // Simple unique ID using current timestamp
      fullName:    fullName,
      email:       email,
      username:    username,
      password:    password,     // Phase 3: we'll hash this with bcrypt
      avatar:      '',           // Empty for now, user can upload later
      bio:         '',
      joinedDate:  new Date().toISOString(),
      articles:    [],
      bookmarks:   [],
      followers:   [],
      following:   []
    };

    /* ── SAVE THE USER ── */
    // Add to the full list of users
    existingUsers.push(newUser);
    saveAllUsers(existingUsers);

    // Also log them in immediately after registering
    saveCurrentUser(newUser);

    // Send them to the dashboard
    window.location.href = 'dashboard.html';
  });

}


/* ============================================
   PART 3: LOGIN LOGIC
   ============================================ */

const loginForm = document.getElementById('loginForm');

// Only run if we're on the login page
if (loginForm) {

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    hideAuthError('loginErrorBox');


    /* ── VALIDATION ── */

    if (!isValidEmail(email)) {
      showAuthError('loginErrorBox', 'loginErrorText', 'Please enter a valid email address.');
      return;
    }

    if (password === '') {
      showAuthError('loginErrorBox', 'loginErrorText', 'Please enter your password.');
      return;
    }


    /* ── CHECK CREDENTIALS ── */
    const allUsers = loadAllUsers();

    // Try to find a user whose email AND password both match
    const matchingUser = allUsers.find(function (user) {
      return user.email === email && user.password === password;
    });

    if (!matchingUser) {
      showAuthError('loginErrorBox', 'loginErrorText', 'Incorrect email or password. Please try again.');
      return;
    }

    // Credentials matched — save as current user and go to dashboard
    saveCurrentUser(matchingUser);
    window.location.href = 'dashboard.html';
  });

}