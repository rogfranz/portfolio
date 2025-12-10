/* ===== Inicialização Geral ===== */
$(document).ready(function() {
	/* ===== Menu Mobile ===== */
	$('#mobile-menu-btn').on('click', function() {
		$('#mobile-menu').slideToggle(300);
		$(this).find('i').toggleClass('ph-list ph-x');
	});

	$('.mobile-nav-link').on('click', function() {
		$('#mobile-menu').slideUp(300);
		$('#mobile-menu-btn').find('i').removeClass('ph-x').addClass('ph-list');
	});

	/* ===== Indicadores de Navegação ===== */
	$(window).on('scroll', function() {
		const scrollPos = $(window).scrollTop() + 100;

		$('section').each(function() {
			const sectionTop = $(this).offset().top;
			const sectionBottom = sectionTop + $(this).outerHeight();
			const sectionId = $(this).attr('id');

			if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
				$('.nav-link').removeClass('text-accent-red');
				$(`.nav-link[href="#${sectionId}"]`).addClass('text-accent-red');
			}
		});

		if (scrollPos > 300) {
			$('#back-to-top').removeClass('opacity-0 pointer-events-none');
		} else {
			$('#back-to-top').addClass('opacity-0 pointer-events-none');
		}
	});

	/* ===== Botão Voltar ao Topo ===== */
	$('#back-to-top').on('click', function() {
		$('html, body').animate({ scrollTop: 0 }, 600);
	});

	/* ===== Rolagem Suave ===== */
	$('a[href^="#"]').on('click', function(e) {
		const target = $(this.getAttribute('href'));

		if (target.length) {
			e.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 80,
			}, 800);
		}
	});

	/* ===== Indicadores do Carrossel de Projetos ===== */
	const $projectsContainer = $('#projects-scroll');

	if ($projectsContainer.length) {
		const updateScrollIndicators = () => {
			const container = $projectsContainer.get(0);

			if (!container || container.scrollWidth === container.clientWidth) {
				return;
			}

			const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
			const activeIndex = Math.round(scrollPercentage * 3);

			$('.scroll-indicator').each(function(index) {
				if (index === activeIndex) {
					$(this).removeClass('opacity-50 bg-gray-600').addClass('opacity-100 bg-accent-red');
				} else {
					$(this).removeClass('opacity-100 bg-accent-red').addClass('opacity-50 bg-gray-600');
				}
			});
		};

		$projectsContainer.on('scroll', updateScrollIndicators);
		updateScrollIndicators();
	}

	/* ===== Animação de Entrada dos Projetos ===== */
	const fadeInOnScroll = () => {
		$('.project-card').each(function() {
			const elementTop = $(this).offset().top;
			const viewportBottom = $(window).scrollTop() + $(window).height();

			if (elementTop < viewportBottom - 100) {
				$(this).addClass('animate-fade-in');
			}
		});
	};

	$(window).on('scroll', fadeInOnScroll);
	fadeInOnScroll();

	/* ===== Suporte ao toque nos cards ===== */
	$(document).on('touchstart', '.card-wrapper', function() {
		const $card = $(this);

		$('.card-wrapper.is-touch-active').not($card).each(function() {
			const timeoutId = $(this).data('touchTimeout');
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			$(this).removeClass('is-touch-active').removeData('touchTimeout');
		});

		const existingTimeout = $card.data('touchTimeout');
		if (existingTimeout) {
			clearTimeout(existingTimeout);
		}

		$card.addClass('is-touch-active');

		const timeoutId = window.setTimeout(() => {
			$card.removeClass('is-touch-active').removeData('touchTimeout');
		}, 1500);

		$card.data('touchTimeout', timeoutId);
	});

	$(document).on('touchend touchcancel', '.card-wrapper', function() {
		const $card = $(this);
		const existingTimeout = $card.data('touchTimeout');

		if (existingTimeout) {
			clearTimeout(existingTimeout);
		}

		const timeoutId = window.setTimeout(() => {
			$card.removeClass('is-touch-active').removeData('touchTimeout');
		}, 300);

		$card.data('touchTimeout', timeoutId);
	});
});
