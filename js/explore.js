/* ============================================
   STORYVERSE — EXPLORE.JS
   Handles the explore page:
   1. Display all articles in a grid
   2. Filter by category when a button is clicked
   3. Filter by search term as user types
   4. Show empty state when no results found
   ============================================ */


/* ── ALL SAMPLE ARTICLES ──
   In Phase 3 these come from the database.
   For now we use this hardcoded array.
   The structure matches what write.js saves.
------------------------------------------------ */
const allArticles = [
  {
    title: "Building Accessible Forms That Don't Annoy Your Users",
    excerpt: "A practical guide to form design that respects both usability and accessibility standards.",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    authorName: "Maria Lopez",
    authorAvatar: "https://i.pravatar.cc/40?img=5",
    readTime: "6 min read",
    likes: 234,
    comments: 18
  },
  {
    title: "Understanding Closures in JavaScript Once and For All",
    excerpt: "Closures confuse every beginner at some point. Here's the explanation that finally makes it click.",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    authorName: "David Kim",
    authorAvatar: "https://i.pravatar.cc/40?img=8",
    readTime: "9 min read",
    likes: 512,
    comments: 47
  },
  {
    title: "What I Wish I Knew Before My First Developer Job",
    excerpt: "Lessons learned from two years in the industry that no bootcamp prepares you for.",
    category: "Career",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80",
    authorName: "Priya Nair",
    authorAvatar: "https://i.pravatar.cc/40?img=9",
    readTime: "5 min read",
    likes: 189,
    comments: 22
  },
  {
    title: "Prompt Engineering Is a Real Skill — Here's Why",
    excerpt: "Why writing good prompts is becoming as important as writing good code.",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
    authorName: "James Wright",
    authorAvatar: "https://i.pravatar.cc/40?img=15",
    readTime: "7 min read",
    likes: 678,
    comments: 65
  },
  {
    title: "How Small Teams Ship Faster Than Big Companies",
    excerpt: "Speed isn't about headcount. It's about how decisions get made.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80",
    authorName: "Lena Schmidt",
    authorAvatar: "https://i.pravatar.cc/40?img=20",
    readTime: "4 min read",
    likes: 145,
    comments: 9
  },
  {
    title: "Working Remotely From 12 Countries in One Year",
    excerpt: "What actually works (and what doesn't) when you try to be a full-time digital nomad.",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80",
    authorName: "Tom Becker",
    authorAvatar: "https://i.pravatar.cc/40?img=33",
    readTime: "10 min read",
    likes: 892,
    comments: 103
  },
  {
    title: "How Large Language Models Are Rewriting Software Engineering",
    excerpt: "From autocomplete to autonomous agents — AI is changing how developers build and ship.",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
    authorName: "Sarah Chen",
    authorAvatar: "https://i.pravatar.cc/40?img=12",
    readTime: "8 min read",
    likes: 1024,
    comments: 87
  },
  {
    title: "CSS Grid vs Flexbox — When to Use Which",
    excerpt: "A clear, practical breakdown of when each layout tool is the right choice.",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    authorName: "Ana Torres",
    authorAvatar: "https://i.pravatar.cc/40?img=44",
    readTime: "6 min read",
    likes: 320,
    comments: 31
  },
  {
    title: "The Psychology Behind Great Product Design",
    excerpt: "Why the best interfaces feel invisible — and how designers achieve that on purpose.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80",
    authorName: "Hana Suzuki",
    authorAvatar: "https://i.pravatar.cc/40?img=47",
    readTime: "7 min read",
    likes: 410,
    comments: 28
  },
  {
    title: "How to Negotiate Your First Tech Salary",
    excerpt: "Most people leave money on the table. Here's exactly what to say and when.",
    category: "Career",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
    authorName: "Mark Johnson",
    authorAvatar: "https://i.pravatar.cc/40?img=31",
    readTime: "5 min read",
    likes: 567,
    comments: 54
  },
  {
    title: "A Beginner's Guide to Neural Networks",
    excerpt: "No PhD required. Here's how neural networks actually work, explained simply.",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80",
    authorName: "Raj Patel",
    authorAvatar: "https://i.pravatar.cc/40?img=60",
    readTime: "11 min read",
    likes: 743,
    comments: 92
  },
  {
    title: "The Morning Routine That Actually Changed My Life",
    excerpt: "Not another productivity hack list. This is about one simple shift that made everything easier.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    authorName: "Anita Roy",
    authorAvatar: "https://i.pravatar.cc/40?img=25",
    readTime: "4 min read",
    likes: 298,
    comments: 41
  }
];


/* ── GET DOM ELEMENTS ── */
const articlesGrid      = document.getElementById('exploreArticlesGrid');
const resultsCount      = document.getElementById('exploreResultsCount');
const emptyState        = document.getElementById('exploreEmptyState');
const searchInput       = document.getElementById('exploreSearchInput');
const filterButtons     = document.querySelectorAll('.explore-filter-btn');
const clearFiltersBtn   = document.getElementById('clearFiltersBtn');


/* ── STATE ──
   We track what the user has selected/typed
   so we can combine both filters together.
------------------------------------------------ */
let activeCategory  = 'All';   /* Which category button is active */
let searchTerm      = '';      /* What the user has typed */


/* ── BUILD ONE ARTICLE CARD ── */
function buildArticleCard(article) {
  return `
    <a href="article.html" class="article-card">
      <div class="article-card-image">
        <img src="${article.image}" alt="${article.title}" loading="lazy" />
      </div>
      <div class="article-card-body">
        <span class="badge badge--primary">${article.category}</span>
        <h3 class="article-card-title">${article.title}</h3>
        <p class="article-card-excerpt line-clamp-2">${article.excerpt}</p>
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


/* ── FILTER AND RENDER ──
   1. Start with all articles
   2. Filter by active category (if not "All")
   3. Filter by search term (if user typed something)
   4. Show results or empty state
------------------------------------------------ */
function filterAndRender() {
  let filteredArticles = allArticles;

  // Step 1: Filter by category
  if (activeCategory !== 'All') {
    filteredArticles = filteredArticles.filter(function (article) {
      return article.category === activeCategory;
    });
  }

  // Step 2: Filter by search term
  if (searchTerm !== '') {
    const lowerCaseSearch = searchTerm.toLowerCase();

    filteredArticles = filteredArticles.filter(function (article) {
      const titleMatches    = article.title.toLowerCase().includes(lowerCaseSearch);
      const excerptMatches  = article.excerpt.toLowerCase().includes(lowerCaseSearch);
      const authorMatches   = article.authorName.toLowerCase().includes(lowerCaseSearch);
      const categoryMatches = article.category.toLowerCase().includes(lowerCaseSearch);

      // Show article if ANY of these match
      return titleMatches || excerptMatches || authorMatches || categoryMatches;
    });
  }

  // Step 3: Show results or empty state
  if (filteredArticles.length === 0) {
    articlesGrid.innerHTML  = '';
    emptyState.style.display = 'flex';
    resultsCount.textContent = 'No articles found';
  } else {
    emptyState.style.display = 'none';

    // Build all card HTML and insert at once
    let allCardsHTML = '';
    for (const article of filteredArticles) {
      allCardsHTML += buildArticleCard(article);
    }
    articlesGrid.innerHTML = allCardsHTML;

    // Update results count text
    const countWord = filteredArticles.length === 1 ? 'article' : 'articles';
    resultsCount.textContent = 'Showing ' + filteredArticles.length + ' ' + countWord;
  }
}


/* ── CATEGORY FILTER BUTTONS ── */
for (const button of filterButtons) {
  button.addEventListener('click', function () {

    // Remove active class from all buttons
    for (const btn of filterButtons) {
      btn.classList.remove('explore-filter-btn--active');
    }

    // Add active class to clicked button
    button.classList.add('explore-filter-btn--active');

    // Update active category and re-render
    activeCategory = button.getAttribute('data-category');
    filterAndRender();
  });
}


/* ── SEARCH INPUT ──
   We use a small delay (debounce) so we don't
   re-render on every single keystroke — only
   after the user stops typing for 300ms.
------------------------------------------------ */
let searchDebounceTimer = null;

searchInput.addEventListener('input', function () {
  // Cancel the previous timer if user is still typing
  clearTimeout(searchDebounceTimer);

  // Start a new timer — runs filterAndRender after 300ms of no typing
  searchDebounceTimer = setTimeout(function () {
    searchTerm = searchInput.value.trim();
    filterAndRender();
  }, 300);
});


/* ── CLEAR FILTERS BUTTON ──
   Shown in the empty state — resets everything.
------------------------------------------------ */
clearFiltersBtn.addEventListener('click', function () {
  // Reset state
  activeCategory = 'All';
  searchTerm     = '';

  // Reset search input
  searchInput.value = '';

  // Reset active filter button to "All"
  for (const btn of filterButtons) {
    btn.classList.remove('explore-filter-btn--active');
  }
  filterButtons[0].classList.add('explore-filter-btn--active');

  // Re-render all articles
  filterAndRender();
});


/* ── INITIAL RENDER ──
   Show all articles when page first loads.
------------------------------------------------ */
filterAndRender();