/* BRAND STUDIO 360° — Interactions globales */
(function () {
  "use strict";

  /* ---- Header on scroll ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Burger menu ---- */
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".nav-overlay");
  if (burger && overlay) {
    const toggle = (open) => {
      const willOpen = open ?? !document.body.classList.contains("menu-open");
      document.body.classList.toggle("menu-open", willOpen);
      burger.setAttribute("aria-expanded", String(willOpen));
      document.body.style.overflow = willOpen ? "hidden" : "";
    };
    burger.addEventListener("click", () => toggle());
    overlay.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => toggle(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggle(false);
    });
  }

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Project filters ---- */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".proj-card[data-cat], .proj-card--video[data-cat]");
  if (filters.length && cards.length) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        cards.forEach((card) => {
          const cats = (card.dataset.cat || "").split(",");
          const show = cat === "all" || cats.includes(cat);
          card.classList.toggle("hide", !show);
        });
      });
    });
  }

  /* ---- Current year in footer ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
