// DEBOUNCE DO LODASH
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if(!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if(callNow) func.apply(context, args);
	};
};

// MUDAR TAB's AO CLICK
$('[data-group]').each(function() {
	var $allTarget = $(this).find('[data-target]'),
			$allClick = $(this).find('[data-click]'),
			activeClass = 'active';

	$allTarget.first().addClass(activeClass);
	$allClick.first().addClass(activeClass);

	$allClick.click(function(e){
		e.preventDefault();

		var id = $(this).data('click'),
				$target = $('[data-target="' + id + '"]');

		$allClick.removeClass(activeClass);
		$allTarget.removeClass(activeClass);

		$target.addClass(activeClass);
		$(this).addClass(activeClass);
	});
});
// FIM MUDAR TAB's

// SCROLL SUAVE PARA LINK INTERNO
$('.menu-nav a[href^="#"]').click(function(e) {
	e.preventDefault();
	var id = $(this).attr('href'),
			menuHeight = $('.menu').innerHeight(),
			targetOffset = $(id).offset().top;

	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});
// FIM SCROLL SUAVE

// SCROLL SUAVE PARA O TOPO
$('.logo').click(function(e){
	e.preventDefault();
	$('html, body').animate({
		scrollTop: 0
	}, 500);
});
// FIM SCROLL SUAVE PARA O TOPO

// HOVER MENU
$('section').each(function() {
	var height = $(this).height(),
			offsetTop = $(this).offset().top,
			menuHeight = $('.menu').innerHeight(),
			id = $(this).attr('id'),
			$itemMenu = $('a[href="#' + id + '"]');

	$(window).scroll(debounce(function() {
		var scrollTop = $(window).scrollTop();
		if (offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
			$itemMenu.addClass('active');
		} else {
			$itemMenu.removeClass('active');
		}	
	}, 200));		
}); 

// MENU MOBILE
$('.mobile-btn').click(function(){
	$(this).toggleClass('active');
	$('.mobile-menu').toggleClass('active');
});
// FIM MENU MOBILE

// SLIDES
(function() {
function slider(sliderName, velocidade) {
	var sliderClass = '.' + sliderName,
			activeClass = 'active',
			rotate = setInterval(rotateSlide, velocidade);

	$(sliderClass + ' > :first').addClass(activeClass);

	$(sliderClass).hover(function(){
		clearInterval(rotate);
	}, function() {
		rotate = setInterval(rotateSlide, velocidade);
	});

	function rotateSlide(){
		var activeSlide = $(sliderClass + ' > .' + activeClass),
				nextSlide = activeSlide.next();

		if (nextSlide.length == 0){
			nextSlide = $(sliderClass + ' > :first');
		}
		activeSlide.removeClass(activeClass);
		nextSlide.addClass(activeClass);
	}
}
	slider('introducao', 1500);
})();
// FIM SLIDES

// ANIMAÇÃO AO SCROLL
(function() {
	var $target = $('[data-anime="scroll" ]'),
			animationClass = 'animate',
			offset = $(window).height() * 3/4;

	function animeScroll() {
		var documentTop = $(window).scrollTop();

		$target.each(function(){
			var itemTop = $(this).offset().top;
			if (documentTop > itemTop - offset) {
				$(this).addClass(animationClass);
			} else {
				$(this).removeClass(animationClass);
			}
		});
	}

	// ATIVA A FUNÇÃO DO SCROLL
	$(document).scroll(debounce(function(){
		animeScroll();
	}, 200));
})();
// FIM ANIMAÇÃO SCROLL
