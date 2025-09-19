(function ($) {
  "use strict";

  ///=============  Background Image  =============\\\
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });


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
    // Step 1: Hide all submenus initially
    $(".responsive-sidebar-submenu").hide();

    // Step 2: Toggle submenus on click
    $(".responsive-sidebar-menu-list").on(
      "click",
      ".has-dropdown > a",
      function (e) {
        e.preventDefault();

        var $clickedItem = $(this).parent(".has-dropdown");
        var $submenu = $clickedItem.children(".responsive-sidebar-submenu");

        // Close other submenus at the same level
        $clickedItem
          .siblings(".has-dropdown")
          .removeClass("open")
          .children(".responsive-sidebar-submenu")
          .slideUp();

        // Also close all nested open submenus inside this clicked item (for clean collapse)
        $clickedItem
          .siblings(".has-dropdown")
          .find(".has-dropdown")
          .removeClass("open")
          .children(".responsive-sidebar-submenu")
          .slideUp();

        // Toggle current submenu
        $clickedItem.toggleClass("open");
        $submenu.stop(true, true).slideToggle();
      }
    );
  });



  ///=============  Banner Three Slider myjs  =============\\\

  const progressFill = document.querySelector(".progress-fill");
  const progressContent = document.querySelector(".autoplay-progress span");

  // Award Swiper
 
   let delay = 5000;
let $awardBarFill = $(".award-bar .progress-bar-fill");
let $awardBarText = $(".award-bar span");

let awardSwiper = new Swiper(".awardSwiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: delay,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".award-next",
    prevEl: ".award-prev"
  },
   on: {
    slideChangeTransitionStart: function () {
      resetProgressBar(".award-bar .progress-bar-fill");
    },
    slideChangeTransitionEnd: function () {
      startProgressBar(".award-bar .progress-bar-fill", delay);
    },
    init: function () {
      startProgressBar(".award-bar .progress-bar-fill", delay);
    }
  }
/*   on: {
    autoplayTimeLeft(swiper, time, progress) {
      $awardBarFill.css("width", `${progress * 100}%`);
      $awardBarText.text(`${Math.ceil(time / 1000)}s`);
    }
  } */
});


  let $recentBarFill = $(".recent-bar .progress-bar-fill");
let $recentBarText = $(".recent-bar span");

let recentSwiper = new Swiper(".recentEventsSwiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: delay,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".recent-next",
    prevEl: ".recent-prev"
  },
    on: {
    slideChangeTransitionStart: function () {
      resetProgressBar(".recent-bar .progress-bar-fill");
    },
    slideChangeTransitionEnd: function () {
      startProgressBar(".recent-bar .progress-bar-fill", delay);
    },
    init: function () {
      startProgressBar(".recent-bar .progress-bar-fill", delay);
    }
  }
/*   on: {
    autoplayTimeLeft(swiper, time, progress) {
      $recentBarFill.css("width", `${progress * 100}%`);
      $recentBarText.text(`${Math.ceil(time / 1000)}s`);
    }
  } */
});


function startProgressBar(selector, duration) {
  const $bar = $(selector);
  $bar.css({
    width: "0%",
    transition: "none"
  });

  // Force reflow to restart animation
  void $bar[0].offsetWidth;

  $bar.css({
    width: "100%",
    transition: `width ${duration}ms linear`
  });
}

function resetProgressBar(selector) {
  const $bar = $(selector);
  $bar.css({
    width: "0%",
    transition: "none"
  });
}

    // ✅ Progress Functions
/*     function startProgress($bar, nextSlideCallback, delay, timerRef) {
      if (!$bar || $bar.length === 0 || !$bar[0]) {
        console.warn("Missing progress bar element:", $bar);
        return;
      }

      $bar.css({ width: "0%", transition: "none" });
      void $bar[0].offsetWidth;
      $bar.css({ transition: `width ${delay}ms linear`, width: "100%" });

      timerRef = setTimeout(nextSlideCallback, delay);

      if ($bar.hasClass("award-bar")) awardTimer = timerRef;
      if ($bar.hasClass("recent-bar")) recentTimer = timerRef;
    } */


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

  const bannerSlider = new Swiper(".bannerSlider", {
    loop: true,
    speed: 2000, // smooth transition
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
    navigation: {
      nextEl: ".banner-next",
      prevEl: ".banner-perv",
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



   ///============= CounterUp =============\\\
/*   var counter = $(".counter");
  counter.counterUp({
    time: 2500,
    delay: 100,
  });
 */
  

  // Make ScrollTrigger available for use in GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Select the HTML elements needed for the animation
const scrollSection = document.querySelectorAll(".scroll-section");

scrollSection.forEach((section) => {
  const wrapper = section.querySelector(".wrapper");
  const items = wrapper.querySelectorAll(".item");

  // Initialize
  let direction = null;

  if (section.classList.contains("vertical-section")) {
    direction = "vertical";
  } else if (section.classList.contains("horizontal-section")) {
    direction = "horizontal";
  }

  initScroll(section, items, direction);
});

function initScroll(section, items, direction) {
  // Initial states
  items.forEach((item, index) => {
    if (index !== 0) {
      direction == "horizontal"
        ? gsap.set(item, { xPercent: 100 })
        : gsap.set(item, { yPercent: 100 });
    }
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${items.length * 100}%`,
      scrub: 1,
      // snap: 1 / (items.length - 1),
      invalidateOnRefresh: true,
      // markers: true,
    },
    defaults: { ease: "power2.out" },
  });
  items.forEach((item, index) => {
    timeline.to(item, {
      scale: 1,
      // borderRadius: "10px",
    });

    direction == "horizontal"
      ? timeline.to(
          items[index + 1],
          {
            xPercent: 0,
          },
          "<"
        )
      : timeline.to(
          items[index + 1],
          {
            yPercent: 0,
          },
          "<"
        );
  });
}

 

  
})(jQuery);
