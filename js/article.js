/* ============================================
   STORYVERSE — ARTICLE.JS
   Handles the article reading page:
   1. Reading progress bar
   2. Like button toggle
   3. Bookmark button toggle
   4. Share button
   5. Comment submission
   ============================================ */


/* ── 1. READING PROGRESS BAR ──
   As the user scrolls down the page,
   the bar at the top fills from left to right.
   When they reach the bottom, it's 100% full.
------------------------------------------------ */
const progressBar = document.getElementById('readingProgressBar');

function updateReadingProgress() {
  // Total scrollable height of the page
  const totalHeight   = document.body.scrollHeight - window.innerHeight;

  // How far the user has scrolled
  const scrolled      = window.scrollY;

  // Convert to a percentage
  const progressPercent = (scrolled / totalHeight) * 100;

  // Update the bar width
  progressBar.style.width = progressPercent + '%';
}

window.addEventListener('scroll', updateReadingProgress);


/* ── 2. LIKE BUTTON ──
   Clicking toggles the liked state.
   The count goes up or down.
   Both the top and bottom like buttons sync.
------------------------------------------------ */
const likeBtn       = document.getElementById('likeBtn');
const likeBtnBottom = document.getElementById('likeBtnBottom');
const likeCount     = document.getElementById('likeCount');

let isLiked         = false;
let currentLikes    = 234;

function toggleLike() {
  if (isLiked) {
    // Unlike
    isLiked = false;
    currentLikes = currentLikes - 1;
    likeBtn.classList.remove('article-action-btn--liked');
    likeBtnBottom.classList.remove('article-action-btn--liked');
  } else {
    // Like
    isLiked = true;
    currentLikes = currentLikes + 1;
    likeBtn.classList.add('article-action-btn--liked');
    likeBtnBottom.classList.add('article-action-btn--liked');
    showToast('❤ Article liked!');
  }

  // Update both like count displays
  likeCount.textContent = currentLikes;
  likeBtnBottom.querySelector('span').textContent = currentLikes + ' Likes';
}

likeBtn.addEventListener('click', toggleLike);
likeBtnBottom.addEventListener('click', toggleLike);


/* ── 3. BOOKMARK BUTTON ──
   Same toggle pattern as like.
------------------------------------------------ */
const bookmarkBtn       = document.getElementById('bookmarkBtn');
const bookmarkBtnBottom = document.getElementById('bookmarkBtnBottom');

let isBookmarked = false;

function toggleBookmark() {
  if (isBookmarked) {
    isBookmarked = false;
    bookmarkBtn.classList.remove('article-action-btn--bookmarked');
    bookmarkBtnBottom.classList.remove('article-action-btn--bookmarked');
    bookmarkBtnBottom.querySelector('span').textContent = 'Save';
    showToast('Bookmark removed.');
  } else {
    isBookmarked = true;
    bookmarkBtn.classList.add('article-action-btn--bookmarked');
    bookmarkBtnBottom.classList.add('article-action-btn--bookmarked');
    bookmarkBtnBottom.querySelector('span').textContent = 'Saved ✓';
    showToast('🔖 Article bookmarked!');
  }
}

bookmarkBtn.addEventListener('click', toggleBookmark);
bookmarkBtnBottom.addEventListener('click', toggleBookmark);


/* ── 4. SHARE BUTTON ──
   Copies the current page URL to clipboard.
------------------------------------------------ */
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', function () {
  navigator.clipboard.writeText(window.location.href);
  showToast('🔗 Link copied to clipboard!');
});


/* ── 5. COMMENT SUBMISSION ──
   Adds a new comment to the top of the list.
------------------------------------------------ */
const commentInput     = document.getElementById('commentInput');
const submitCommentBtn = document.getElementById('submitCommentBtn');
const commentsList     = document.getElementById('commentsList');
const commentCount     = document.getElementById('commentCount');

let totalComments = 3;

submitCommentBtn.addEventListener('click', function () {
  const commentText = commentInput.value.trim();

  if (commentText === '') {
    showToast('Please write something first.');
    return;
  }

  // Load the current logged-in user if available
  const currentUser = loadCurrentUser();
  const authorName  = currentUser ? currentUser.fullName : 'Anonymous';
  const authorAvatar = 'https://i.pravatar.cc/40?img=3';

  // Build the new comment HTML
  const newCommentHTML = `
    <div class="comment-item" style="animation: fadeInUp 0.4s ease both;">
      <img src="${authorAvatar}" alt="${authorName}" class="comment-avatar" />
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-author">${authorName}</span>
          <span class="comment-date">Just now</span>
        </div>
        <p class="comment-text">${commentText}</p>
      </div>
    </div>
  `;

  // Add the new comment at the top of the list
  commentsList.insertAdjacentHTML('afterbegin', newCommentHTML);

  // Clear the input
  commentInput.value = '';

  // Update the comment count
  totalComments = totalComments + 1;
  commentCount.textContent = '(' + totalComments + ')';

  showToast('💬 Comment posted!');
});


/* ── 6. TOAST NOTIFICATION ── */
const toastBox     = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
  toastMessage.textContent = message;
  toastBox.classList.add('toast--visible');

  setTimeout(function () {
    toastBox.classList.remove('toast--visible');
  }, 2500);
}