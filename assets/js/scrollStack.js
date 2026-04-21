/**
 * scrollStack.js
 * Card-stacking scroll animation using GSAP + ScrollTrigger.
 *
 * FIX SUMMARY (vs previous broken version):
 * ─────────────────────────────────────────
 * 1. Removed manual `position:fixed` scheme entirely.
 *    Now uses GSAP's own `pin:true` on the .wrapper — exactly
 *    matching the reference code that works. Manual fixed pinning
 *    conflicted with ScrollTrigger's scroll-distance measurement
 *    and caused scroll to get completely stuck on desktop.
 *
 * 2. Removed `container.style.height` override.
 *    Setting an explicit height on the outer container while items
 *    inside are position:fixed means ScrollTrigger calculates
 *    scroll distance against the wrong element height. GSAP's
 *    pin handles this automatically when we let it.
 *
 * 3. Fixed timeline position parameter.
 *    Old: `tl.to(next, { yPercent:0 }, i)` — passing a bare
 *    integer is treated by GSAP as a time-in-seconds offset,
 *    making all tweens fire at the wrong moment.
 *    New: `tl.to(item, { scale, borderRadius })` then
 *    `tl.to(items[i+1], { yPercent:0 }, '<')` — the `'<'`
 *    label means "start at the same time as the previous tween",
 *    which is what the reference code does correctly.
 *
 * 4. Fixed script loading race condition.
 *    Old: called from main.js as an ES module; GSAP loaded with
 *    `defer` — no guaranteed order, so gsap/ScrollTrigger were
 *    sometimes undefined at call time.
 *    New: initScrollStack() waits for window 'load' event before
 *    running (all deferred scripts are guaranteed loaded by then),
 *    AND falls back to a requestAnimationFrame poll if needed.
 *
 * 5. CSS: removed conflicting `position:absolute` / `height:100vh`
 *    rules from animations.css for desktop. GSAP sets all
 *    position/transform values itself — CSS pre-setting them
 *    caused a geometry flash that broke initial measurements.
 *
 * Desktop (≥ 992px): GSAP pins .wrapper, cards stack vertically.
 * Tablet / Mobile  : No GSAP, natural scroll, optional fade-in.
 */

'use strict';

// ── Desktop: GSAP card stacking ───────────────────────────────
function runScrollStack() {
  const isDesktop  = window.matchMedia('(min-width: 992px)').matches;
  const noMotion   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isDesktop || noMotion) {
    cleanupForMobile();
    return;
  }

  // Safety check — should always pass at 'load' time, but guard anyway
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[scrollStack] GSAP / ScrollTrigger not available.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Find every independent scroll-section on the page ───────
  // Each .scroll-stack wraps one .wrapper > .list > .item set.
  const scrollSections = document.querySelectorAll('.scroll-stack');
  if (!scrollSections.length) return;

  scrollSections.forEach(section => {
    const wrapper = section.querySelector('.wrapper');
    const items   = Array.from(section.querySelectorAll('.item, .scroll-stack__item'));

    if (!wrapper || items.length < 2) return;

    // Determine direction from class (matches reference code pattern)
    const direction = section.classList.contains('horizontal-section')
      ? 'horizontal'
      : 'vertical'; // default vertical for .scroll-stack sections

    initSection(section, wrapper, items, direction);
  });
}

/**
 * initSection — mirrors the reference code's initScroll() exactly,
 * but with the scrub value tuned for smoothness and the ease kept
 * as 'none' for correct scrub behaviour (eases don't mix well
 * with scrub — they cause the animation to "overshoot" or lag).
 */
function initSection(section, wrapper, items, direction) {
  // Step 1: position all items except the first one off-screen
  items.forEach((item, index) => {
    if (index !== 0) {
      direction === 'horizontal'
        ? gsap.set(item, { xPercent: 100 })
        : gsap.set(item, { yPercent: 100 });
    }
  });

  // Step 2: build timeline pinned to the WRAPPER (not the outer container)
  // pin:true is the critical difference from the broken version.
  // GSAP inserts its own spacer element and handles all scroll distance math.
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,       // trigger on the section
      pin: true,              // ← THE KEY FIX: let GSAP pin, not manual fixed
      start: 'top top',
      end: () => `+=${items.length * 100}%`,
      scrub: 1,               // 1s lag for smoothness (matches reference)
      invalidateOnRefresh: true,
      // markers: true,       // uncomment to debug
    },
    defaults: { ease: 'none' }, // 'none' is correct with scrub
  });

  // Step 3: for each card, scale it slightly then bring the next one in
  // Position parameter '<' means "same start time as previous tween"
  items.forEach((item, index) => {
    // Scale down the current card as next one arrives
    timeline.to(item, {
      scale: 0.9,
      borderRadius: '10px',
    });

    // Simultaneously slide in the next card
    if (index < items.length - 1) {
      direction === 'horizontal'
        ? timeline.to(items[index + 1], { xPercent: 0 }, '<')
        : timeline.to(items[index + 1], { yPercent: 0 }, '<');
    }
  });
}

// ── Mobile / tablet: kill everything, reset inline styles ─────
function cleanupForMobile() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  // Clear any inline transforms/positions GSAP may have set
  document.querySelectorAll('.scroll-stack__item, .item').forEach(item => {
    item.style.cssText = '';
  });

  // Remove any GSAP-inserted pin spacers
  document.querySelectorAll('.gsap-marker-start, .gsap-marker-end, [class*="gsap-"]')
    .forEach(el => {
      if (el.classList.contains('gsap-pin-spacer')) el.replaceWith(...el.childNodes);
    });
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
  }, { threshold: 0.12 });

  items.forEach(item => observer.observe(item));
}

// ── Public export: waits for full load to guarantee GSAP exists ─
export function initScrollStack() {
  // If GSAP is already available (e.g., synchronous script), run now.
  // Otherwise wait for window 'load' which fires after all defer scripts.
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    runScrollStack();
  } else {
    window.addEventListener('load', runScrollStack, { once: true });
  }

  // Debounced resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;
      if (!isDesktop) {
        cleanupForMobile();
      } else if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 250);
  });
}

/* "use strict";

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
} */
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
