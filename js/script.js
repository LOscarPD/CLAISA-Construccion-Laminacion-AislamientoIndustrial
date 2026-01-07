document.addEventListener('DOMContentLoaded', () => {

	// Header START
	$('.hamburger').on('click', function() {
		if($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			$('.header-mobile-wrap').slideUp(500);
		}
		else {
			$(this).addClass('is-active');
			$('.header-mobile-wrap').slideDown(500);
		}
	});

	function scrollHeader() {
		let headerTopHeight = $('.header-top').height();
		if($(window).scrollTop() > headerTopHeight) {
			$('.header-bottom').addClass('is-fixed');
		}
		else {
			$('.header-bottom').removeClass('is-fixed');
		}
	}
	function showArrowUp() {
		if($(window).scrollTop() > 1000) {
			$('.go-up').addClass('is-active');
		}
		else {
			$('.go-up').removeClass('is-active');
		}
	}

	$(window).on('scroll', function () {
		scrollHeader();
		showArrowUp();
	});


	document.querySelectorAll('.anchor-link').forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			const target = document.querySelector(targetId);

			if (!target) return;

			const header = document.querySelector('.header-bottom');
			const headerHeight = header ? header.offsetHeight : 0;

			const targetPosition =
				target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});

			// Cerrar menú móvil
			const mobileMenu = document.querySelector('.header-mobile-wrap');
			const hamburger = document.querySelector('.hamburger');

			if (mobileMenu && hamburger) {
				mobileMenu.style.display = 'none';
				hamburger.classList.remove('is-active');
			}
		});
	});


	document.querySelector('.go-up').addEventListener('click', function (e) {
		e.preventDefault();

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
	// Header END
	
	// Banner START
	const bannerSwiper = new Swiper('.banner-swiper', {
		speed: 1000,
		spaceBetween: 0,
		autoHeight: true,
		loop: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		navigation: {
			nextEl: '.banner-swiper .swiper-button-next',
			prevEl: '.banner-swiper .swiper-button-prev',
		},
		pagination: {
			el: '.banner-swiper .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	// Banner END

	// Gallery START
	$('.gallery-wrap a').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		},
		image: {
			verticalFit: true
		},
		fixedContentPos: true,
		closeOnContentClick: true,
		callbacks: {
			beforeOpen: function() {
				this.st.image.markup =
					this.st.image.markup.replace(
						'mfp-figure',
						'mfp-figure mfp-with-anim'
					);
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		}
	});

	$('.gallery-btn a').on('click', function(e) {
		e.preventDefault();
		var galleryItem = $('.gallery-item');

		if($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			$(this).text('Mostar más');
			galleryItem.each(function() {
				if($(this).hasClass('is-active')) {
					$(this).removeClass('is-active');
					$(this).slideUp();
				}
			});
		}
		else {
			$(this).addClass('is-active');
			$(this).text('Ocultar');
			galleryItem.each(function() {
				if(!$(this).is(':visible')) {
					$(this).addClass('is-active');
					$(this).slideDown();
				}
			});
		}
	});
	// Gallery END

})