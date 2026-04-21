"use strict";

import { initHeader } from "./header.js";
import { initSliders } from "./sliders.js";
import { initScrollStack } from "./scrollStack.js";

function initDataBackgrounds() {
  document.querySelectorAll("[data-background]").forEach((el) => {
    el.style.backgroundImage = `url(${el.dataset.background})`;
  });
}

function initLazyImages() {
  if ("loading" in HTMLImageElement.prototype) return;

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (!lazyImages.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        if (target.dataset.src) target.src = target.dataset.src;
        observer.unobserve(target);
      });
    },
    { rootMargin: "200px" },
  );

  lazyImages.forEach((img) => observer.observe(img));
}

// ─────────────────────────────────────────────
// 🚀 INIT AFTER FULL PAGE LOAD (IMPORTANT FIX)
// ─────────────────────────────────────────────
window.addEventListener("load", () => {
    // ✅ GSAP GLOBAL SETTINGS (put here)
  gsap.defaults({
    ease: "power2.out"
  });


  initDataBackgrounds();
  initLazyImages();

  initHeader();
  initSliders();


  // GSAP dependent animations
  // setTimeout(() => {
  //   initScrollStack();
  // }, 300);
   initScrollStack();
});
