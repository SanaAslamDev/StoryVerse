/* ============================================
   STORYVERSE — PROFILE.JS
   Handles the profile page:
   1. Load the current user's data
   2. Populate name, handle, bio, stats
   3. Show edit button if it's the logged-in user
   4. Render published articles and drafts
   5. Handle tab switching
   ============================================ */


/* ── STEP 1: LOAD CURRENT USER ── */
const currentUser = loadCurrentUser();

/* Get all DOM elements we need */
const profileAvatar       = document.getElementById('profileAvatar');
const profileName         = document.getElementById('profileName');
const profileHandle       = document.getElementById('profileHandle');
const profileBio          = document.getElementById('profileBio');
const profileArticleCount = document.getElementById('profileArticleCount');
const profileActions      = document.getElementById('profileActions');


/* ── STEP 2: POPULATE PROFILE DATA ──
   If no user is logged in, show a
   generic guest profile message.
   If logged in, show their real data.
------------------------------------------------ */
if (currentUser === null) {
  /* No one logged in — show guest state */
  profileName.textContent   = 'Guest User';
  profileHandle.textContent = '@guest';
  profileBio.textContent    = 'Sign in to see your profile.';

  profileActions.innerHTML = `
    <a href="login.html" class="btn btn--primary">Sign In</a>
    <a href="register.html" class="btn btn--ghost">Register</a>
  `;

} else {
  /* Logged in — fill with real user data */
  const firstLetter = currentUser.fullName.charAt(0).toUpperCase();
  profileAvatar.textContent   = firstLetter;
  profileName.textContent     = currentUser.fullName;
  profileHandle.textContent   = '@' + currentUser.username;
  profileBio.textContent      = currentUser.bio || 'Writer and creator on StoryVerse.';

  /* Count only published articles */
  const userArticles   = currentUser.articles || [];
  const publishedCount = userArticles.filter(function (article) {
    return article.status === 'published';
  }).length;

  profileArticleCount.textContent = publishedCount;

  /* Show edit profile + write buttons for the owner */
  profileActions.innerHTML = `
    <a href="settings.html" class="btn btn--ghost btn--sm">Edit Profile</a>
    <a href="write.html" class="btn btn--primary btn--sm">+ Write Article</a>
  `;

  /* Load the articles into tabs */
  loadPublishedArticles(userArticles);
  loadDraftArticles(userArticles);
}


/* ── STEP 3: BUILD A SMALL PROFILE ARTICLE CARD ── */
function buildProfileArticleCard(article) {
  return `
    <a href="article.html" class="article-card">
      <div class="article-card-image">
        <img
          src="${article.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80'}"
          alt="${article.title}"
          loading="lazy"
        />
      </div>
      <div class="article-card-body">
        <span class="badge badge--primary">${article.category || 'Uncategorized'}</span>
        <h3 class="article-card-title">${article.title}</h3>
        <p class="article-card-excerpt line-clamp-2">${article.excerpt || ''}</p>
        <div class="article-card-footer">
          <span class="article-card-author-name">${article.readTime || '1 min read'}</span>
          <div class="article-card-stats">
            <span class="article-card-stat">❤ ${article.likes || 0}</span>
          </div>
        </div>
      </div>
    </a>
  `;
}


/* ── STEP 4: LOAD PUBLISHED ARTICLES TAB ── */
function loadPublishedArticles(allUserArticles) {
  const publishedGrid  = document.getElementById('publishedArticlesGrid');
  const publishedEmpty = document.getElementById('publishedEmptyState');

  /* Filter to only published articles */
  const publishedArticles = allUserArticles.filter(function (article) {
    return article.status === 'published';
  });

  if (publishedArticles.length === 0) {
    publishedEmpty.style.display = 'flex';
    return;
  }

  publishedEmpty.style.display = 'none';

  let allCardsHTML = '';
  for (const article of publishedArticles) {
    allCardsHTML += buildProfileArticleCard(article);
  }
  publishedGrid.innerHTML = allCardsHTML;
}


/* ── STEP 5: LOAD DRAFTS TAB ── */
function loadDraftArticles(allUserArticles) {
  const draftsGrid  = document.getElementById('draftsArticlesGrid');
  const draftsEmpty = document.getElementById('draftsEmptyState');

  /* Filter to only draft articles */
  const draftArticles = allUserArticles.filter(function (article) {
    return article.status === 'draft';
  });

  if (draftArticles.length === 0) {
    draftsEmpty.style.display = 'flex';
    return;
  }

  draftsEmpty.style.display = 'none';

  let allCardsHTML = '';
  for (const article of draftArticles) {
    allCardsHTML += buildProfileArticleCard(article);
  }
  draftsGrid.innerHTML = allCardsHTML;
}


/* ── STEP 6: TAB SWITCHING ──
   When user clicks a tab button:
   1. Remove active class from all tabs
   2. Add active class to clicked tab
   3. Hide all panels
   4. Show the matching panel
------------------------------------------------ */
const tabButtons = document.querySelectorAll('.profile-tab');
const panels     = document.querySelectorAll('.profile-panel');

for (const tabButton of tabButtons) {
  tabButton.addEventListener('click', function () {

    /* Which tab was clicked? */
    const targetTabName = tabButton.getAttribute('data-tab');

    /* Update tab button styles */
    for (const btn of tabButtons) {
      btn.classList.remove('profile-tab--active');
    }
    tabButton.classList.add('profile-tab--active');

    /* Show the matching panel, hide all others */
    for (const panel of panels) {
      panel.classList.remove('profile-panel--active');
    }

    const targetPanel = document.getElementById('panel' +
      targetTabName.charAt(0).toUpperCase() +
      targetTabName.slice(1)
    );

    if (targetPanel) {
      targetPanel.classList.add('profile-panel--active');
    }
  });
}


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