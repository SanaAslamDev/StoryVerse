<div align="center">

# ✦ StoryVerse — Phase 1

**A premium knowledge publishing platform built with vanilla HTML, CSS, and JavaScript.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-8b35ff?style=for-the-badge)](https://storyverse-blog.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-SanaAslamDev-ff0f9f?style=for-the-badge)](https://github.com/SanaAslamDev)
[![Phase](https://img.shields.io/badge/Phase-1%20Complete-22e6e0?style=for-the-badge)]()

</div>

---

## What Is StoryVerse?

StoryVerse is a full-featured content publishing platform — think Medium meets Notion with a bold editorial design. Writers can create and publish articles, readers can explore and discover content, and everyone gets a personal dashboard to manage their work.

This repository is **Phase 1** of a three-phase project. It is built entirely with vanilla HTML, CSS, and JavaScript using Local Storage as the data layer — no frameworks, no libraries, no build tools. Just fundamentals, done properly.

The goal was to deeply understand how the web works before moving to frameworks.

---

## Live Demo

🌐 [storyverse-blog.netlify.app](https://storyverse-blog.netlify.app/)

**Test Account — you can register your own, or use the flow:**
1. Go to `/register.html`
2. Create an account with any email and password
3. You'll land on the dashboard automatically
4. Write an article, publish it, explore the platform

---

## Pages Built

| Page | File | Description |
|---|---|---|
| Landing Page | `index.html` | Hero, featured article, categories, latest articles, creators, testimonials, newsletter |
| Explore | `explore.html` | Live search + category filter across all articles |
| Article Reading | `article.html` | Full reading experience with progress bar, likes, bookmarks, comments |
| Write Article | `write.html` | Distraction-free editor with cover image, category, auto-resize textarea |
| Dashboard | `dashboard.html` | Stats cards, article management, edit and delete |
| Profile | `profile.html` | Published, drafts, and bookmarks tabs |
| Login | `login.html` | Email + password authentication against Local Storage |
| Register | `register.html` | Full registration with validation |
| 404 | `404.html` | Custom branded error page |

---

## Features

- **Authentication** — Register, login, logout with Local Storage. Validates email format, password length, duplicate usernames and emails. Protected pages redirect unauthenticated users to login automatically.
- **Article Editor** — Write with a title, excerpt, body, category selector, and cover image upload. Auto-resizing textareas. Live reading time estimation (words ÷ 200).
- **Draft & Publish** — Save articles as drafts or publish instantly. Edit and delete from the dashboard.
- **Explore Page** — Live search across title, excerpt, author, and category. Filter by category. Debounced input so search only fires after the user stops typing.
- **Article Reading** — Scroll-driven reading progress bar. Like toggle with animated count. Bookmark toggle. Copy link to clipboard. Comment submission with local state.
- **Dashboard Analytics** — Total views, likes, comments, and bookmarks pulled from the user's saved data.
- **Profile Tabs** — Published articles, drafts, and bookmarks in a sticky tab navigation.
- **Responsive Design** — Works across desktop, tablet, and mobile.

---

## Design System

StoryVerse uses a custom **Neo-Brutalist × Editorial** design language built entirely from scratch.

**No Tailwind. No Bootstrap. No UI libraries.**

| Token | Value |
|---|---|
| Primary color | `#8b35ff` (Electric violet) |
| Accent pink | `#ff0f9f` (Hot pink) |
| Accent cyan | `#22e6e0` |
| Accent yellow | `#ffdf27` |
| Border | `4px solid #050505` |
| Shadow | `7px 7px 0 #050505` (hard offset — no blur) |
| Display font | Anton (heavy editorial headlines) |
| Body font | Space Grotesk (clean, readable) |
| Code font | JetBrains Mono |

Key design decisions:
- **Hard offset shadows** instead of blurred drop shadows — signature neo-brutalist look
- **Bold 4–7px black borders** on every interactive element
- **Hover = shift up-left** revealing the shadow — satisfying tactile interaction
- **Dot grid texture** on page backgrounds — editorial print feel
- **Neon color fills** on cards, buttons, and stat blocks

---

## File Structure

```
storyverse/
│
├── index.html              ← Landing page
├── explore.html            ← Explore & search
├── article.html            ← Article reading
├── write.html              ← Article editor
├── dashboard.html          ← User dashboard
├── profile.html            ← User profile
├── login.html              ← Login
├── register.html           ← Register
├── 404.html                ← Error page
│
├── css/
│   ├── variables.css       ← Full design token system (colors, fonts, shadows, spacing)
│   ├── reset.css           ← Browser normalization
│   ├── typography.css      ← Font scale, headings, body text
│   ├── components.css      ← Buttons, badges, containers, layout utilities
│   ├── animations.css      ← Keyframe animations (fadeInUp, shimmer, floatBlob, etc.)
│   ├── navbar.css          ← Sticky navbar with scroll effect and mobile drawer
│   ├── footer.css          ← Site-wide footer
│   ├── home.css            ← Landing page sections
│   ├── article.css         ← Article reading page
│   ├── explore.css         ← Explore page filters and grid
│   ├── dashboard.css       ← Dashboard layout and stat cards
│   ├── profile.css         ← Profile page with tabs
│   ├── auth.css            ← Login and register pages
│   ├── write.css           ← Article editor
│   ├── 404.css             ← Error page
│   └── responsive.css      ← Global mobile breakpoints
│
├── js/
│   ├── app.js              ← Global constants and app initialization
│   ├── storage.js          ← All Local Storage read/write functions
│   ├── utils.js            ← Shared helper functions
│   ├── theme.js            ← Theme initialization (light mode)
│   ├── navbar.js           ← Scroll detection, mobile menu, search overlay
│   ├── home.js             ← Stat counters, skeleton loaders, article cards, follow buttons, newsletter
│   ├── auth.js             ← Register and login validation and storage logic
│   ├── dashboard.js        ← User data display, article management, logout
│   ├── write.js            ← Editor logic, cover image preview, save and publish
│   ├── article.js          ← Reading progress, likes, bookmarks, share, comments
│   ├── explore.js          ← Category filters, live search with debounce
│   └── profile.js          ← Profile data display, tab switching
│
└── assets/
    ├── icons/
    │   └── favicon.svg
    ├── images/
    └── fonts/
```

---

## What I Learned Building This

### HTML
- Semantic HTML5 structure (`header`, `main`, `article`, `aside`, `section`, `nav`, `footer`)
- Accessibility with ARIA labels, `role` attributes, and keyboard navigation
- Form design with proper `label`, `input`, `autocomplete` attributes
- SVG icons inline vs external files and when to use each

### CSS
- Building a complete design token system with CSS custom properties
- CSS Grid for two-dimensional layouts (dashboard, article layout, footer)
- Flexbox for one-dimensional alignment (navbar, cards, author rows)
- `position: sticky` for the reading sidebar and profile tabs
- `backdrop-filter: blur()` for frosted glass navbar effects
- CSS animations with `@keyframes` — shimmer loaders, floating blobs, fade-in
- Responsive design with `clamp()`, `min()`, and media query breakpoints
- Pseudo-elements (`::before`, `::after`) for decorative shapes without extra HTML
- The neo-brutalist pattern: hard offset box shadows + thick borders + hover shift

### JavaScript
- Local Storage as a complete data layer (create, read, update, delete)
- DOM manipulation — `querySelector`, `innerHTML`, `classList`, `addEventListener`
- Form validation from scratch — no libraries
- Debouncing user input for search (preventing excessive re-renders)
- `FileReader` API for reading and previewing uploaded images
- `navigator.clipboard` API for copy-to-clipboard
- `setInterval` for animated stat counters
- `IntersectionObserver`-style scroll tracking for the reading progress bar
- Building a tab system with pure JavaScript
- Skeleton loading states to simulate async data fetching
- Protecting pages — redirect unauthenticated users before rendering content
- Template literals for building HTML strings from data arrays

### Software Architecture
- Separating concerns — one CSS file per page, one JS file per page
- A shared storage layer (`storage.js`) that all other files import from
- Designing data structures in Phase 1 that match what a real database would return in Phase 3
- Building UI components that are reusable across multiple pages (article cards, navbar, footer)

---

## Running Locally

```bash
git clone https://github.com/SanaAslamDev/StoryVerse.git
cd StoryVerse
```

Open `index.html` in your browser. No build step needed.

Or serve with a local server:

```bash
npx serve .
```

---

## Roadmap

### Phase 1 — Complete ✅
Vanilla HTML, CSS, JavaScript, Local Storage

### Phase 2 — Planned
React, React Router, Context API. Same project, same design, rebuilt as a component-based SPA.

### Phase 3 — Planned
Node.js, Express.js, PostgreSQL, Prisma ORM, JWT authentication, bcrypt, Cloudinary, REST API. Full production backend.

---

## Author

Built by **[Sana Aslam](https://github.com/SanaAslamDev)** as a full-stack learning project and portfolio piece.

This project demonstrates frontend engineering skills including custom design systems, vanilla JavaScript architecture, responsive layout, and product-focused thinking — without relying on any UI frameworks or component libraries.

---

<div align="center">

**StoryVerse** · Phase 1 · Built with HTML, CSS & JavaScript

</div>
