import Game from "./js/Game.js"

addEventListener('load', () => {
	const startButton = document.querySelector('button')

	startButton.addEventListener('click', () => {
		const hideScreens = document.querySelectorAll('.start-screen')
		const instructions = document.getElementById("instructions")
		hideScreens.forEach((screen) => screen.classList.add('hidden'))
		instructions.style.display = "none"
		

		Game.init()
	})
})