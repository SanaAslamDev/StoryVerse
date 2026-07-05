/* ============================================
   STORYVERSE — DRAFTS.JS
   Shows the logged-in user's draft articles.
   ============================================ */

const currentUser = loadCurrentUser();

/* Redirect if not logged in */
if (currentUser === null) {
  window.location.href = 'login.html';
}

/* Fill sidebar */
const sidebarAvatar = document.getElementById('sidebarAvatar');
const sidebarName   = document.getElementById('sidebarUserName');
const sidebarHandle = document.getElementById('sidebarUserHandle');

sidebarAvatar.textContent = currentUser.fullName.charAt(0).toUpperCase();
sidebarName.textContent   = currentUser.fullName;
sidebarHandle.textContent = '@' + currentUser.username;

/* Load drafts */
const draftsList      = document.getElementById('draftsList');
const draftsEmptyState = document.getElementById('draftsEmptyState');

const allArticles   = currentUser.articles || [];
const draftArticles = allArticles.filter(function (article) {
  return article.status === 'draft';
});

if (draftArticles.length === 0) {
  draftsEmptyState.style.display = 'grid';
  draftsList.style.display = 'none';
} else {
  draftsEmptyState.style.display = 'none';

  let html = '';
  for (let i = 0; i < draftArticles.length; i++) {
    const article = draftArticles[i];
    html += `
      <div class="dashboard-article-row">
        <div class="dashboard-article-info">
          <p class="dashboard-article-title">${article.title}</p>
          <p class="dashboard-article-meta">
            ${article.category || 'Uncategorized'} · ${article.readTime || '1 min read'} · Draft
          </p>
        </div>
        <div class="dashboard-article-actions">
          <button class="dashboard-action-btn" onclick="editDraft(${i})">Edit</button>
          <button class="dashboard-action-btn dashboard-action-btn--delete" onclick="deleteDraft(${i})">Delete</button>
        </div>
      </div>
    `;
  }
  draftsList.innerHTML = html;
}

function editDraft(index) {
  /* Find the real index in the full articles array */
  const drafts = currentUser.articles.filter(a => a.status === 'draft');
  const targetArticle = drafts[index];
  const realIndex = currentUser.articles.indexOf(targetArticle);
  saveToStorage('editing_article_index', realIndex);
  window.location.href = 'write.html';
}

function deleteDraft(index) {
  const confirmed = confirm('Delete this draft?');
  if (!confirmed) return;

  const drafts = currentUser.articles.filter(a => a.status === 'draft');
  const targetArticle = drafts[index];
  const realIndex = currentUser.articles.indexOf(targetArticle);
  currentUser.articles.splice(realIndex, 1);

  saveCurrentUser(currentUser);
  const allUsers = loadAllUsers();
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id === currentUser.id) {
      allUsers[i] = currentUser;
    }
  }
  saveAllUsers(allUsers);
  window.location.reload();
}

/* Logout */
document.getElementById('logoutButton').addEventListener('click', function () {
  clearCurrentUser();
  window.location.href = 'index.html';
});