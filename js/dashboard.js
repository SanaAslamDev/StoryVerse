/* ============================================
   STORYVERSE — DASHBOARD.JS
   Handles everything on the dashboard page:
   1. Redirect if not logged in
   2. Show the user's name and info
   3. Show analytics stats
   4. Show the user's articles
   5. Handle logout
   ============================================ */


/* ── STEP 1: PROTECT THIS PAGE ──
   If no user is logged in, send them to login.
   This runs FIRST before anything else.
------------------------------------------------ */
const currentUser = loadCurrentUser();

if (currentUser === null) {
  // No one is logged in — redirect to login page
  window.location.href = 'login.html';
}


/* ── STEP 2: SHOW USER INFO IN SIDEBAR ── */

// Show first letter of name as avatar
const sidebarAvatar = document.getElementById('sidebarAvatar');
sidebarAvatar.textContent = currentUser.fullName.charAt(0).toUpperCase();

// Show name and username
document.getElementById('sidebarUserName').textContent   = currentUser.fullName;
document.getElementById('sidebarUserHandle').textContent = '@' + currentUser.username;

// Show welcome message with first name only
const firstName = currentUser.fullName.split(' ')[0];
document.getElementById('dashboardWelcome').textContent = 'Welcome back, ' + firstName + '!';

// Show today's date
const todayDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year:    'numeric',
  month:   'long',
  day:     'numeric'
});
document.getElementById('dashboardDate').textContent = todayDate;


/* ── STEP 3: SHOW ANALYTICS STATS ──
   For now these are the counts from the
   user's saved data. In Phase 3 these will
   come from the database.
------------------------------------------------ */

// Get the user's articles from storage
const userArticles  = currentUser.articles  || [];
const userBookmarks = currentUser.bookmarks || [];

// Count total likes and views across all articles
let totalLikes = 0;
let totalViews = 0;

for (const article of userArticles) {
  totalLikes = totalLikes + (article.likes || 0);
  totalViews = totalViews + (article.views || 0);
}

// Update the stat cards
document.getElementById('statTotalViews').textContent    = totalViews.toLocaleString();
document.getElementById('statTotalLikes').textContent    = totalLikes.toLocaleString();
document.getElementById('statTotalArticles').textContent = userArticles.length;
document.getElementById('statTotalBookmarks').textContent = userBookmarks.length;


/* ── STEP 4: SHOW ARTICLES LIST ──
   If the user has articles, show them in a list.
   If they have none, show the empty state.
------------------------------------------------ */

const emptyState    = document.getElementById('dashboardEmptyState');
const articlesList  = document.getElementById('dashboardArticlesList');

function buildArticleRowHTML(article, index) {
  return `
    <div class="dashboard-article-row" id="article-row-${index}">
      <div class="dashboard-article-info">
        <p class="dashboard-article-title">${article.title}</p>
        <p class="dashboard-article-meta">
          ${article.category || 'Uncategorized'} ·
          ${article.readTime || '1 min read'} ·
          ${article.likes || 0} likes ·
          ${article.views || 0} views
        </p>
      </div>
      <div class="dashboard-article-actions">
        <button class="dashboard-action-btn" onclick="editArticle(${index})">Edit</button>
        <button class="dashboard-action-btn dashboard-action-btn--delete" onclick="deleteArticle(${index})">Delete</button>
      </div>
    </div>
  `;
}

function showArticles() {
  if (userArticles.length === 0) {
    // No articles — show empty state, hide list
    emptyState.style.display   = 'flex';
    articlesList.style.display = 'none';
  } else {
    // Has articles — hide empty state, show list
    emptyState.style.display   = 'none';
    articlesList.style.display = 'block';

    let allRowsHTML = '';
    for (let i = 0; i < userArticles.length; i++) {
      allRowsHTML += buildArticleRowHTML(userArticles[i], i);
    }
    articlesList.innerHTML = allRowsHTML;
  }
}

showArticles();


/* ── STEP 5: EDIT AND DELETE ARTICLE ── */

function editArticle(articleIndex) {
  // Save the index of the article being edited
  // then open the write page — write.js will read this
  saveToStorage('editing_article_index', articleIndex);
  window.location.href = 'write.html';
}

function deleteArticle(articleIndex) {
  const confirmed = confirm('Are you sure you want to delete this article?');

  if (!confirmed) {
    return;
  }

  // Remove the article at that index
  currentUser.articles.splice(articleIndex, 1);

  // Save the updated user back to storage
  saveCurrentUser(currentUser);

  // Also update the user in the full users list
  const allUsers = loadAllUsers();
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id === currentUser.id) {
      allUsers[i] = currentUser;
    }
  }
  saveAllUsers(allUsers);

  // Reload the page to reflect the deletion
  window.location.reload();
}


/* ── STEP 6: LOGOUT ── */

const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', function () {
  clearCurrentUser();
  window.location.href = 'index.html';
});


/* ── STEP 7: THEME TOGGLE ──
   The dashboard has its own theme button
   so we wire it up here.
------------------------------------------------ */
const dashboardThemeBtn = document.getElementById('dashboardThemeBtn');

dashboardThemeBtn.addEventListener('click', function () {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem(APP_PREFIX + 'theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem(APP_PREFIX + 'theme', 'dark');
  }
});