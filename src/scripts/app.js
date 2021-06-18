import { Example } from "./modules/example.js";
import Swiper from 'swiper/bundle';

const heroSlider = new Swiper('.HeroSlider', {
	effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  pagination: {
    el: '.HeroSlider .SwiperPagination',
    bulletClass: 'SwiperPagination_bullet',
    bulletActiveClass: 'SwiperPagination_bullet-active',
    clickable: true
  },

  navigation: {
    nextEl: '.HeroSlider .CircleBtn-next'
  }
});

const advantagesSlider = new Swiper('.AdvantagesSlider', {
	loop: true,
	effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  pagination: {
    el: '.AdvantagesSlider .SwiperPagination',
    bulletClass: 'SwiperPagination_bullet',
    bulletActiveClass: 'SwiperPagination_bullet-active',
    clickable: true
  },

  navigation: {
    nextEl: '.AdvantagesSlider .CircleBtn-next'
  }
});


let planningSolutionsSliders = [];
document.querySelectorAll('.PlanningSolutionsSlider').forEach(item => {
	planningSolutionsSliders.push(new Swiper(`#${item.id}`, {
		slidesPerView: 'auto',
		spaceBetween: 16,
		centeredSlides: true,
		loop: true,

		pagination: {
	    el: `#${item.id} .SwiperPagination`,
	    bulletClass: 'SwiperPagination_bullet',
	    bulletActiveClass: 'SwiperPagination_bullet-active',
	    clickable: true
	  },

	  navigation: {
	    nextEl: `#${item.id} + .CircleBtn-next`
	  },

	  breakpoints: {
	    768: {
	      // slidesPerView: 'auto',
				spaceBetween: 32,
				// loop: false,
				// centeredSlides: false
	    },
	    1200: {
	      slidesPerView: 3,
				spaceBetween: 24,
	    },
	    1920: {
				slidesPerView: 3,
	      spaceBetween: 32
	    }
	  }
	}));
});

let gallerySliders = [];
document.querySelectorAll('.GallerySlider').forEach(item => {
	gallerySliders.push(new Swiper(`#${item.id}`, {
		slidesPerView: 'auto',
		spaceBetween: 65,

		pagination: {
	    el: `#${item.id} .SwiperPagination`,
	    bulletClass: 'SwiperPagination_bullet',
	    bulletActiveClass: 'SwiperPagination_bullet-active',
	    clickable: true
	  },

	  navigation: {
	    nextEl: `#${item.id} + .CircleBtn-next`
	  },
		
		breakpoints: {
	    1920: {
	      spaceBetween: 96
	    }
	  }
	}));
});


document.querySelectorAll('.Tabs_list').forEach(tabList => {
	let activeTabItem = tabList.querySelector('.Tabs_item-active');
	if (activeTabItem) {
		let parent = activeTabItem.closest('.Tabs');
		let tabContent = parent.querySelector(`.Tabs_content:nth-child(${Number(activeTabItem.dataset.index) + 1})`);
		tabContent.style.display = 'block';
	}

	tabList.querySelectorAll('.Tabs_item').forEach((tab, tabIndex) => {
		tab.onclick = () => {
			let activeTab = tab.parentNode.querySelector('.Tabs_item-active');

			if (activeTab) {
				activeTab.classList.remove('Tabs_item-active');
			}

			tab.classList.add('Tabs_item-active');

			let parent = tab.closest('.Tabs');
			let tabsContent = parent.querySelectorAll('.Tabs_content');

			tabsContent.forEach(tabContent => {
				tabContent.style.display = 'none';
			});

			tabsContent[tabIndex].style.display = 'block';

			let planningSolutionsSlider = tabsContent[tabIndex].querySelector('.PlanningSolutionsSlider');
			if (planningSolutionsSlider) {
				planningSolutionsSliders[tabIndex].update();
			}

			let gallerySlider = tabsContent[tabIndex].querySelector('.GallerySlider');
			if (gallerySlider) {
				gallerySliders[tabIndex].update();
			}
		}
	});
});

document.addEventListener('click', function(e) {
  let openMenuLink = e.target.closest('.CircleIcon-menuHamburger');

  if (!openMenuLink) return;

  let heroSectionNavbar = document.querySelector('.Navbar-heroSection');

	if (!heroSectionNavbar) return;

  heroSectionNavbar.classList.add('Navbar-opened');

	document.body.style.overflow = 'hidden';

  e.preventDefault();
});

document.addEventListener('click', function(e) {
  let closeMenuLink = e.target.closest('.CircleIcon-closeMenu');

  if (!closeMenuLink) return;

  let heroSectionNavbar = document.querySelector('.Navbar-heroSection');

	if (!heroSectionNavbar) return;

  heroSectionNavbar.classList.remove('Navbar-opened');

	document.body.style.cssText = '';

  e.preventDefault();
});


document.addEventListener('click', function(e) {
  let menuLink = e.target.closest('.MenuLink');

  if (!menuLink) return;

  menuLink.classList.add('MenuLink-open');

  let navbar = document.querySelector('.Navbar-offCanvas');
  let overlay = navbar.nextElementSibling;

  navbar.classList.add('Navbar-opened');

  if (overlay) {
  	overlay.classList.remove('Overlay-hidden');
  }
  e.preventDefault();
});

document.addEventListener('click', function(e) {
  let navbar = document.querySelector('.Navbar-offCanvas');
  let menuLinkOpened = document.querySelector('.MenuLink-open');
  let overlay = navbar.nextElementSibling;

  if (!navbar.contains(e.target) && menuLinkOpened && !menuLinkOpened.contains(e.target)) {
    navbar.classList.remove('Navbar-opened');
    menuLinkOpened.classList.remove('MenuLink-open');

    if (overlay) {
	  	overlay.classList.add('Overlay-hidden');
	  }
  }
});

document.addEventListener('click', function(e) {
  let navbarCloseBtn = e.target.closest('.Navbar-offCanvas .Navbar_closeBtn');

  if (!navbarCloseBtn) return;

  let navbar = navbarCloseBtn.closest('.Navbar-offCanvas');
  let menuLink = document.querySelector('.MenuLink');
  let overlay = navbar.nextElementSibling;

  navbar.classList.remove('Navbar-opened');
  menuLink.classList.remove('MenuLink-open');
  
  if (overlay) {
  	overlay.classList.add('Overlay-hidden');
  }
  e.preventDefault();
});

document.addEventListener('click', function (e) {
	let openHousePlan = e.target.closest('[data-action="openHousePlan"]');

	if (!openHousePlan) return;

	let apartmentChoosing = openHousePlan.closest('.ApartmentChoosing');
	let apartmentChoosingLeft = apartmentChoosing.querySelector('.ApartmentChoosing_left');

	apartmentChoosingLeft.classList.add('ApartmentChoosing_left-opened');

	e.preventDefault();
});

document.addEventListener('click', function (e) {
	let closeHousePlan = e.target.closest('[data-action="closeHousePlan"]');

	if (!closeHousePlan) return;

	let apartmentChoosing = closeHousePlan.closest('.ApartmentChoosing');
	let apartmentChoosingLeft = apartmentChoosing.querySelector('.ApartmentChoosing_left');

	apartmentChoosingLeft.classList.remove('ApartmentChoosing_left-opened');

	e.preventDefault();
});

// document.addEventListener('click', function (e) {
// 	let dataAnchorLink = e.target.closest('a[data-anchor-link]');

// 	if (!dataAnchorLink) return;

// 	let selector = dataAnchorLink.getAttribute('href');
// 	let targetElement = document.querySelector(selector);

// 	if (!targetElement) return;

// 	scroll({
// 		top: targetElement.offsetTop,
// 		behavior: "smooth"
// 	});

// 	e.preventDefault();
// });
