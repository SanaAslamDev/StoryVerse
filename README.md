<div align="center">

# ✦ StoryVerse

**A premium knowledge publishing platform for writers and readers.**

Write. Publish. Discover. Built like a real SaaS product, not a student project.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-4F46E5?style=for-the-badge)](https://storyverse-blog.netlify.app/)
[![Made by](https://img.shields.io/badge/Made%20by-Sana%20Aslam-7C3AED?style=for-the-badge)](https://github.com/SanaAslamDev)

</div>

---

## Overview

StoryVerse is a full-stack knowledge publishing platform where writers create and share stories, technical tutorials, and articles — and readers discover content across technology, AI, business, travel, and more.

It's inspired by the design language of Medium, Notion, Linear, and Stripe, with a focus on premium visual polish, smooth micro-interactions, and a genuinely comfortable long-form reading experience.

The project is being built in three progressive phases — from a static frontend to a full production-ready PERN stack application — making it a complete demonstration of frontend engineering, backend API design, and product thinking.

---

## ✨ Features

- Cinematic landing page — hero, featured article, trending categories, latest articles, featured creators, testimonials, newsletter
- Light & dark theme with saved preference across sessions
- Distraction-free article reading experience with reading time and progress tracking
- Write, save as draft, edit, publish, and delete articles
- Like, bookmark, comment, and follow authors
- Real-time search, category filtering, and sorting
- Personal dashboard with analytics, drafts, and published articles
- Fully responsive across desktop, tablet, and mobile
- Smooth, meaningful animations throughout — no flashy filler

---

## 🛠 Tech Stack

| Phase | Stack |
|---|---|
| **Phase 1** — *Current* | HTML5 · CSS3 · JavaScript (ES6) · Local Storage |
| **Phase 2** | React · React Router · Context API |
| **Phase 3** | Node.js · Express.js · PostgreSQL · Prisma ORM · JWT · bcrypt · Cloudinary |

---

## 🔗 Links

- **Live Site:** [storyverse-blog.netlify.app](https://storyverse-blog.netlify.app/)
- **Repository:** [github.com/SanaAslamDev/storyverse](https://github.com/SanaAslamDev/storyverse)

---

## 📂 Project Structure

```
storyverse/
├── index.html, explore.html, article.html, ...   # Pages
├── css/
│   ├── variables.css       # Design tokens — colors, spacing, typography
│   ├── reset.css           # Browser style reset
│   ├── typography.css      # Global text styles
│   ├── components.css      # Reusable buttons, badges, layout helpers
│   ├── animations.css      # Keyframe animations
│   ├── navbar.css / footer.css
│   └── home.css, article.css, dashboard.css, ...
├── js/
│   ├── app.js               # Global app initialization
│   ├── storage.js           # Local Storage data layer
│   ├── theme.js              # Dark / light mode logic
│   ├── navbar.js              # Navigation, search overlay, mobile menu
│   └── home.js, article.js, dashboard.js, ...
└── assets/
    ├── icons/
    ├── images/
    └── fonts/
```

---

## 🚀 Running Locally

```bash
git clone https://github.com/SanaAslamDev/storyverse.git
cd storyverse
```

Then open `index.html` directly in your browser, or serve it locally:

```bash
npx serve .
```

---

## 🗺 Roadmap

- [x] Design system & CSS variables
- [x] Responsive navbar with theme toggle and search overlay
- [x] Full landing page (hero → footer)
- [ ] Login / Register with Local Storage auth
- [ ] Article reading page
- [ ] Write / editor page
- [ ] Dashboard & analytics
- [ ] Migration to React (Phase 2)
- [ ] Backend API with PostgreSQL (Phase 3)

---

<div align="center">

Built with care by **[Sana Aslam](https://github.com/SanaAslamDev)**

</div>
