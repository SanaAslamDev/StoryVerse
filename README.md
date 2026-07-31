<div align="center">

# StoryVerse

**A short-fiction reading platform — rebuilt from scratch with HTML, CSS, and JavaScript.**

</div>

---

## Overview

StoryVerse is a frontend project for browsing and discovering short stories across genres like Mystery, Drama, Thriller, Horror, and more. This is a full rebuild of an earlier version, focused on a cleaner UI, a proper design system, and correct responsive behavior across desktop, tablet, and mobile.

It is a **frontend-only** project — no backend, database, or framework. Built with vanilla HTML, CSS, and JavaScript to strengthen core fundamentals.

---

## Features

- Animated hero image marquee, stats bar, and featured stories carousel
- Explore page with live search and category filtering
- Reusable story card component with bookmarking and category badges
- Login / register modals with password visibility toggle
- Responsive navbar with an animated mobile drawer
- Newsletter signup with client-side validation
- Accessible interactions — ARIA labels, keyboard support, focus handling, `prefers-reduced-motion` support

---

## Tech Stack

- HTML5
- CSS3 — custom design system, Grid, Flexbox, animations
- JavaScript (vanilla, no libraries)

---

## Design System

A custom bold, editorial visual style — no Tailwind or UI kits.

| Token | Value |
|---|---|
| Background | `#f8f3e6` |
| Accent pink | `#ff4d8d` |
| Accent yellow | `#ffc928` |
| Accent green | `#0d8a67` |
| Accent purple | `#6c4ce8` |
| Border | `3–4px solid #171717` |
| Shadow | Hard offset, e.g. `6px 6px 0 #171717` |
| Display font | Bricolage Grotesque / Anton |
| Body font | Space Grotesk |

---

## Project Structure

```
storyverse/
├── index.html        # Landing page
├── explore.html       # Explore & search page
├── css/
│   └── style.css       # Design system + all page styles + responsive rules
├── js/
│   └── app.js            # Navbar, modals, carousel, search/filter, newsletter
└── images/
    └── ...                 # Story covers & category images
```

---

## Responsive Design

Breakpoints tuned at 1024px, 900px, 768px, 600px, and 480px, including:

- Footer grid rebuilt with `grid-template-areas` for clean reflow on tablet
- Carousel navigation kept visible (resized) on mobile instead of hidden
- Story card sizing aligned between the homepage and explore page on small screens
- Auth modal spacing fixed so the close button never overlaps form content

---

## Running Locally

```bash
git clone https://github.com/SanaAslamDev/StoryVerse.git
cd StoryVerse
```

Open `index.html` in a browser — no build step or dependencies required.

Or serve locally:

```bash
npx serve .
```

---

## Author

**[Sana Aslam](https://github.com/SanaAslamDev)**

---

<div align="center">

StoryVerse · HTML, CSS & JavaScript

</div>