document.addEventListener('DOMContentLoaded', () => {
    // ==================== NAWIGACJA ====================
    const navBar = document.querySelector('.navbar')
    const burgerBtn = document.querySelector('.hamburger')
    const navBtn = document.querySelector('.navbar__btn')
    const navUl = document.getElementById('navbar-links')
    const navLinks = document.querySelectorAll('.navbar-links-menu')
    const burgerSpan = document.querySelectorAll('.span-burger')

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('open')
        navUl.classList.toggle('navbar-open')
        navBar.classList.toggle('navbar-open-bg')

        if (navBar.classList.contains('navbar-open-bg')) {
            burgerSpan.forEach(span => span.classList.add('cross-color'))
        } else {
            burgerSpan.forEach(span => span.classList.remove('cross-color'))
        }
    })

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('navbar-open')
            burgerSpan.forEach(span => span.classList.remove('cross-color'))
            burgerBtn.classList.remove('open')
            navBar.classList.remove('navbar-open-bg')
        })
    })

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight - 20){
            navBar.classList.add('scroll-bg')
            navLinks.forEach(link => link.classList.add('link-color-change'))
            burgerSpan.forEach(span => span.classList.add('cross-color'))
            if (navBtn) navBtn.classList.add('btn-color-change')
        } else {
            navBar.classList.remove('scroll-bg')
            navLinks.forEach(link => link.classList.remove('link-color-change'))
            burgerSpan.forEach(span => span.classList.remove('cross-color'))
            if (navBtn) navBtn.classList.remove('btn-color-change')
        }
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
    
    //==================== CENNIK ====================
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
})