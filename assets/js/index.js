(function ($) {
  "use strict";

  ///=============  Background Image  =============\\\
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

  ///=============  Search Icon  =============\\\
  /*   $(document).on(
    "click",
    ".header__area-menubar-right-box-search-icon.open",
    function () {
      $(".header__area-menubar-right-box-search-box")
        .fadeIn()
        .addClass("active");
    }
  );
  $(document).on(
    "click",
    ".header__area-menubar-right-box-search-box-icon i",
    function () {
      $(".header__area-menubar-right-box-search-box")
        .fadeOut()
        .removeClass("active");
    }
  );
  $(document).on(
    "click",
    ".header__area-menubar-right-box-search-box form",
    function (e) {
      e.stopPropagation();
    }
  ); */

  ///=============  Sidebar Popup  =============\\\
  /*   $(document).on(
    "click",
    ".header__area-menubar-right-box-sidebar-popup-icon",
    function () {
      $(".header__area-menubar-right-sidebar-popup").addClass("active");
      $(".sidebar-overlay").addClass("show");
    }
  );
  $(document).on(
    "click",
    ".header__area-menubar-right-sidebar-popup .sidebar-close-btn, .sidebar-overlay",
    function () {
      $(".header__area-menubar-right-sidebar-popup").removeClass("active");
      $(".sidebar-overlay").removeClass("show");
    }
  );
 */
  ///=============  Responsive Menu  =============\\\

  // Open Menu
  $(document).on("click", "#hamburger-toggl, #hamburger-toggle", function () {
    $(".responsive__menu").addClass("active");
    $(".menu-overlay").addClass("active");
  });

  // Close Menu
  $(document).on("click", ".close-hide-show, .menu-overlay", function () {
    $(".responsive__menu").removeClass("active");
    $(".menu-overlay").removeClass("active");
  });

  // Dropdown Toggle
  $(document).ready(function () {
    $(".responsive-sidebar-menu-list__item.has-dropdown").removeClass("open");

    $(".responsive-sidebar-menu-list__item.has-dropdown > a").on(
      "click",
      function (e) {
        e.preventDefault();

        var $currentItem = $(this).parent();
        var $allItems = $(".responsive-sidebar-menu-list__item.has-dropdown");

        $allItems.not($currentItem).removeClass("open");
        $currentItem.toggleClass("open");
      }
    );
  });

  /* 
    $("#hamburger-toggl").on("click", function () {
    $(".responsive__menu").addClass("active");
  });

  $(".close-hide-show").on("click", function () {
    $(".responsive__menu").removeClass("active");
  });

  $(document).ready(function () {
    $(".responsive-sidebar-menu-list__item.has-dropdown").removeClass("open");

    $(".responsive-sidebar-menu-list__item.has-dropdown > a").on(
      "click",
      function (e) {
        e.preventDefault();

        var $currentItem = $(this).parent();
        var $allItems = $(".responsive-sidebar-menu-list__item.has-dropdown");

        $allItems.not($currentItem).removeClass("open");
        $currentItem.toggleClass("open");
      }
    );
  }); */
  /* \\\\\\\\\ */
  $(document).on("click", ".sidebar-menu-show-hide", function () {
    $(".responsive__menu").addClass("show");
    $(".menu-overlay").addClass("show");
  });
  $(document).on("click", ".menu-overlay, .close-hide-show", function () {
    $(".responsive__menu").removeClass("show");
    $(".menu-overlay").removeClass("show");
  });
  $(document).on("click", ".has-dropdown > a", function (e) {
    e.preventDefault();
    let $parent = $(this).parent();
    let $siblings = $parent.siblings(".has-dropdown");

    $siblings
      .removeClass("active")
      .children(".responsive-sidebar-submenu")
      .slideUp(200);

    if ($parent.hasClass("active")) {
      $parent
        .removeClass("active")
        .children(".responsive-sidebar-submenu")
        .slideUp(200);
    } else {
      $parent
        .addClass("active")
        .children(".responsive-sidebar-submenu")
        .slideDown(200);
    }
  });

  ///============= Header Sticky =============\\\
  /*   $(function () {
    let $window = $(window);
    let $header = $(".header__sticky");

    $window.on("scroll", function () {
      let scrollDown = parseInt($window.scrollTop(), 10); // Explicit radix added
      $header.toggleClass("header__sticky-sticky-menu", scrollDown >= 135);
    });
  }); */

  ///=============  Banner Three Slider myjs  =============\\\

  // Award Swiper

  let sliderOne = new Swiper(".recentEventsSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".recent-next",
      prevEl: ".recent-prev",
    },
  });

  let awardSwiper = ".awardSwiper";
  let sliderTwo = new Swiper(awardSwiper, {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".award-next",
      prevEl: ".award-prev",
    },
  });

  // ✅ Swiper for .heroSwiper (Independent thumbnail/card slider)
  const thumbSwiper = new Swiper(".heroSwiper", {
    spaceBetween: 30,
    slidesPerView: 3,
    // autoplay: {
    //   delay: 6000,
    //   disableOnInteraction: false,
    // },
    loop: true,
    navigation: {
      nextEl: ".hero-button-next",
      prevEl: ".hero-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  // ✅ Hero Content Text Data
  const heroContentData = [
    {
      text: "The Tata group comprises over 100 operating companies in seven business sectors: communications and information technology, engineering, materials, services, energy, consumer products and chemicals. The group has operations in more than 80 countries across six continents, and its companies export products and services to 85 countries, consistently maintaining global standards, innovation, and a commitment to responsible business practices across all industries they engage in worldwide.",
    },
    {
      text: "Jamshedpur, India’s best-planned industrial city, is managed by Tata Steel UISL. With 37% green cover, advanced civic services, and pioneering smart city initiatives, it leads in water, waste, and energy management. Its 24x7 control center and digital innovations make it a national benchmark for urban infrastructure and sustainable municipal services, enhancing quality of life and driving inclusive, technology-enabled development across various urban sectors.",
    },
    {
      text: "Tata Steel UISL delivers end-to-end industrial integrated services, ensuring operational efficiency, sustainability, and optimized utility management. With deep expertise in infrastructure and project execution, it offers seamless O&M services and project management solutions tailored for industrial ecosystems—supporting uninterrupted operations across diverse sectors with innovation, precision, and a long-term focus on customer-centric, sustainable performance excellence.",
    },
    {
      text: "Tata Steel UISL delivers end-to-end water and wastewater solutions, from treatment and distribution to recycling and customer support. Serving both industrial and domestic sectors, the company integrates O&M, GIS, NRW reduction, and EPC services across India. With proven expertise, it modernizes infrastructure while ensuring sustainability and efficiency in every project, contributing to water conservation, resource optimization, and resilient urban utility networks.",
    },
    {
      text: "Tata Steel UISL, India’s first private citywide power utility since 1923, manages over 1200 km of distribution with 99.9% reliability and minimal T&D losses. Operating in Jamshedpur and Seraikela-Kharsawan, it sets national benchmarks with SCADA, GIS integration, and award-winning efficiency—earning three consecutive Gold Shields from the Ministry of Power, while advancing smart energy practices and greener infrastructure solutions.",
    },
    {
      text: "Tata Steel UISL offers end-to-end EPC solutions—from design and planning to execution—for residential, industrial, and township infrastructure. With a strong focus on safety and quality, the company has delivered landmark projects across India, including housing, water treatment, industrial plants, and urban development, supporting smart, sustainable growth and strengthening regional infrastructure with efficient, future-ready engineering.",
    },
  ];

  // ✅ Function to update text content
  function updateHeroContent(index) {
    const content = heroContentData[index];
    if (content) {
      $(".hero-content p").text(content.text);
    }
  }

  // ✅ Main Swiper for .heroSwiper2 (Banner Slider with Content Update)
  const mainSwiper = new Swiper(".heroSwiper2", {
    loop: true,
    speed: 5000, // smooth transition
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: "creative",
    creativeEffect: {
      limitProgress: 2, // makes transition extend over time
      perspective: true,
      prev: {
        opacity: 0,
        scale: 1.5,
        translate: [0, 0, -300],
      },
      next: {
        opacity: 0,
        scale: 1.5,
        translate: [0, 0, -300],
      },
      current: {
        opacity: 1,
        scale: 1,
        translate: [0, 0, 0],
      },
    },
    pagination: {
      el: ".hero-pagination",
      clickable: true,
    },
    thumbs: {
      swiper: thumbSwiper,
    },
    on: {
      init: function () {
        updateHeroContent?.(this.realIndex);
      },
      slideChange: function () {
        updateHeroContent?.(this.realIndex);
      },
    },
  });

  $(".hero-button-next").on("click", function () {
    mainSwiper.slideNext(); // ✅ This will auto move thumbSwiper too
  });

  $(".hero-button-prev").on("click", function () {
    mainSwiper.slidePrev(); // ✅ This will auto move thumbSwiper too
  });

 
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header__sticky");
    if (!header) return;

    // Scroll position from top
    const scrollY = window.scrollY || window.pageYOffset;

    // Add glass effect if scroll is more than 100vh (window.innerHeight)
    if (scrollY > window.innerHeight) {
      header.classList.add("glass");
    } else {
      header.classList.remove("glass");
    }
  });

  gsap.registerPlugin(ScrollTrigger);

  $(".scroll-section").each(function () {
    const $section = $(this);
    const $wrapper = $section.find(".wrapper");
    const $items = $wrapper.find(".item");

    initScroll($section[0], $items);
  });

  /* for parallex  */

  function initScroll(section, $items) {
    // Initial state: first item visible, baaki neeche (yPercent: 100)
    $items.each(function (index) {
      if (index !== 0) {
        gsap.set(this, { yPercent: 100 });
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${$items.length * 100}%`,
        scrub: 1,
        invalidateOnRefresh: true,
        // markers: true,
      },
      defaults: { ease: "none" },
    });

    $items.each(function (index) {
      if (index === $items.length - 1) return; // last item ke baad kuch nahi karna

      const currentItem = $items[index];
      const nextItem = $items[index + 1];

      timeline.to(currentItem, {
        scale: 0.9,
        borderRadius: "10px",
      });

      timeline.to(
        nextItem,
        {
          yPercent: 0,
        },
        "<"
      );
    });
  }

   ///============= CounterUp =============\\\
  var counter = $(".counter");
  counter.counterUp({
    time: 2500,
    delay: 100,
  });

})(jQuery);
