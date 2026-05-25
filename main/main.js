const navBar = document.querySelector('.navbar')
const btn = document.querySelector('.hamburger')
const navUl = document.getElementById('navbar-links')
const navLinks = document.querySelectorAll('.navbar-links-menu')
const burgerSpan = document.querySelectorAll('.span-burger')
const bg = document.getElementById('hero__bg')
const numberOfColorBoxes = 49;


btn.addEventListener('click', () => {
	btn.classList.toggle('open')
	navUl.classList.toggle('navbar-open')
	navBar.classList.toggle('navbar-open-bg')
	burgerSpan.forEach(function(span){
		span.classList.toggle('cross-color')
	})
})

for (let i = 0; i < numberOfColorBoxes; i++) {
	const colorBox = document.createElement('div')
	colorBox.classList.add('colorBox')
	bg.append(colorBox)
}

navLinks.forEach(function(link){

	link.addEventListener('click', () => {
		navUl.classList.remove('navbar-open')
		btn.classList.remove('open')
	})
})

window.addEventListener('scroll' ,() =>{

	if(window.scrollY > 50){
		navBar.classList.add('scroll-bg')
	}else{
		navBar.classList.remove('scroll-bg')
	}

})


