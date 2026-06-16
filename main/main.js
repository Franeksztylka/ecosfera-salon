document.addEventListener('DOMContentLoaded', () => {

    // ==================== NAWIGACJA ====================
    const navBar = document.querySelector('.navbar');
    const burgerBtn = document.querySelector('.hamburger');
    const navBtn = document.querySelector('.navbar__btn');
    const navUl = document.getElementById('navbar-links');
    const navLinks = document.querySelectorAll('.navbar-links-menu');
    const burgerSpan = document.querySelectorAll('.span-burger');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('open');
        navUl.classList.toggle('navbar-open');
        navBar.classList.toggle('navbar-open-bg');
        
        if (navBar.classList.contains('navbar-open-bg')) {
            burgerSpan.forEach(span => span.classList.add('cross-color'));
        } else {
            burgerSpan.forEach(span => span.classList.remove('cross-color'));
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('navbar-open');
            burgerSpan.forEach(span => span.classList.remove('cross-color'));
            burgerBtn.classList.remove('open');
            navBar.classList.remove('navbar-open-bg');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 950) {
            navBar.classList.add('scroll-bg');
            navLinks.forEach(link => link.classList.add('link-color-change'));
            burgerSpan.forEach(span => span.classList.add('cross-color'));
            if (navBtn) navBtn.classList.add('btn-color-change');
        } else {
            navBar.classList.remove('scroll-bg');
            navLinks.forEach(link => link.classList.remove('link-color-change'));
            burgerSpan.forEach(span => span.classList.remove('cross-color'));
            if (navBtn) navBtn.classList.remove('btn-color-change');
        }
    });

    // ==================== CAROUSEL ====================
    const slides = document.querySelectorAll('.carousel__slide');
    const prevBtn = document.querySelector('.carousel__btn--prev');
    const nextBtn = document.querySelector('.carousel__btn--next');
    let current = 0;

    function goTo(index) {
        slides[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => goTo(current + 1));
        prevBtn.addEventListener('click', () => goTo(current - 1));
    }

    setInterval(() => goTo(current + 1), 4000);

    
});