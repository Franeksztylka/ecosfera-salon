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
        if (window.scrollY > 50) {
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

    // ==================== ANIMACJA LIŚCI - BLIŻEJ TWOJEGO PRZYKŁADU ====================
    const aboutUs = document.querySelector('.about-us');
    const canvas = document.querySelector('.about-us__canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        if (!aboutUs || !canvas) return;
        canvas.width = aboutUs.offsetWidth;
        canvas.height = aboutUs.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const leaves = [];
    const leafCount = 35;

    function createLeaf() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - 150,
            size: Math.random() * 34 + 24,
            speed: Math.random() * 0.42 + 0.25,
            sway: Math.random() * 1.9 + 0.8,
            swaySpeed: Math.random() * 0.021 + 0.010,
            swayOffset: Math.random() * Math.PI * 2,
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 2.4 - 1.2,
            opacity: Math.random() * 0.40 + 0.22,
            hue: Math.random() * 35 + 80
        };
    }

    for (let i = 0; i < leafCount; i++) {
        leaves.push(createLeaf());
    }

    function drawLeaf(leaf) {
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate((leaf.rotation * Math.PI) / 180);
        ctx.globalAlpha = leaf.opacity;

        const s = leaf.size;
        const h = s * 1.65;   // wysokość liścia

        ctx.fillStyle = `hsl(${leaf.hue}, 78%, 42%)`;
        ctx.strokeStyle = `hsl(${leaf.hue - 10}, 65%, 22%)`;
        ctx.lineWidth = 2.8;

        // Bardziej realistyczny kształt liścia (jak na obrazku)
        ctx.beginPath();
        ctx.moveTo(0, -h);                    // czubek

        // Prawa strona
        ctx.quadraticCurveTo(s * 0.45, -h * 0.65, s * 0.72, -h * 0.15);
        ctx.quadraticCurveTo(s * 0.78, h * 0.45, s * 0.45, h * 0.85);
        ctx.quadraticCurveTo(s * 0.2, h * 1.05, 0, h * 1.1);

        // Lewa strona
        ctx.quadraticCurveTo(-s * 0.2, h * 1.05, -s * 0.45, h * 0.85);
        ctx.quadraticCurveTo(-s * 0.78, h * 0.45, -s * 0.72, -h * 0.15);
        ctx.quadraticCurveTo(-s * 0.45, -h * 0.65, 0, -h);

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Główna żyłka
        ctx.beginPath();
        ctx.moveTo(0, -h);
        ctx.lineTo(0, h * 1.05);
        ctx.stroke();

        // Boczne żyłki (bardziej naturalne)
        ctx.lineWidth = 1.6;
        for (let i = 1; i <= 5; i++) {
            const y = -h + (h * 1.9 * i / 6);
            const len = s * (0.65 - i * 0.08);

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.quadraticCurveTo(len * 0.75, y + h * 0.12, len, y + h * 0.35);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.quadraticCurveTo(-len * 0.75, y + h * 0.12, -len, y + h * 0.35);
            ctx.stroke();
        }

        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        leaves.forEach(leaf => {
            leaf.y += leaf.speed;
            leaf.x += Math.sin(leaf.swayOffset) * leaf.sway * 0.065;
            leaf.swayOffset += leaf.swaySpeed;
            leaf.rotation += leaf.rotSpeed;

            if (leaf.y > canvas.height + 100) {
                leaf.y = -100;
                leaf.x = Math.random() * canvas.width;
                leaf.rotation = Math.random() * 360;
            }

            if (leaf.x < -60) leaf.x = canvas.width + 60;
            if (leaf.x > canvas.width + 60) leaf.x = -60;

            drawLeaf(leaf);
        });

        requestAnimationFrame(animate);
    }

    animate();
});