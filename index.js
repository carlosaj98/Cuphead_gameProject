import Game from "./js/Game.js"

addEventListener('load', () => {
	const startButton = document.querySelector('.start-screen button')

	startButton.addEventListener('click', () => {
		document.querySelector('.start-screen').classList.add('hidden')

		Game.init()
	})
})