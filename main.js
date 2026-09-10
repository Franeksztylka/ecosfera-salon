// ==================== LOADER ====================
// Chowamy loader jak najwcześniej (po pełnym załadowaniu zasobów), z
// bezpiecznikiem czasowym na wypadek wolnego/zawieszonego window.load.
;(() => {
	const loader = document.getElementById('page-loader')
	if (!loader) return

	let hidden = false
	const hideLoader = () => {
		if (hidden) return
		hidden = true
		loader.classList.add('page-loader--hidden')
		setTimeout(() => loader.remove(), 500)
	}

	window.addEventListener('load', hideLoader)
	setTimeout(hideLoader, 4000)
})()

document.addEventListener('DOMContentLoaded', () => {
	// ==================== NAWIGACJA ====================
	const navBar = document.querySelector('.navbar')
	const burgerBtn = document.querySelector('.hamburger')
	const navBtn = document.querySelector('.navbar__btn')
	const navUl = document.getElementById('navbar-links')
	const navLinks = document.querySelectorAll('.navbar-links-menu')

	if (burgerBtn && navUl && navBar) {
		burgerBtn.addEventListener('click', () => {
			burgerBtn.classList.toggle('open')
			navUl.classList.toggle('navbar-open')
			navBar.classList.toggle('navbar-open-bg')
		})
	}

	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (navUl) navUl.classList.remove('navbar-open')
			if (burgerBtn) burgerBtn.classList.remove('open')
			if (navBar) navBar.classList.remove('navbar-open-bg')
		})
	})

	if (navBar) {
		window.addEventListener('scroll', () => {
			const scrolled = window.scrollY > 40
			const menuOpen = navBar.classList.contains('navbar-open-bg')

			navBar.classList.toggle('scrolled', scrolled && !menuOpen)

			if (!menuOpen) {
				navLinks.forEach(link => link.classList.toggle('link-color-change', scrolled))
			}

			if (navBtn) navBtn.classList.toggle('btn-color-change', scrolled)
		})
	}

	// ==================== GALERIA KARUZELA ====================
	const galleryWrapper = document.querySelector('.gallery__wrapper')
	const galleryPrev = document.querySelector('.gallery__btn--prev')
	const galleryNext = document.querySelector('.gallery__btn--next')

	if (galleryWrapper && galleryPrev && galleryNext) {
		const scrollStep = () => {
			const firstImg = galleryWrapper.querySelector('img')
			if (!firstImg) return galleryWrapper.clientWidth
			const gap = parseFloat(getComputedStyle(galleryWrapper).columnGap || getComputedStyle(galleryWrapper).gap) || 0
			return firstImg.getBoundingClientRect().width + gap
		}

		const maxScrollLeft = () => galleryWrapper.scrollWidth - galleryWrapper.clientWidth
		const isAtStart = () => galleryWrapper.scrollLeft <= 2
		const isAtEnd = () => galleryWrapper.scrollLeft >= maxScrollLeft() - 2

		// Karuzela w pętli - koniec zawija do początku i odwrotnie, więc
		// zdjęcia "nie kończą się", tylko zaczynają się od nowa.
		galleryNext.addEventListener('click', () => {
			if (isAtEnd()) {
				galleryWrapper.scrollTo({ left: 0, behavior: 'smooth' })
				return
			}
			const target = Math.min(galleryWrapper.scrollLeft + scrollStep(), maxScrollLeft())
			galleryWrapper.scrollTo({ left: target, behavior: 'smooth' })
		})
		galleryPrev.addEventListener('click', () => {
			if (isAtStart()) {
				galleryWrapper.scrollTo({ left: maxScrollLeft(), behavior: 'smooth' })
				return
			}
			const target = Math.max(galleryWrapper.scrollLeft - scrollStep(), 0)
			galleryWrapper.scrollTo({ left: target, behavior: 'smooth' })
		})

		// Także przy przewijaniu palcem/gestem (nie tylko przyciskami) -
		// po dotarciu do końca wraca płynnie na początek.
		if ('onscrollend' in window) {
			galleryWrapper.addEventListener('scrollend', () => {
				if (isAtEnd()) {
					galleryWrapper.scrollTo({ left: 0, behavior: 'instant' })
				}
			})
		}
	}

	// ==================== CENNIK ====================
	document.querySelectorAll('.uslugi__tab').forEach(tab => {
		tab.addEventListener('click', () => {
			const tabName = tab.dataset.tab
			const content = document.querySelector(`[data-content="${tabName}"]`)

			const activePanel = document.querySelector('.uslugi__panel--active')
			if (activePanel && content) {
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
		{ threshold: 0.5 },
	)

	counters.forEach(counter => observer.observe(counter))

	// ==================== REGULAMIN & PRIVACY ====================
	function openModal(backdrop) {
		if (backdrop) backdrop.classList.add('is-open')
	}
	function closeModal(backdrop) {
		if (backdrop) backdrop.classList.remove('is-open')
	}

	const privacyBackdrop = document.getElementById('privacyBackdrop')
	const termsBackdrop = document.getElementById('termsBackdrop')

	const openPrivacyBtn = document.getElementById('openPrivacy')
	const openTermsBtn = document.getElementById('openTerms')
	const openPrivacyFromCookiesBtn = document.getElementById('openPrivacyFromCookies') // <--- NOWY ELEM.

	if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => openModal(privacyBackdrop))
	if (openTermsBtn) openTermsBtn.addEventListener('click', () => openModal(termsBackdrop))

	// Podpięcie otwierania z poziomu bannera cookies:
	if (openPrivacyFromCookiesBtn) {
		openPrivacyFromCookiesBtn.addEventListener('click', e => {
			e.preventDefault() // Zapobiega przeskakiwaniu strony do góry przez href="#"
			openModal(privacyBackdrop)
		})
	}

	document.querySelectorAll('[data-close-modal]').forEach(btn => {
		btn.addEventListener('click', () => {
			closeModal(privacyBackdrop)
			closeModal(termsBackdrop)
		})
	})
	;[privacyBackdrop, termsBackdrop].forEach(bd => {
		if (bd) {
			bd.addEventListener('click', e => {
				if (e.target === bd) closeModal(bd)
			})
		}
	})

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
			closeModal(privacyBackdrop)
			closeModal(termsBackdrop)
		}
	})

	// ==================== COOKIES ====================
	const banner = document.getElementById('cookieBanner')
	if (banner) {
		const consent = localStorage.getItem('cookieConsent')

		// Google Consent Mode startuje domyślnie z "denied" (patrz <head>) -
		// jeśli zgoda była już wcześniej udzielona, aktualizujemy ją od razu.
		if (consent === 'accepted' && typeof gtag === 'function') {
			gtag('consent', 'update', { analytics_storage: 'granted' })
		}

		if (!consent) {
			setTimeout(() => {
				banner.classList.add('is-shown')
			}, 100)
		}

		const acceptBtn = document.getElementById('cookieAccept')
		if (acceptBtn) {
			acceptBtn.addEventListener('click', () => {
				localStorage.setItem('cookieConsent', 'accepted')
				if (typeof gtag === 'function') gtag('consent', 'update', { analytics_storage: 'granted' })
				banner.classList.remove('is-shown')
			})
		}

		const declineBtn = document.getElementById('cookieDecline')
		if (declineBtn) {
			declineBtn.addEventListener('click', () => {
				localStorage.setItem('cookieConsent', 'declined')
				banner.classList.remove('is-shown')
			})
		}
	}
})
