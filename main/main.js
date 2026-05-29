	document.addEventListener('DOMContentLoaded', () => { //ŁADOWANIE DOM ,GWARANTUJE STABILNOSC DZIALANIA
	const navBar = document.querySelector('.navbar')
	const burgerBtn = document.querySelector('.hamburger')
	const navBtn = document.querySelector('.navbar__btn')
	const navUl = document.getElementById('navbar-links')
	const navLinks = document.querySelectorAll('.navbar-links-menu')
	const burgerSpan = document.querySelectorAll('.span-burger')
	const slides = document.querySelectorAll('.carousel__slide')
	const prevBtn = document.querySelector('.carousel__btn--prev')
	const nextBtn = document.querySelector('.carousel__btn--next')
	let current = 0


	burgerBtn.addEventListener('click', () => {
		burgerBtn.classList.toggle('open')
		navUl.classList.toggle('navbar-open')
		navBar.classList.toggle('navbar-open-bg')
		if(navBar.classList.contains('navbar-open-bg')){
			burgerSpan.forEach(function(span){
				span.classList.add('cross-color')
			})
			
		}else{
			burgerSpan.forEach(function(span){
				span.classList.remove('cross-color')
			})
			
		}
	})
	
	navLinks.forEach(function(link){
		link.addEventListener('click', () => {
			navUl.classList.remove('navbar-open')
			burgerSpan.forEach(function(span){
				span.classList.remove('cross-color')
			})
			burgerBtn.classList.remove('open')
			navBar.classList.remove('navbar-open-bg')
		})
	})


	window.addEventListener('scroll' ,() =>{

		if(window.scrollY > 50){
			navBar.classList.add('scroll-bg')
			navLinks.forEach(function(link){
			link.classList.add('link-color-change')
			})
			burgerSpan.forEach(function(span){
				span.classList.add('cross-color')
			})
			navBtn.classList.add('btn-color-change')
		}else{
			navBar.classList.remove('scroll-bg')
			navLinks.forEach(function(link){
				link.classList.remove('link-color-change')
			})
			burgerSpan.forEach(function(span){
				span.classList.remove('cross-color')
			})
			navBtn.classList.remove('btn-color-change')
			
		}

	})
	function goTo(index) {
    slides[current].classList.remove('active')
    current = (index + slides.length) % slides.length
    slides[current].classList.add('active')
	}

	nextBtn.addEventListener('click', () => goTo(current + 1))
	prevBtn.addEventListener('click', () => goTo(current - 1))

	setInterval(() => goTo(current + 1), 4000)

});
