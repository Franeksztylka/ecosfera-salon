document.addEventListener('DOMContentLoaded', () => {
	// ==================== NAWIGACJA ====================
	const navBar = document.querySelector('.navbar')
	const burgerBtn = document.querySelector('.hamburger')
	const navBtn = document.querySelector('.navbar__btn')
	const navUl = document.getElementById('navbar-links')
	const navLinks = document.querySelectorAll('.navbar-links-menu')
	const burgerSpan = document.querySelectorAll('.hamburger span')

	burgerBtn.addEventListener('click', () => {
		const isOpen = burgerBtn.classList.toggle('open')
		navUl.classList.toggle('navbar-open')
		navBar.classList.toggle('navbar-open-bg')
	})

	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			navUl.classList.remove('navbar-open')
			burgerBtn.classList.remove('open')
			navBar.classList.remove('navbar-open-bg')
		})
	})

	window.addEventListener('scroll', () => {
		const scrolled = window.scrollY > 40
		const menuOpen = navBar.classList.contains('navbar-open-bg')

		navBar.classList.toggle('scrolled', scrolled && !menuOpen)

		if (!menuOpen) {
			navLinks.forEach(link => link.classList.toggle('link-color-change', scrolled))
		}

		if (navBtn) navBtn.classList.toggle('btn-color-change', scrolled)
	})

	// ==================== CAROUSEL ====================
	const slides = document.querySelectorAll('.carousel__slide')
	const prevBtn = document.querySelector('.carousel__btn--prev')
	const nextBtn = document.querySelector('.carousel__btn--next')
	let current = 0
	let carouselInterval

	function goTo(index) {
		slides[current].classList.remove('active')
		current = (index + slides.length) % slides.length
		slides[current].classList.add('active')
	}

	if (nextBtn && prevBtn) {
		nextBtn.addEventListener('click', () => {
			goTo(current + 1)
			resetCarouselTimer()
		})
		prevBtn.addEventListener('click', () => {
			goTo(current - 1)
			resetCarouselTimer()
		})
	}

	function startCarousel() {
		if (!carouselInterval) {
			carouselInterval = setInterval(() => goTo(current + 1), 3000)
		}
	}

	function stopCarousel() {
		clearInterval(carouselInterval)
		carouselInterval = null
	}

	function resetCarouselTimer() {
		stopCarousel()
		startCarousel()
	}

	startCarousel()

	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
			stopCarousel()
		} else {
			startCarousel()
		}
	})

	// ==================== CENNIK ====================
	document.querySelectorAll('.uslugi__tab').forEach(tab => {
		tab.addEventListener('click', () => {
			const tabName = tab.dataset.tab
			const content = document.querySelector(`[data-content="${tabName}"]`)

			const activePanel = document.querySelector('.uslugi__panel--active')
			if (activePanel) {
				activePanel.style.animation = 'fadeOutScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'

				setTimeout(() => {
					document.querySelectorAll('.uslugi__tab').forEach(t => t.classList.remove('uslugi__tab--active'))
					document.querySelectorAll('.uslugi__panel').forEach(p => p.classList.remove('uslugi__panel--active'))

					tab.classList.add('uslugi__tab--active')
					content.classList.add('uslugi__panel--active')
					content.style.animation = 'fadeInScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
				}, 300)
			}
		})
	})

	// ==================== OPINIE ====================
	const counters = document.querySelectorAll('[data-target]')

	const animateCounter = counter => {
		const targetReviews = parseFloat(counter.dataset.target)
		const duration = 1800
		let startTime = null

		function animate(timestamp) {
			if (!startTime) startTime = timestamp

			const progress = Math.min((timestamp - startTime) / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 3)
			const value = eased * targetReviews

			if (targetReviews === 5) {
				counter.textContent = value.toFixed(1)
			} else {
				counter.textContent = `${Math.floor(value)}+`
			}

			if (progress < 1) {
				requestAnimationFrame(animate)
			}
		}

		requestAnimationFrame(animate)
	}

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const counter = entry.target
					animateCounter(counter)
					observer.unobserve(counter)
				}
			})
		},
		{ threshold: 0.5 }
	)

	counters.forEach(counter => observer.observe(counter))
})