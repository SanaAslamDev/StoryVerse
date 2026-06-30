/* ============================================
   STORYVERSE — NAVBAR.JS
   Handles 4 simple jobs:
   1. Add a "scrolled" look when user scrolls down
   2. Open/close the mobile menu
   3. Open/close the search overlay
   4. Highlight the current page's link
   ============================================ */


/* ---------- JOB 1: NAVBAR SCROLL EFFECT ---------- */

// Get the navbar element from the page
const mainNavbar = document.getElementById('mainNavbar');

// This function checks how far down the page we've scrolled
function checkScrollPosition() {
  const scrollDistance = window.scrollY;

  // If we've scrolled down more than 20 pixels...
  if (scrollDistance > 20) {
    // ...add the class that makes navbar look "frosted glass"
    mainNavbar.classList.add('navbar--scrolled');
  } else {
    // Otherwise remove it, so navbar looks normal at the top
    mainNavbar.classList.remove('navbar--scrolled');
  }
}

// Run checkScrollPosition() every time the user scrolls
window.addEventListener('scroll', checkScrollPosition);


/* ---------- JOB 2: MOBILE MENU TOGGLE ---------- */

const mobileMenuButton = document.getElementById('mobileMenuBtn');
const mobileMenuBox    = document.getElementById('mobileMenu');

function openMobileMenu() {
  mobileMenuBox.classList.add('navbar-mobile-menu--open');
  mobileMenuButton.classList.add('navbar-hamburger--open');
}

function closeMobileMenu() {
  mobileMenuBox.classList.remove('navbar-mobile-menu--open');
  mobileMenuButton.classList.remove('navbar-hamburger--open');
}

// When hamburger is clicked, check if menu is already open
mobileMenuButton.addEventListener('click', function () {
  const menuIsOpen = mobileMenuBox.classList.contains('navbar-mobile-menu--open');

  if (menuIsOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

// Close the mobile menu automatically if user clicks a link inside it
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

for (const link of mobileLinks) {
  link.addEventListener('click', closeMobileMenu);
}


/* ---------- JOB 3: SEARCH OVERLAY ---------- */

const searchOverlayBox   = document.getElementById('searchOverlay');
const openSearchButton   = document.getElementById('searchToggleBtn');
const closeSearchButton  = document.getElementById('searchCloseBtn');
const searchInputField   = document.getElementById('searchOverlayInput');

function openSearch() {
  searchOverlayBox.classList.add('search-overlay--open');
  searchInputField.focus();         // Puts cursor in the input automatically
  document.body.style.overflow = 'hidden'; // Stops background from scrolling
}

function closeSearch() {
  searchOverlayBox.classList.remove('search-overlay--open');
  searchInputField.value = '';
  document.body.style.overflow = ''; // Allow scrolling again
}

openSearchButton.addEventListener('click', openSearch);
closeSearchButton.addEventListener('click', closeSearch);

// Close search if user clicks the dark background (outside the box)
searchOverlayBox.addEventListener('click', function (event) {
  const clickedOnBackground = event.target === searchOverlayBox;
  if (clickedOnBackground) {
    closeSearch();
  }
});

// Close search or mobile menu when ESC key is pressed
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeSearch();
    closeMobileMenu();
  }
});

// When user presses Enter inside search box, go to the search results page
searchInputField.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const typedText = searchInputField.value.trim();
    if (typedText !== '') {
      window.location.href = 'search.html?q=' + encodeURIComponent(typedText);
    }
  }
});


/* ---------- JOB 4: HIGHLIGHT CURRENT PAGE LINK ---------- */

function highlightCurrentPage() {
  // Example: if URL is ".../explore.html", this gets "explore.html"
  const pathParts = window.location.pathname.split('/');
  const currentPageName = pathParts[pathParts.length - 1] || 'index.html';

  const allNavLinks = document.querySelectorAll('.navbar-link');

  for (const link of allNavLinks) {
    const linkTarget = link.getAttribute('href');
    if (linkTarget === currentPageName) {
      link.classList.add('navbar-link--active');
    }
  }
}

highlightCurrentPage();