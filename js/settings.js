/* ============================================
   STORYVERSE — SETTINGS.JS
   Handles the settings page:
   1. Pre-fill form with current user data
   2. Save profile changes
   3. Change password
   4. Delete account
   ============================================ */

const currentUser = loadCurrentUser();

/* Redirect if not logged in */
if (currentUser === null) {
  window.location.href = 'login.html';
}

/* Fill sidebar */
document.getElementById('sidebarAvatar').textContent    = currentUser.fullName.charAt(0).toUpperCase();
document.getElementById('sidebarUserName').textContent  = currentUser.fullName;
document.getElementById('sidebarUserHandle').textContent = '@' + currentUser.username;

/* Pre-fill form fields with current data */
document.getElementById('settingsName').value     = currentUser.fullName   || '';
document.getElementById('settingsUsername').value = currentUser.username   || '';
document.getElementById('settingsBio').value      = currentUser.bio        || '';
document.getElementById('settingsEmail').value    = currentUser.email      || '';


/* ── SAVE PROFILE ── */
document.getElementById('saveProfileBtn').addEventListener('click', function () {
  const newName     = document.getElementById('settingsName').value.trim();
  const newUsername = document.getElementById('settingsUsername').value.trim();
  const newBio      = document.getElementById('settingsBio').value.trim();
  const newEmail    = document.getElementById('settingsEmail').value.trim();

  if (newName === '') {
    showToast('Name cannot be empty.');
    return;
  }

  if (newEmail === '' || !newEmail.includes('@')) {
    showToast('Please enter a valid email.');
    return;
  }

  /* Update the user object */
  currentUser.fullName = newName;
  currentUser.username = newUsername;
  currentUser.bio      = newBio;
  currentUser.email    = newEmail;

  /* Save to both current user and all users list */
  saveCurrentUser(currentUser);

  const allUsers = loadAllUsers();
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id === currentUser.id) {
      allUsers[i] = currentUser;
    }
  }
  saveAllUsers(allUsers);

  showToast('✓ Profile saved successfully!');
});


/* ── CHANGE PASSWORD ── */
document.getElementById('changePasswordBtn').addEventListener('click', function () {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword     = document.getElementById('newPassword').value;

  if (currentPassword === '') {
    showToast('Please enter your current password.');
    return;
  }

  if (currentPassword !== currentUser.password) {
    showToast('Current password is incorrect.');
    return;
  }

  if (newPassword.length < 6) {
    showToast('New password must be at least 6 characters.');
    return;
  }

  currentUser.password = newPassword;
  saveCurrentUser(currentUser);

  const allUsers = loadAllUsers();
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id === currentUser.id) {
      allUsers[i] = currentUser;
    }
  }
  saveAllUsers(allUsers);

  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';

  showToast('✓ Password updated successfully!');
});


/* ── DELETE ACCOUNT ── */
document.getElementById('deleteAccountBtn').addEventListener('click', function () {
  const confirmed = confirm(
    'Are you absolutely sure? This will permanently delete your account and all your articles. This cannot be undone.'
  );

  if (!confirmed) return;

  /* Remove user from the all users list */
  const allUsers     = loadAllUsers();
  const updatedUsers = allUsers.filter(function (user) {
    return user.id !== currentUser.id;
  });

  saveAllUsers(updatedUsers);
  clearCurrentUser();

  window.location.href = 'index.html';
});


/* ── LOGOUT ── */
document.getElementById('logoutButton').addEventListener('click', function () {
  clearCurrentUser();
  window.location.href = 'index.html';
});


/* ── TOAST ── */
const toastBox     = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
  toastMessage.textContent = message;
  toastBox.classList.add('toast--visible');
  setTimeout(function () {
    toastBox.classList.remove('toast--visible');
  }, 2500);
}