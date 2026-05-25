const btn = document.querySelector('.hamburger')
const navUl = document.getElementById('navbar-links')

btn.addEventListener('click', () => {
	btn.classList.toggle('open')
	navUl.classList.toggle('navbar-open')
})

const bg = document.getElementById('hero__bg')

const numberOfColorBoxes = 49;

for (let i = 0; i < numberOfColorBoxes; i++) {
	const colorBox = document.createElement('div')
	colorBox.classList.add('colorBox')
	bg.append(colorBox)
}
