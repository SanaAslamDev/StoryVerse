/* ============================================
   STORYVERSE — WRITE.JS
   Handles the article writing page:
   1. Redirect if not logged in
   2. Auto-resize textareas as user types
   3. Live reading time estimate
   4. Cover image preview
   5. Save as draft
   6. Publish article
   7. Pre-fill form if editing an existing article
   ============================================ */


/* ── STEP 1: PROTECT THIS PAGE ── */
const currentUser = loadCurrentUser();

if (currentUser === null) {
  window.location.href = 'login.html';
}


/* ── GET ALL FORM ELEMENTS ── */
const titleInput      = document.getElementById('writeTitleInput');
const excerptInput    = document.getElementById('writeExcerptInput');
const bodyInput       = document.getElementById('writeBodyInput');
const categorySelect  = document.getElementById('writeCategorySelect');
const coverImageInput = document.getElementById('coverImageInput');
const coverPlaceholder = document.getElementById('coverPlaceholder');
const coverPreview    = document.getElementById('coverPreview');
const writeCoverArea  = document.getElementById('writeCoverArea');
const saveDraftBtn    = document.getElementById('saveDraftBtn');
const publishBtn      = document.getElementById('publishBtn');
const writeStatusText = document.getElementById('writeStatusText');
const writeStatus     = document.getElementById('writeStatus');
const readingTimeText = document.getElementById('writeReadingTime');
const toastBox        = document.getElementById('toastNotification');
const toastMessage    = document.getElementById('toastMessage');


/* ── STEP 2: AUTO-RESIZE TEXTAREAS ──
   By default a textarea has a fixed height.
   This function makes it grow as the user types
   by adjusting its height to match its content.
------------------------------------------------ */
function autoResizeTextarea(textarea) {
  textarea.style.height = 'auto';          // Reset height first
  textarea.style.height = textarea.scrollHeight + 'px';  // Set to content height
}

titleInput.addEventListener('input', function () {
  autoResizeTextarea(titleInput);
});

excerptInput.addEventListener('input', function () {
  autoResizeTextarea(excerptInput);
});

bodyInput.addEventListener('input', function () {
  autoResizeTextarea(bodyInput);
  updateReadingTime();
});


/* ── STEP 3: LIVE READING TIME ──
   Average adult reads about 200 words per minute.
   We count the words in the body and divide by 200.
------------------------------------------------ */
function updateReadingTime() {
  const bodyText = bodyInput.value.trim();

  if (bodyText === '') {
    readingTimeText.textContent = '0 min read';
    return;
  }

  // Split by spaces to count words
  const wordCount    = bodyText.split(/\s+/).length;
  const minutesNeeded = Math.ceil(wordCount / 200);

  readingTimeText.textContent = minutesNeeded + ' min read';
}


/* ── STEP 4: COVER IMAGE PREVIEW ──
   When user clicks the cover area,
   trigger the hidden file input.
   When they pick a file, show a preview.
------------------------------------------------ */
writeCoverArea.addEventListener('click', function () {
  coverImageInput.click();
});

coverImageInput.addEventListener('change', function () {
  const selectedFile = coverImageInput.files[0];

  if (!selectedFile) {
    return;
  }

  // FileReader reads the file and converts it to a data URL
  // so we can use it as an <img> src
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    const imageDataURL = event.target.result;

    // Hide the placeholder, show the preview image
    coverPlaceholder.style.display = 'none';
    coverPreview.src               = imageDataURL;
    coverPreview.style.display     = 'block';
  };

  fileReader.readAsDataURL(selectedFile);
});


/* ── STEP 5: TOAST NOTIFICATION ──
   Shows a small message at the bottom of the screen
   for 2 seconds then disappears.
------------------------------------------------ */
function showToast(message) {
  toastMessage.textContent = message;
  toastBox.classList.add('toast--visible');

  setTimeout(function () {
    toastBox.classList.remove('toast--visible');
  }, 2500);
}


/* ── STEP 6: BUILD ARTICLE OBJECT ──
   Collects all form values into one object.
   We reuse this for both draft and publish.
------------------------------------------------ */
function buildArticleObject(publishedStatus) {
  return {
    id:          Date.now(),
    title:       titleInput.value.trim(),
    excerpt:     excerptInput.value.trim(),
    body:        bodyInput.value.trim(),
    category:    categorySelect.value,
    coverImage:  coverPreview.src || '',
    status:      publishedStatus,      // 'draft' or 'published'
    readTime:    readingTimeText.textContent,
    likes:       0,
    views:       0,
    comments:    [],
    createdAt:   new Date().toISOString(),
    authorId:    currentUser.id,
    authorName:  currentUser.fullName,
    authorHandle: currentUser.username
  };
}


/* ── STEP 7: VALIDATE BEFORE SAVING ──
   Make sure the user filled in the required fields.
------------------------------------------------ */
function isArticleValid() {
  if (titleInput.value.trim() === '') {
    showToast('Please add a title before saving.');
    return false;
  }

  if (bodyInput.value.trim() === '') {
    showToast('Please write some content before saving.');
    return false;
  }

  return true;
}


/* ── STEP 8: SAVE ARTICLE TO STORAGE ──
   Adds or updates the article in the user's
   articles array, then saves back to storage.
------------------------------------------------ */
function saveArticle(status) {
  if (!isArticleValid()) {
    return;
  }

  const newArticle = buildArticleObject(status);

  // Make sure the user has an articles array
  if (!currentUser.articles) {
    currentUser.articles = [];
  }

  // Check if we are editing an existing article
  const editingIndex = loadFromStorage('editing_article_index');

  if (editingIndex !== null) {
    // Replace the existing article at that index
    currentUser.articles[editingIndex] = newArticle;
    // Clear the editing index now that we're done
    removeFromStorage('editing_article_index');
  } else {
    // Add as a new article
    currentUser.articles.push(newArticle);
  }

  // Save updated user
  saveCurrentUser(currentUser);

  // Also update the user in the full users list
  const allUsers = loadAllUsers();
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id === currentUser.id) {
      allUsers[i] = currentUser;
    }
  }
  saveAllUsers(allUsers);

  // Update the status indicator
  writeStatus.classList.add('write-status--saved');
  writeStatusText.textContent = status === 'published' ? 'Published' : 'Saved';

  if (status === 'published') {
    showToast('Article published successfully!');
    // Go back to dashboard after a short delay
    setTimeout(function () {
      window.location.href = 'dashboard.html';
    }, 1500);
  } else {
    showToast('Draft saved.');
  }
}


/* ── WIRE UP BUTTONS ── */
saveDraftBtn.addEventListener('click', function () {
  saveArticle('draft');
});

publishBtn.addEventListener('click', function () {
  saveArticle('published');
});


/* ── STEP 9: PRE-FILL FORM WHEN EDITING ──
   If the user clicked "Edit" on the dashboard,
   we saved the article index. Load that article
   and fill in all the form fields.
------------------------------------------------ */
function loadArticleForEditing() {
  const editingIndex = loadFromStorage('editing_article_index');

  // If no index is saved, this is a new article — do nothing
  if (editingIndex === null) {
    return;
  }

  const articleToEdit = currentUser.articles[editingIndex];

  if (!articleToEdit) {
    return;
  }

  // Fill in each field with the existing article's data
  titleInput.value         = articleToEdit.title    || '';
  excerptInput.value       = articleToEdit.excerpt  || '';
  bodyInput.value          = articleToEdit.body     || '';
  categorySelect.value     = articleToEdit.category || '';

  // Show existing cover image if there is one
  if (articleToEdit.coverImage) {
    coverPreview.src           = articleToEdit.coverImage;
    coverPreview.style.display = 'block';
    coverPlaceholder.style.display = 'none';
  }

  // Resize all textareas to fit the pre-filled content
  autoResizeTextarea(titleInput);
  autoResizeTextarea(excerptInput);
  autoResizeTextarea(bodyInput);

  // Update reading time
  updateReadingTime();

  // Update page title to show we're editing
  writeStatusText.textContent = 'Editing';
}

// Run on page load
loadArticleForEditing();