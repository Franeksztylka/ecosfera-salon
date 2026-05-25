const btn = document.querySelector(".hamburger")
const navUl = document.getElementById("navbar-links")

btn.addEventListener('click', () => {
  btn.classList.toggle('open');
  navUl.classList.toggle('navbar-open')
});
  