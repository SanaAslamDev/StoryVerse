// js/home.js  — paste this for now
/* ============================================
   STORYVERSE — HOME.JS
   Landing page logic.
   Built out fully in the next step.
   ============================================ */
console.log('home.js loaded');
/* ---------- LATEST ARTICLES ---------- */
/* We simulate loading articles from a server.
   Step 1: show skeleton loading cards
   Step 2: after a short delay, replace them with real article cards
   This mimics how a real app behaves when fetching from an API,
   and we'll swap the fake delay for a real API call in Phase 3. */


// Fake article data — in Phase 3 this will come from PostgreSQL instead
const latestArticlesData = [
  {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    category: "Web Development",
    title: "Building Accessible Forms That Don't Annoy Your Users",
    excerpt: "A practical guide to form design that respects both usability and accessibility standards.",
    authorName: "Maria Lopez",
    authorAvatar: "https://i.pravatar.cc/40?img=5",
    readTime: "6 min read",
    likes: 234,
    comments: 18
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    category: "Programming",
    title: "Understanding Closures in JavaScript Once and For All",
    excerpt: "Closures confuse every beginner at some point. Here's the explanation that finally makes it click.",
    authorName: "David Kim",
    authorAvatar: "https://i.pravatar.cc/40?img=8",
    readTime: "9 min read",
    likes: 512,
    comments: 47
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80",
    category: "Career",
    title: "What I Wish I Knew Before My First Developer Job",
    excerpt: "Lessons learned from two years in the industry that no bootcamp prepares you for.",
    authorName: "Priya Nair",
    authorAvatar: "https://i.pravatar.cc/40?img=9",
    readTime: "5 min read",
    likes: 189,
    comments: 22
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
    category: "Artificial Intelligence",
    title: "Prompt Engineering Is a Real Skill — Here's Why",
    excerpt: "Why writing good prompts is becoming as important as writing good code.",
    authorName: "James Wright",
    authorAvatar: "https://i.pravatar.cc/40?img=15",
    readTime: "7 min read",
    likes: 678,
    comments: 65
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80",
    category: "Business",
    title: "How Small Teams Ship Faster Than Big Companies",
    excerpt: "Speed isn't about headcount. It's about how decisions get made.",
    authorName: "Lena Schmidt",
    authorAvatar: "https://i.pravatar.cc/40?img=20",
    readTime: "4 min read",
    likes: 145,
    comments: 9
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80",
    category: "Travel",
    title: "Working Remotely From 12 Countries in One Year",
    excerpt: "What actually works (and what doesn't) when you try to be a full-time digital nomad.",
    authorName: "Tom Becker",
    authorAvatar: "https://i.pravatar.cc/40?img=33",
    readTime: "10 min read",
    likes: 892,
    comments: 103
  }
];


// Get the container where cards will be inserted
const latestArticlesGrid = document.getElementById('latestArticlesGrid');


// Step 1: Build and show skeleton loading cards
function showSkeletonCards() {
  let skeletonHTML = '';

  // Build 6 skeleton cards (one HTML chunk repeated 6 times)
  for (let i = 0; i < 6; i++) {
    skeletonHTML += `
      <div class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-body">
          <div class="skeleton-line skeleton-line--title"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line skeleton-line--short"></div>
        </div>
      </div>
    `;
  }

  latestArticlesGrid.innerHTML = skeletonHTML;
}


// Step 2: Build the real article card HTML for one article
function buildArticleCardHTML(article) {
  return `
    <a href="article.html" class="article-card">
      <div class="article-card-image">
        <img src="${article.image}" alt="${article.title}" />
      </div>
      <div class="article-card-body">
        <span class="badge badge--primary">${article.category}</span>
        <h3 class="article-card-title">${article.title}</h3>
        <p class="article-card-excerpt">${article.excerpt}</p>
        <div class="article-card-footer">
          <div class="article-card-author">
            <img src="${article.authorAvatar}" alt="${article.authorName}" />
            <span class="article-card-author-name">${article.authorName}</span>
          </div>
          <div class="article-card-stats">
            <span class="article-card-stat">❤ ${article.likes}</span>
            <span class="article-card-stat">💬 ${article.comments}</span>
          </div>
        </div>
      </div>
    </a>
  `;
}


// Step 3: Replace skeletons with real article cards
function showRealArticleCards() {
  let allCardsHTML = '';

  for (const article of latestArticlesData) {
    allCardsHTML += buildArticleCardHTML(article);
  }

  latestArticlesGrid.innerHTML = allCardsHTML;
}


// Run the whole sequence:
// Show skeletons immediately, then swap to real cards after 1.2 seconds
function loadLatestArticles() {
  showSkeletonCards();

  setTimeout(function () {
    showRealArticleCards();
  }, 1200);
}

loadLatestArticles();

/* ---------- FOLLOW BUTTON TOGGLE ---------- */
/* Clicking "Follow" changes the button text to "Following"
   and changes its style. Clicking again undoes it.
   This is just a visual demo for now — in Phase 3,
   this will actually save the follow to the database. */

const followButtons = document.querySelectorAll('.creator-follow-btn');

for (const button of followButtons) {
  button.addEventListener('click', function () {
    const isAlreadyFollowing = button.classList.contains('creator-follow-btn--following');

    if (isAlreadyFollowing) {
      // Unfollow
      button.classList.remove('creator-follow-btn--following');
      button.textContent = 'Follow';
    } else {
      // Follow
      button.classList.add('creator-follow-btn--following');
      button.textContent = 'Following';
    }
  });
}
/* ---------- NEWSLETTER FORM ---------- */
/* When the user submits the newsletter form,
   we stop the page from reloading (the default
   form behavior), show a success message,
   and clear the input. */

const newsletterForm    = document.getElementById('newsletterForm');
const newsletterInput   = document.getElementById('newsletterEmailInput');
const newsletterSuccess = document.getElementById('newsletterSuccessMessage');

newsletterForm.addEventListener('submit', function (event) {
  // Forms reload the page by default when submitted.
  // preventDefault() stops that so we can handle it ourselves.
  event.preventDefault();

  // Show the success message
  newsletterSuccess.classList.add('newsletter-success--visible');

  // Clear the input field
  newsletterInput.value = '';

  // Hide the success message again after 4 seconds
  setTimeout(function () {
    newsletterSuccess.classList.remove('newsletter-success--visible');
  }, 4000);
});