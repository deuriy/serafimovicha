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


let planningSolutionsSliders = [];
document.querySelectorAll('.PlanningSolutionsSlider').forEach(item => {
	planningSolutionsSliders.push(new Swiper(`#${item.id}`, {
		slidesPerView: 3,
		spaceBetween: 32,

		pagination: {
	    el: `#${item.id} .SwiperPagination`,
	    bulletClass: 'SwiperPagination_bullet',
	    bulletActiveClass: 'SwiperPagination_bullet-active',
	    clickable: true
	  },

	  navigation: {
	    nextEl: `#${item.id} + .CircleBtn-next`
	  }
	}));
});

let gallerySliders = [];
document.querySelectorAll('.GallerySlider').forEach(item => {
	gallerySliders.push(new Swiper(`#${item.id}`, {
		slidesPerView: 'auto',
		spaceBetween: 96,

		pagination: {
	    el: `#${item.id} .SwiperPagination`,
	    bulletClass: 'SwiperPagination_bullet',
	    bulletActiveClass: 'SwiperPagination_bullet-active',
	    clickable: true
	  },

	  navigation: {
	    nextEl: `#${item.id} + .CircleBtn-next`
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
})
