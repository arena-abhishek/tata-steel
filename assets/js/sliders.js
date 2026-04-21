/**
 * sliders.js
 * All Swiper instances: hero background, hero thumbnails, banner, recent events, awards.
 * Progress bar helpers included.
 */

'use strict';

// ── Progress bar helpers ──────────────────────────────────────
const AUTOPLAY_DELAY = 5000;

function startProgressBar(selector, duration) {
  const bar = document.querySelector(selector);
  if (!bar) return;
  bar.style.width = '0%';
  bar.style.transition = 'none';
  // Force reflow
  void bar.offsetWidth;
  bar.style.transition = `width ${duration}ms linear`;
  bar.style.width = '100%';
}

function resetProgressBar(selector) {
  const bar = document.querySelector(selector);
  if (!bar) return;
  bar.style.transition = 'none';
  bar.style.width = '0%';
}

// ── Hero content data ─────────────────────────────────────────
const heroSlides = [
  {
    title: 'Tata Steel UISL',
    description:
      'The Tata group comprises over 100 operating companies across seven business sectors spanning more than 80 countries. Consistently maintaining global standards, innovation, and a commitment to responsible business practices across all industries worldwide.',
  },
  {
    title: 'Integrated Town O&M Services',
    description:
      'Jamshedpur, India\'s best-planned industrial city, is managed by Tata Steel UISL. With 37% green cover, advanced civic services, and pioneering smart city initiatives, it leads in water, waste, and energy management.',
  },
  {
    title: 'Industrial Integrated Services',
    description:
      'Tata Steel UISL delivers end-to-end industrial integrated services, ensuring operational efficiency, sustainability, and optimized utility management with deep expertise in infrastructure and project execution.',
  },
  {
    title: 'Water & Wastewater Services',
    description:
      'Tata Steel UISL delivers end-to-end water and wastewater solutions, from treatment and distribution to recycling. Serving both industrial and domestic sectors with proven expertise in modernizing infrastructure.',
  },
  {
    title: 'Power Distribution Services',
    description:
      'India\'s first private citywide power utility since 1923, managing over 1200 km of distribution with 99.9% reliability. Earning three consecutive Gold Shields from the Ministry of Power.',
  },
  {
    title: 'Engineering, Procurement & Construction',
    description:
      'End-to-end EPC solutions—from design and planning to execution—for residential, industrial, and township infrastructure, with a strong focus on safety, quality, and smart sustainable growth.',
  },
];

function updateHeroText(index) {
  const p = document.querySelector('.hero__description');
  if (!p || !heroSlides[index]) return;
  // Smooth crossfade
  p.style.opacity = '0';
  p.style.transform = 'translateY(8px)';
  setTimeout(() => {
    p.textContent = heroSlides[index].description;
    p.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    p.style.opacity = '1';
    p.style.transform = 'translateY(0)';
  }, 200);
}

// ── Init sliders ──────────────────────────────────────────────
export function initSliders() {

  // 1. Hero thumbnail (controlled by main)
  const thumbSwiper = new Swiper('.heroSwiper', {
    spaceBetween: 16,
    slidesPerView: 3,
    loop: true,
    watchSlidesProgress: true,
    grabCursor: true,
    breakpoints: {
      0:    { slidesPerView: 1 },
      576:  { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
  });

  // 2. Hero main background
  const heroMain = new Swiper('.heroSwiper2', {
    loop: true,
    speed: 900,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    effect: 'creative',
    creativeEffect: {
      limitProgress: 2,
      perspective: true,
      prev: { opacity: 0, scale: 1.08, translate: [0, 0, -200] },
      next: { opacity: 0, scale: 1.08, translate: [0, 0, -200] },
      current: { opacity: 1, scale: 1,   translate: [0, 0, 0]    },
    },
    pagination: {
      el: '.hero__pagination',
      clickable: true,
    },
    thumbs: { swiper: thumbSwiper },
    a11y: { enabled: true },
    on: {
      init()        { updateHeroText(this.realIndex); },
      slideChange() { updateHeroText(this.realIndex); },
    },
  });

  // Wire external nav buttons to hero + thumb
  document.querySelector('.hero-btn-prev')?.addEventListener('click', () => heroMain.slidePrev());
  document.querySelector('.hero-btn-next')?.addEventListener('click', () => heroMain.slideNext());

  // 3. Banner slider
  if (document.querySelector('.bannerSlider')) {
    new Swiper('.bannerSlider', {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      effect: 'creative',
      creativeEffect: {
        limitProgress: 2,
        prev: { opacity: 0, scale: 1.06, translate: [0, 0, -180] },
        next: { opacity: 0, scale: 1.06, translate: [0, 0, -180] },
        current: { opacity: 1, scale: 1, translate: [0, 0, 0] },
      },
      pagination: {
        el: '.banner-section__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.banner-btn-next',
        prevEl: '.banner-btn-prev',
      },
      a11y: { enabled: true },
    });
  }

  // 4. Recent events swiper
  if (document.querySelector('.recentEventsSwiper')) {
    const recentSwiper = new Swiper('.recentEventsSwiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: {
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.recent-btn-next',
        prevEl: '.recent-btn-prev',
      },
      a11y: { enabled: true },
      on: {
        init() { startProgressBar('.recent-progress-fill', AUTOPLAY_DELAY); },
        slideChangeTransitionStart() { resetProgressBar('.recent-progress-fill'); },
        slideChangeTransitionEnd()   { startProgressBar('.recent-progress-fill', AUTOPLAY_DELAY); },
      },
    });
  }

  // 5. Awards swiper
  if (document.querySelector('.awardSwiper')) {
    const awardSwiper = new Swiper('.awardSwiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: {
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.award-btn-next',
        prevEl: '.award-btn-prev',
      },
      a11y: { enabled: true },
      on: {
        init() { startProgressBar('.award-progress-fill', AUTOPLAY_DELAY); },
        slideChangeTransitionStart() { resetProgressBar('.award-progress-fill'); },
        slideChangeTransitionEnd()   { startProgressBar('.award-progress-fill', AUTOPLAY_DELAY); },
      },
    });
  }
}