(function () {
  "use strict";

  /**-------------------------------
   * Easy selector helper function
   --------------------------*/
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**------------------------------
   * Easy event listener function
   ----------------------*/
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**-------------------
   * Sidebar toggle
   ----------------------*/
  if (select(".toggle-sidebar-btn")) {
    on("click", ".toggle-sidebar-btn", function (e) {
      select("body").classList.toggle("toggle-sidebar");
    });
  }

  /**-------------------------------
     * Search bar toggle
     ------------------------------*/
  if (select(".search-bar-toggle")) {
    on("click", ".search-bar-toggle", function (e) {
      select(".search-bar").classList.toggle("search-bar-show");
    });
  }

  /**-------------------
   * Easy on scroll event listener
   -----------------------*/
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**----------------------------
   * Navbar links active state on scroll
   ---------------------*/
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**---------------------------
   * Scrolls to an element with header offset
   ----------------------------*/
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**---------------------------------------
   * Toggle .header-scrolled class to #header when page is scrolled
   -----------------------------*/
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**--------------------------
   * Back to top button
   -----------------------*/
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**-----------------------
   * Mobile nav toggle
   ---------------------*/
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**-----------------------------
   * Mobile nav dropdowns activate
   ----------------------*/
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**-----------------------------------
   * Scrool with ofset on links with a class name .scrollto
   --------------------*/
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**--------------------------------------------
   * Scroll with ofset on page load with hash links in the url
   --------------------------------------------*/
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**-------------------------
   * Gallery Slider
   --------------------------*/
  new Swiper(".gallery-slider", {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  /**----------------------------
   * Initiate gallery lightbox
   -----------------------*/
  const galleryLightbox = GLightbox({
    selector: ".gallery-lightbox",
  });

  /**----------------------------------
   * Community App / Testimonials slider
   ----------------------------------*/
  new Swiper(".testimonials-slider", {
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },

      1200: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  });

  // *------------------
  // Linkdin slider
  // ------------------*/

  new Swiper(".linkdin-slider", {
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });

  /**--------------------------
   * Animation on scroll
   ---------------------------*/
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

// --------------------
// Hero-banner image changer
// --------------------
const parallax = document.getElementById("parallax");

// Parallax Effect for DIV 1
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.7 + "px";
  // DIV 1 background will move slower than other elements on scroll.
});

/**-------------------------
 * Clients Slider
 --------------------------*/
new Swiper(".clients-slider", {
  speed: 1000,
  loop: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 80,
    },
    992: {
      slidesPerView: 6,
      spaceBetween: 120,
    },
  },
});

//
// Whatsapp Testimonial //
//
var swiper = new Swiper(".swiper-wp", {
  speed: 800,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

/*--------------------------------
# Biggest Finance community
----------------------------------*/

const myFunction = () => {
  document.getElementById("first").style.display = "block";
  document.getElementById("second").style.display = "none";
  document.getElementById("third").style.display = "none";
};

const myFunction2 = () => {
  document.getElementById("second").style.display = "block";
  document.getElementById("first").style.display = "none";
  document.getElementById("third").style.display = "none";
};

const myFunction3 = () => {
  document.getElementById("third").style.display = "block";
  document.getElementById("first").style.display = "none";
  document.getElementById("second").style.display = "none";
};

/**
 * Hero Slider
 */
var swiper = new Swiper(".sliderFeaturedPosts", {
  spaceBetween: 0,
  speed: 500,
  centeredSlides: true,
  loop: true,
  slideToClickedSlide: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".custom-swiper-button-next",
    prevEl: ".custom-swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    1200: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  },
});

/**
 * Open and close the search form.
 */
const searchOpen = document.querySelector(".js-search-open");
const searchClose = document.querySelector(".js-search-close");
const searchWrap = document.querySelector(".js-search-form-wrap");

searchOpen.addEventListener("click", (e) => {
  e.preventDefault();
  searchWrap.classList.add("active");
});

searchClose.addEventListener("click", (e) => {
  e.preventDefault();
  searchWrap.classList.remove("active");
});
