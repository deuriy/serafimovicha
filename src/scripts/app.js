new Swiper(".HeroSlider .swiper-container", {
  a11y: {
    enabled: false,
  },
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },

  pagination: {
    el: ".HeroSlider_pagination",
    bulletClass: "SwiperPagination_bullet",
    bulletActiveClass: "SwiperPagination_bullet-active",
    clickable: true,
  },

  navigation: {
    nextEl: ".HeroSlider_circleBtn",
  },
});

new Swiper(".AdvantagesSlider .swiper-container", {
  a11y: {
    enabled: false,
  },
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },

  pagination: {
    el: ".AdvantagesSlider_pagination",
    bulletClass: "SwiperPagination_bullet",
    bulletActiveClass: "SwiperPagination_bullet-active",
    clickable: true,
  },

  navigation: {
    nextEl: ".AdvantagesSlider .CircleBtn-next",
  },
});

const planningSolutionsSliders = [];
document.querySelectorAll(".PlanningSolutionsSlider").forEach(function (item) {
  "use strict";
  planningSolutionsSliders.push(
    new Swiper(`#${item.id} .swiper-container`, {
      a11y: {
        enabled: false,
      },
      slidesPerView: "auto",
      spaceBetween: 16,
      centeredSlides: true,
      loop: true,

      pagination: {
        el: `#${item.id} .SwiperPagination`,
        bulletClass: "SwiperPagination_bullet",
        bulletActiveClass: "SwiperPagination_bullet-active",
        clickable: true,
      },

      navigation: {
        nextEl: `#${item.id} + .CircleBtn-next`,
      },

      breakpoints: {
        768: {
          spaceBetween: 32,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    })
  );
});

const gallerySliders = [];
document.querySelectorAll(".GallerySlider").forEach(function (item) {
  "use strict";
  gallerySliders.push(
    new Swiper(`#${item.id} .swiper-container`, {
      a11y: {
        enabled: false,
      },
      slidesPerView: "auto",
      spaceBetween: 65,
      centeredSlides: true,

      pagination: {
        el: `#${item.id} .GallerySlider_pagination`,
        bulletClass: "SwiperPagination_bullet",
        bulletActiveClass: "SwiperPagination_bullet-active",
        clickable: true,
      },

      navigation: {
        nextEl: `#${item.id} + .GallerySlider_circleBtn`,
      },

      breakpoints: {
        1920: {
          spaceBetween: 96,
        },
      },
    })
  );
});

document.querySelectorAll(".Tabs_list").forEach(function (tabList) {
  "use strict";
  tabList.querySelectorAll(".Tabs_item").forEach(function (tab, tabIndex) {
    tab.onclick = () => {
      const activeTab = tab.parentNode.querySelector(".Tabs_item-active");

      if (activeTab) {
        activeTab.classList.remove("Tabs_item-active");
      }

      tab.classList.add("Tabs_item-active");

      const parent = tab.closest(".Tabs");
      const tabsContent = parent.querySelectorAll(".Tabs_content");

      tabsContent.forEach((tabContent) => {
        tabContent.style.display = "none";
      });

      tabsContent[tabIndex].style.display = "block";

      const planningSolutionsSlider = tabsContent[tabIndex].querySelector(
        ".PlanningSolutionsSlider"
      );
      if (planningSolutionsSlider) {
        planningSolutionsSliders[tabIndex].update();
      }

      const gallerySlider = tabsContent[tabIndex].querySelector(".GallerySlider");
      if (gallerySlider) {
        gallerySliders[tabIndex].update();
      }
    };
  });
});

document.addEventListener("click", function (e) {
  "use strict";
  const openMenuLink = e.target.closest(".CircleIcon-menuHamburger");

  if (!openMenuLink) {
    return;
  }

  const heroSectionNavbar = document.querySelector(".Navbar-heroSection");

  if (!heroSectionNavbar) {
    return;
  }

  heroSectionNavbar.classList.add("Navbar-opened");

  document.body.style.overflow = "hidden";

  e.preventDefault();
});

document.addEventListener("click", function (e) {
  "use strict";
  const closeMenuLink = e.target.closest(".CircleIcon-closeMenu");

  if (!closeMenuLink) {
    return;
  }

  const heroSectionNavbar = document.querySelector(".Navbar-heroSection");

  if (!heroSectionNavbar) {
    return;
  }

  heroSectionNavbar.classList.remove("Navbar-opened");

  document.body.style.cssText = "";

  e.preventDefault();
});

document.addEventListener("click", function (e) {
  "use strict";
  const menuLink = e.target.closest(".MenuLink");

  if (!menuLink) {
    return;
  }

  menuLink.classList.add("MenuLink-open");

  const navbar = document.querySelector(".Navbar-offCanvas");
  const overlay = navbar.nextElementSibling;

  navbar.classList.add("Navbar-opened");

  if (overlay) {
    overlay.classList.remove("Overlay-hidden");
  }
  e.preventDefault();
});

document.addEventListener("click", function (e) {
  "use strict";
  const navbar = document.querySelector(".Navbar-offCanvas");
  const menuLinkOpened = document.querySelector(".MenuLink-open");
  const overlay = navbar.nextElementSibling;

  if (!navbar.contains(e.target) && menuLinkOpened && !menuLinkOpened.contains(e.target)) {
    navbar.classList.remove("Navbar-opened");
    menuLinkOpened.classList.remove("MenuLink-open");

    if (overlay) {
      overlay.classList.add("Overlay-hidden");
    }
  }
});

document.addEventListener("click", function (e) {
  "use strict";
  const navbarCloseBtn = e.target.closest(".Navbar-offCanvas .Navbar_closeBtn");

  if (!navbarCloseBtn) {
    return;
  }

  const navbar = navbarCloseBtn.closest(".Navbar-offCanvas");
  const menuLink = document.querySelector(".MenuLink");
  const overlay = navbar.nextElementSibling;

  navbar.classList.remove("Navbar-opened");
  menuLink.classList.remove("MenuLink-open");

  if (overlay) {
    overlay.classList.add("Overlay-hidden");
  }
  e.preventDefault();
});

document.addEventListener("click", function (e) {
  "use strict";
  const openHousePlan = e.target.closest('[data-action="openHousePlan"]');

  if (!openHousePlan) {
    return;
  }

  const apartmentChoosing = openHousePlan.closest(".ApartmentChoosing");
  const apartmentChoosingLeft = apartmentChoosing.querySelector(".ApartmentChoosing_left");

  apartmentChoosingLeft.classList.add("ApartmentChoosing_left-opened");

  e.preventDefault();
});

document.addEventListener("click", function (e) {
  "use strict";
  const closeHousePlan = e.target.closest('[data-action="closeHousePlan"]');

  if (!closeHousePlan) {
    return;
  }

  const apartmentChoosing = closeHousePlan.closest(".ApartmentChoosing");
  const apartmentChoosingLeft = apartmentChoosing.querySelector(".ApartmentChoosing_left");

  apartmentChoosingLeft.classList.remove("ApartmentChoosing_left-opened");

  e.preventDefault();
});

const estateObjCardTpl = document.querySelector("#estateObjCardTpl").content;

$(".HousePlan_scheme").tooltip({
  items: ".HousePlan_item",
  show: false,
  hide: false,
  track: true,
  content: function () {
    "use strict";
    const $el = $(this);
    const tplNode = estateObjCardTpl.cloneNode(true);

    tplNode
      .querySelector(".RealEstate_title")
      .insertAdjacentHTML("afterbegin", $el.data("bedrooms"));

    tplNode
      .querySelector(".RealEstate_apartmentNumber")
      .insertAdjacentHTML("beforeend", $el.data("num"));

    tplNode
      .querySelector(".RealEstate_characteristicValue-footage")
      .insertAdjacentHTML("afterbegin", $el.data("footage"));

    tplNode
      .querySelector(".RealEstate_characteristicValue-price")
      .insertAdjacentHTML("afterbegin", $el.data("price").toLocaleString());
    return tplNode;
  },
});

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  "use strict";

  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
