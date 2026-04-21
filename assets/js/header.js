/**
 * header.js
 * Handles: sticky header, search overlay, responsive nav (hamburger)
 */

'use strict';

export function initHeader() {
  const header      = document.querySelector('.site-header');
  const threshold   = window.innerHeight * 0.9;

  // ── Sticky / scroll state ────────────────────────────────
  const onScroll = () => {
    if (!header) return;
    const scrolled = window.scrollY > threshold;
    header.classList.toggle('site-header--scrolled', scrolled);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on init

  // ── Search overlay ───────────────────────────────────────
  const searchToggle  = document.querySelector('.header-search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose   = document.querySelector('.search-overlay__close');
  const searchInput   = document.querySelector('.search-overlay__input');

  const openSearch = () => {
    searchOverlay?.classList.add('is-open');
    searchOverlay?.setAttribute('aria-hidden', 'false');
    searchToggle?.setAttribute('aria-expanded', 'true');
    setTimeout(() => searchInput?.focus(), 120);
  };

  const closeSearch = () => {
    searchOverlay?.classList.remove('is-open');
    searchOverlay?.setAttribute('aria-hidden', 'true');
    searchToggle?.setAttribute('aria-expanded', 'false');
    searchToggle?.focus();
  };

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);

  // Close on overlay background click
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (searchOverlay?.classList.contains('is-open')) closeSearch();
      if (isNavOpen()) closeNav();
    }
  });

  // ── Responsive nav ───────────────────────────────────────
  const navOverlay   = document.querySelector('.nav-overlay');
  const responsiveNav= document.querySelector('.responsive-nav');
  const navClose     = document.querySelector('.responsive-nav__close');
  const hamburgers   = document.querySelectorAll('.header-hamburger, .header-menu-toggle');

  const isNavOpen = () => responsiveNav?.classList.contains('is-open');

  const openNav = () => {
    responsiveNav?.classList.add('is-open');
    navOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    hamburgers.forEach(b => b.setAttribute('aria-expanded', 'true'));
    // Focus first focusable item
    setTimeout(() => navClose?.focus(), 80);
  };

  const closeNav = () => {
    responsiveNav?.classList.remove('is-open');
    navOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburgers.forEach(b => b.setAttribute('aria-expanded', 'false'));
  };

  hamburgers.forEach(btn => btn.addEventListener('click', openNav));
  navClose?.addEventListener('click', closeNav);
  navOverlay?.addEventListener('click', closeNav);

  // ── Accordion dropdowns inside nav ──────────────────────
  const dropdownTriggers = responsiveNav?.querySelectorAll('.nav-menu__link--has-children');

  dropdownTriggers?.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parentLi  = trigger.closest('.nav-menu__item');
      const submenu   = parentLi?.querySelector(':scope > .nav-submenu');
      const isOpen    = parentLi?.classList.contains('is-open');

      // Close all siblings
      const siblings = parentLi?.parentElement?.querySelectorAll('.nav-menu__item.is-open');
      siblings?.forEach(sib => {
        if (sib !== parentLi) {
          sib.classList.remove('is-open');
          sib.querySelector('.nav-menu__link')?.setAttribute('aria-expanded', 'false');
        }
      });

      parentLi?.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Same for sub-sub-menu items
  const subDropTriggers = responsiveNav?.querySelectorAll('.nav-submenu__link--has-children');
  subDropTriggers?.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parentLi = trigger.closest('.nav-submenu__item');
      const isOpen   = parentLi?.classList.contains('is-open');
      parentLi?.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Trap focus inside nav when open
  responsiveNav?.addEventListener('keydown', (e) => {
    if (!isNavOpen()) return;
    const focusable = Array.from(
      responsiveNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.disabled);

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    }
  });
}