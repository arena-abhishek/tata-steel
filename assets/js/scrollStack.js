"use strict";

gsap.registerPlugin(ScrollTrigger);

export function initScrollStack() {

  ScrollTrigger.matchMedia({

    "(min-width: 992px)": function () {

      const container = document.querySelector(".scroll-stack");
      const items = gsap.utils.toArray(".scroll-stack__item");

      if (!container || items.length < 2) return;

      // DO NOT set position absolute anywhere

      gsap.set(items, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh"
      });

      gsap.set(items.slice(1), {
        yPercent: 100
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => "+=" + (items.length * window.innerHeight),
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1
        }
      });

      items.forEach((_, i) => {
        if (i < items.length - 1) {
          tl.to(items[i + 1], {
            yPercent: 0,
            ease: "none"
          }, i);
        }
      });

    },

    "(max-width: 991px)": function () {
      ScrollTrigger.getAll().forEach(st => st.kill());

      document.querySelectorAll(".scroll-stack__item").forEach(item => {
        gsap.set(item, { clearProps: "all" });
      });
    }

  });
}
/* /**
 * scrollStack.js
 * Card-stacking scroll animation using GSAP + ScrollTrigger.
 * Desktop (≥ 992px): sections stack/pin with smooth push-up effect.
 * Tablet/Mobile: all animations disabled, natural scroll.
 

console.log("gsap =", window.gsap);
console.log("ScrollTrigger =", window.ScrollTrigger);
'use strict';


export function initScrollStack() {
   
  // Only run on desktop
  const mq = window.matchMedia('(min-width: 992px) and (prefers-reduced-motion: no-preference)');

  if (!mq.matches) {
    cleanupForMobile();
    return;
  }

  // Guard: GSAP required
  /* if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[scrollStack] GSAP or ScrollTrigger not loaded.');
    return;
  } 
 if (!window.gsap || !window.ScrollTrigger) {
  console.error('[scrollStack] GSAP missing');
  return;
}

  gsap.registerPlugin(ScrollTrigger);

  const container = document.querySelector('.scroll-stack');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('.scroll-stack__item'));
  if (items.length < 2) return;

  // Set container height so scroll distance is available
  container.style.height = `${items.length * 100}vh`;

  // Initial state: all items below except first
  items.forEach((item, i) => {
    item.style.position = 'fixed';
    item.style.top = '0';
    item.style.left = '0';
    item.style.width = '100%';
    item.style.height = '100vh';
    item.style.zIndex = items.length - i;

    if (i !== 0) {
      gsap.set(item, { yPercent: 100 });
    }
  });

  // Build timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${(items.length - 1) * 100}%`,
      scrub: 1.2,            // smooth scrub
      pin: false, 
      // pin: true,           // we're pinning via fixed positioning
      invalidateOnRefresh: true,
    },
    defaults: { ease: 'power2.inOut' },
  });

  items.forEach((item, i) => {
    if (i < items.length - 1) {
      const next = items[i + 1];
      tl.to(next, { yPercent: 0, duration: 1 }, i); // slide up next card
    }
  });

  // Unfix items when container scrolled past
  ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: () => `+=${(items.length - 1) * 100}%`,
    onLeave: () => {
      items.forEach(item => {
        item.style.position = 'absolute';
        item.style.top = 'auto';
        item.style.bottom = '0';
      });
    },
    onEnterBack: () => {
      items.forEach(item => {
        item.style.position = 'fixed';
        item.style.top = '0';
        item.style.bottom = '';
      });
    },
  });

  // Refresh on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!window.matchMedia('(min-width: 992px)').matches) {
        cleanupForMobile();
      } else {
        ScrollTrigger.refresh();
      }
    }, 250);
  });
}

// ── Mobile / tablet cleanup ───────────────────────────────────
function cleanupForMobile() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  const items = document.querySelectorAll('.scroll-stack__item');
  items.forEach(item => {
    item.style.cssText = ''; // clear all inline styles
  });

  const container = document.querySelector('.scroll-stack');
  if (container) container.style.height = '';
}

// ── Tablet: lightweight IntersectionObserver fade-in ─────────
export function initTabletAnimations() {
  const mq = window.matchMedia('(min-width: 768px) and (max-width: 991px)');
  if (!mq.matches) return;

  const items = document.querySelectorAll('.scroll-stack__item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
} */
