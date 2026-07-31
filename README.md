# 📖 StoryVerse

**Read Short Stories. Big Worlds.**

A beautiful website to discover and read short stories. Built with HTML, CSS, and JavaScript.

🔗 **Live:** [storyverse011.netlify.app](https://storyverse011.netlify.app)

> **Frontend Project** | Imaginary Demo Data | No Backend
> 
> Completely rebuilt from scratch with better design, cleaner code, and improved features! 🚀

---

## 📱 What's Inside

### Pages
- **Homepage** - Hero section, featured stories, 7 story categories
- **Explore Page** - Search stories, filter by 7 genres, view all stories

### Features
✅ Responsive design (works on mobile, tablet, desktop)  
✅ Search & filter stories in real-time  
✅ 7 story categories (Children's, Mystery, Comedy, Drama, Thriller, Horror, Poetry)  
✅ Carousel for featured stories  
✅ Mobile menu (hamburger navigation)  
✅ Login/Register modals  
✅ Bookmark stories  
✅ Newsletter signup  
✅ Smooth animations & transitions  

---

## 🛠️ Built With

- **HTML5** - Page structure
- **CSS3** - Styling & animations
- **JavaScript** - Interactive features
- **Local Storage** - Save bookmarks locally

**Frontend Only | No Backend | No Frameworks | No Dependencies!**

---

## 📂 Files

```
├── index.html        → Homepage
├── explore.html      → Story exploration page
├── style.css         → All styling
├── js/app.js        → All JavaScript features
└── images/          → Story images
```

---

## 🎨 Design Features

✨ **Bold Colors** - Pink, Yellow, Green, Purple  
✨ **Modern Fonts** - Google Fonts for nice typography  
✨ **Rounded Corners** - Smooth borders on cards  
✨ **Box Shadows** - Depth & elevation effect  
✨ **Hover Effects** - Interactive feedback  

---

## ⚠️ Note

**This is a frontend-only demo project with imaginary data.**
- No backend or database
- All data is hardcoded (imaginary stories)
- Bookmarks saved using Local Storage (browser only)
- Built for learning and portfolio purposes

---

## 🧠 JavaScript Features

| Feature | What It Does |
|---------|-------------|
| Search & Filter | Find stories by title, description, or category |
| 7 Genres | Children's, Mystery, Comedy, Drama, Thriller, Horror, Poetry |
| Carousel | Swipe/drag through featured stories |
| Mobile Menu | Open/close navigation on mobile |
| Modals | Login/Register popup forms |
| Bookmarks | Save favorite stories |
| Newsletter | Email subscription |

---

## 📱 Responsive Breakpoints

- **Desktop** - 1200px+ (full width)
- **Tablet** - 768px (2 columns)
- **Mobile** - 600px (1-2 columns)
- **Small Phone** - 380px (optimized layout)

---

## 🚀 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/SanaAslamDev/StoryVerse

# Open in browser
# Option 1: Double-click index.html
# Option 2: Use VS Code Live Server extension
```

**No server needed - it's all static files!**

---

## 💡 Key Code

### Search Stories
```javascript
const filtered = STORIES.filter(story => {
  return story.title.toLowerCase().includes(query);
});
```

### Toggle Bookmark
```javascript
bookmarkBtn.addEventListener('click', () => {
  const isBookmarked = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', !isBookmarked);
});
```

### Mobile Menu Toggle
```javascript
hamburgerBtn.addEventListener('click', toggleDrawer);
closeDrawer.addEventListener('click', closeDrawer);
```

---

## 📊 Sample Stories & Genres

6 featured stories across 7 genres:
1. My Magical Forest Friends (Children's Stories)
2. The Detective's Final Case (Mystery)
3. My Cat Thinks He's the Landlord (Comedy)
4. Beautiful Rain (Drama)
5. The Door That Wasn't There (Thriller)
6. What Waits in Room 4B (Horror)

**Also supported:** Poetry

---

## 🎯 What I Learned

✅ HTML Structure & Semantic Elements  
✅ CSS Grid & Flexbox Layouts  
✅ CSS Animations & Transitions  
✅ Responsive Design (7 breakpoints)  
✅ Vanilla JavaScript DOM Manipulation  
✅ Event Listeners & State Management  
✅ Search & Filter Functionality  
✅ Modal Windows & Focus Management  
✅ Accessibility (ARIA, Keyboard Navigation)  
✅ Carousel/Slider Implementation  

---

## 🔮 Future Ideas

- [ ] Backend for saving bookmarks
- [ ] Full story reading page
- [ ] User profiles
- [ ] Writer dashboard for publishing stories
- [ ] Comment system

---

**Made by Sana Aslam | [GitHub](https://github.com/SanaAslamDev)**
