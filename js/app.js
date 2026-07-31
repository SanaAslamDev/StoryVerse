(function () {
  "use strict";

  var STORIES = [
    {
      title: "My Magical Forest Friends",
      excerpt:
        "A little girl and her forest friends learn the true meaning of kindness.",
      category: "Children Stories",
      badgeClass: "badge--green",
      minutes: 4,
      image: "images/childrenstory1.png",
    },
    {
      title: "The Detective's Final Case",
      excerpt: "Some puzzles are never meant to be solved — until now.",
      category: "Mystery",
      badgeClass: "badge--mustard",
      minutes: 7,
      image: "images/mystery1.png",
    },
    {
      title: "My Cat Thinks He's the Landlord",
      excerpt:
        "A hilarious take on who really owns the house — spoiler, it's not you.",
      category: "Comedy",
      badgeClass: "badge--yellow",
      minutes: 5,
      image: "images/comedy3.png",
    },
    {
      title: "Beautiful Rain",
      excerpt: "Sometimes the hardest goodbyes happen in the quietest moments.",
      category: "Drama",
      badgeClass: "badge--purple",
      minutes: 6,
      image: "images/drama1.png",
    },
    {
      title: "The Door That Wasn't There",
      excerpt:
        "Every morning, a mysterious door appeared in a different place.",
      category: "Thriller",
      badgeClass: "badge--navy",
      minutes: 8,
      image: "images/thriller2.png",
    },
    {
      title: "What Waits in Room 4B",
      excerpt: "Some doors are better left unopened. She opened it anyway.",
      category: "Horror",
      badgeClass: "badge--pink",
      minutes: 6,
      image: "images/horror2.png",
    },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    initMobileDrawer();
    initNewsletterForms();
    initBackToTop();
    initFeaturedCarousel();
    initExplorePage();
    initAuthModals();
    initHomepageBookmarks();
  });

  function initMobileDrawer() {
    var hamburgerBtn = document.getElementById("hamburgerBtn");
    var navLinks = document.getElementById("navLinks");
    var drawerBackdrop = document.getElementById("drawerBackdrop");
    var drawerCloseBtn = document.getElementById("drawerCloseBtn");

    if (!hamburgerBtn || !navLinks || !drawerBackdrop) return;

    var focusableSelector =
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
    var lastFocusedEl = null;

    function openDrawer() {
      lastFocusedEl = document.activeElement;
      navLinks.classList.add("is-open");
      drawerBackdrop.classList.add("is-visible");
      hamburgerBtn.classList.add("is-active");
      hamburgerBtn.setAttribute("aria-expanded", "true");
      hamburgerBtn.setAttribute("aria-label", "Close menu");
      document.body.style.overflow = "hidden";

      var firstFocusable = navLinks.querySelector(focusableSelector);
      if (firstFocusable) firstFocusable.focus();

      document.addEventListener("keydown", handleKeydown);
    }

    function closeDrawer() {
      navLinks.classList.remove("is-open");
      drawerBackdrop.classList.remove("is-visible");
      hamburgerBtn.classList.remove("is-active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      hamburgerBtn.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";

      document.removeEventListener("keydown", handleKeydown);
      if (lastFocusedEl) lastFocusedEl.focus();
    }

    function toggleDrawer() {
      if (navLinks.classList.contains("is-open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        closeDrawer();
        return;
      }

      if (event.key === "Tab") {
        var focusables = Array.prototype.slice.call(
          navLinks.querySelectorAll(focusableSelector),
        );
        if (!focusables.length) return;

        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    hamburgerBtn.addEventListener("click", toggleDrawer);
    drawerBackdrop.addEventListener("click", closeDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);

    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeDrawer);
    });

    var mql = window.matchMedia("(min-width: 901px)");
    function handleBreakpointChange(e) {
      if (e.matches) closeDrawer();
    }
    if (mql.addEventListener) {
      mql.addEventListener("change", handleBreakpointChange);
    } else if (mql.addListener) {
      mql.addListener(handleBreakpointChange);
    }
  }

  function initBackToTop() {
    var backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    backToTopBtn.style.transition = "opacity 0.3s ease";
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.pointerEvents = "none";

    window.addEventListener(
      "scroll",
      function () {
        var isVisible = window.scrollY > 300;
        backToTopBtn.style.opacity = isVisible ? "1" : "0";
        backToTopBtn.style.pointerEvents = isVisible ? "auto" : "none";
      },
      { passive: true },
    );

    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initNewsletterForms() {
    var forms = document.querySelectorAll("#newsletterForm");

    forms.forEach(function (form) {
      var status = form.parentElement
        ? form.parentElement.querySelector(".newsletter-status")
        : null;

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var input = form.querySelector('input[type="email"]');
        var email = input ? input.value.trim() : "";
        var isValid = input ? input.checkValidity() && email !== "" : false;

        if (!isValid) {
          if (status)
            status.textContent = "Please enter a valid email address.";
          if (input) input.focus();
          return;
        }

        if (status)
          status.textContent = "Thanks for subscribing! Check your inbox soon.";
        form.reset();
      });
    });
  }

  function initFeaturedCarousel() {
    var wrapper = document.getElementById("featuredMarqueeWrapper");
    var track = document.getElementById("featuredMarquee");
    var prevBtn = document.getElementById("marqueePrev");
    var nextBtn = document.getElementById("marqueeNext");

    if (!wrapper || !track) return;

    var isDown = false;
    var startX = 0;
    var startScrollLeft = 0;
    var dragMoved = false;

    function updateEdgeState() {
      var maxScroll = track.scrollWidth - track.clientWidth;
      var atStart = track.scrollLeft <= 1;
      var atEnd = maxScroll <= 1 || track.scrollLeft >= maxScroll - 1;

      wrapper.classList.toggle("at-start", atStart);
      wrapper.classList.toggle("at-end", atEnd);

      if (prevBtn) prevBtn.disabled = atStart;
      if (nextBtn) nextBtn.disabled = atEnd;
    }

    function scrollByAmount(direction) {
      var card = track.querySelector(".story-card");
      var step = card ? card.getBoundingClientRect().width + 16 : 300;
      track.scrollBy({ left: direction * step * 2, behavior: "smooth" });
    }

    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        scrollByAmount(-1);
      });
    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        scrollByAmount(1);
      });

    track.addEventListener(
      "wheel",
      function (event) {
        var isHorizontalGesture =
          Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
        if (!isHorizontalGesture) return;

        var delta =
          event.shiftKey && event.deltaX === 0 ? event.deltaY : event.deltaX;
        var maxScroll = track.scrollWidth - track.clientWidth;
        var atStart = track.scrollLeft <= 0;
        var atEnd = track.scrollLeft >= maxScroll;

        if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

        event.preventDefault();
        track.scrollLeft += delta;
      },
      { passive: false },
    );

    track.addEventListener("mousedown", function (event) {
      if (event.button !== 0) return;
      isDown = true;
      dragMoved = false;
      track.classList.add("is-dragging");
      startX = event.pageX;
      startScrollLeft = track.scrollLeft;
    });

    window.addEventListener("mousemove", function (event) {
      if (!isDown) return;
      var delta = event.pageX - startX;
      if (Math.abs(delta) > 3) dragMoved = true;
      track.scrollLeft = startScrollLeft - delta;
    });

    function endDrag() {
      if (!isDown) return;
      isDown = false;
      track.classList.remove("is-dragging");
    }

    window.addEventListener("mouseup", endDrag);
    track.addEventListener("mouseleave", endDrag);

    track.addEventListener(
      "click",
      function (event) {
        if (dragMoved) {
          event.preventDefault();
          event.stopPropagation();
          dragMoved = false;
        }
      },
      true,
    );

    track.addEventListener("scroll", updateEdgeState, { passive: true });
    window.addEventListener("resize", updateEdgeState, { passive: true });

    updateEdgeState();
  }

  function initExplorePage() {
    var grid = document.getElementById("exploreGrid");
    if (!grid) return;

    var resultsCount = document.getElementById("resultsCount");
    var searchInput = document.getElementById("searchInput");
    var searchForm = document.getElementById("searchForm");
    var pillsContainer = document.getElementById("filterPills");
    var pills = pillsContainer
      ? Array.prototype.slice.call(
          pillsContainer.querySelectorAll(".filter-pill"),
        )
      : [];

    var params = new URLSearchParams(window.location.search);
    var initialCategory = params.get("category");

    var state = {
      query: "",
      category: "all",
    };

    if (
      initialCategory &&
      pills.some(function (p) {
        return p.dataset.filter === initialCategory;
      })
    ) {
      state.category = initialCategory;
    }

    function escapeHtml(str) {
      var div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    function render() {
      var query = state.query.trim().toLowerCase();
      var filtered = STORIES.filter(function (story) {
        var matchesCategory =
          state.category === "all" || story.category === state.category;
        var matchesQuery =
          query === "" ||
          story.title.toLowerCase().indexOf(query) !== -1 ||
          story.excerpt.toLowerCase().indexOf(query) !== -1;
        return matchesCategory && matchesQuery;
      });

      grid.innerHTML = "";

      if (filtered.length === 0) {
        var empty = document.createElement("p");
        empty.className = "no-results";
        empty.textContent =
          "No stories match your search. Try a different keyword or category.";
        grid.appendChild(empty);
      } else {
        filtered.forEach(function (story) {
          var article = document.createElement("article");
          article.className = "story-card";
          article.innerHTML =
            '<div class="story-card-image">' +
            '<img src="' +
            escapeHtml(story.image) +
            '" alt="" loading="lazy" />' +
            '<span class="badge ' +
            story.badgeClass +
            '">' +
            escapeHtml(story.category) +
            "</span>" +
            "</div>" +
            '<div class="story-card-body">' +
            "<h3>" +
            escapeHtml(story.title) +
            "</h3>" +
            "<p>" +
            escapeHtml(story.excerpt) +
            "</p>" +
            '<div class="story-card-meta">' +
            "<span>⏱ " +
            story.minutes +
            " min read</span>" +
            '<button class="bookmark-btn" type="button" aria-label="Bookmark ' +
            escapeHtml(story.title) +
            '" aria-pressed="false">🔖</button>' +
            "</div>" +
            "</div>";
          grid.appendChild(article);
        });
      }

      if (resultsCount) {
        var count = filtered.length;
        resultsCount.textContent =
          "Showing " + count + " " + (count === 1 ? "story" : "stories");
      }
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value;
        render();
      });
    }

    if (searchForm) {
      searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
      });
    }

    if (pills.length) {
      pills.forEach(function (pill) {
        if (pill.dataset.filter === state.category) {
          pill.classList.add("is-active");
          pill.setAttribute("aria-pressed", "true");
        } else {
          pill.classList.remove("is-active");
          pill.setAttribute("aria-pressed", "false");
        }

        pill.addEventListener("click", function () {
          pills.forEach(function (p) {
            p.classList.remove("is-active");
            p.setAttribute("aria-pressed", "false");
          });
          pill.classList.add("is-active");
          pill.setAttribute("aria-pressed", "true");
          state.category = pill.dataset.filter;
          render();
        });
      });
    }

    grid.addEventListener("click", function (event) {
      var btn = event.target.closest(".bookmark-btn");
      if (!btn) return;
      var pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!pressed));
    });

    render();
  }

  function initHomepageBookmarks() {
    document
      .querySelectorAll(".featured-track .bookmark-btn")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          var pressed = btn.getAttribute("aria-pressed") === "true";
          btn.setAttribute("aria-pressed", String(!pressed));
        });
      });
  }

  function initAuthModals() {
    var loginModal = document.getElementById("loginModal");
    var registerModal = document.getElementById("registerModal");

    if (!loginModal && !registerModal) return;

    var openTriggers = document.querySelectorAll("[data-open-modal]");
    var lastFocusedEl = null;

    function getModal(id) {
      return document.getElementById(id);
    }

    function openModal(modal) {
      if (!modal) return;
      lastFocusedEl = document.activeElement;
      modal.classList.add("is-visible");
      document.body.style.overflow = "hidden";

      var firstInput = modal.querySelector("input");
      if (firstInput) firstInput.focus();

      document.addEventListener("keydown", handleModalKeydown);
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove("is-visible");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleModalKeydown);
      if (lastFocusedEl) lastFocusedEl.focus();
    }

    function closeAllModals() {
      closeModal(loginModal);
      closeModal(registerModal);
    }

    function handleModalKeydown(event) {
      if (event.key === "Escape") closeAllModals();
    }

    openTriggers.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.dataset.openModal;
        openModal(getModal(targetId));
      });
    });

    [loginModal, registerModal].forEach(function (modal) {
      if (!modal) return;

      var closeBtn = modal.querySelector(".close-btn");
      if (closeBtn)
        closeBtn.addEventListener("click", function () {
          closeModal(modal);
        });

      modal.addEventListener("click", function (event) {
        if (event.target === modal) closeModal(modal);
      });
    });

    var switchToRegister = document.getElementById("switchToRegister");
    var switchToLogin = document.getElementById("switchToLogin");

    if (switchToRegister) {
      switchToRegister.addEventListener("click", function (event) {
        event.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
      });
    }

    if (switchToLogin) {
      switchToLogin.addEventListener("click", function (event) {
        event.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
      });
    }

    [
      { toggleId: "loginPasswordToggle", inputId: "loginPassword" },
      { toggleId: "registerPasswordToggle", inputId: "registerPassword" },
    ].forEach(function (pair) {
      var toggleBtn = document.getElementById(pair.toggleId);
      var input = document.getElementById(pair.inputId);
      if (!toggleBtn || !input) return;

      toggleBtn.addEventListener("click", function () {
        var isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        toggleBtn.setAttribute("aria-pressed", String(isHidden));
      });
    });

    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var email = document.getElementById("loginEmail").value.trim();
        var password = document.getElementById("loginPassword").value;

        if (!email || !password) return;

        closeModal(loginModal);
        loginForm.reset();
      });
    }

    var registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("registerName").value.trim();
        var email = document.getElementById("registerEmail").value.trim();
        var password = document.getElementById("registerPassword").value;

        if (!name || !email || password.length < 6) return;

        closeModal(registerModal);
        registerForm.reset();
      });
    }
  }
})();
