import Background from "./Background.js"
import WaterFront from "./WaterFront.js"
import WaterBack from "./WaterBack.js"
import Floor from "./Floor.js"
import Player from "./Player.js"
import Boss from "./Boss.js"

const Game = {
    fps: 60,
    ctx: undefined,
    canvasW: 1536,
    canvasH: 722,
    keys: {
        JUMP: 'Space',
        RIGHT: 'KeyD',
        LEFT: 'KeyA',
    },

    init: function () {
        const canvas = document.querySelector('canvas')
        this.ctx = canvas.getContext('2d')

        canvas.width = this.canvasW
        canvas.height = this.canvasH

        this.start()
    },

    reset: function () {
        this.background = new Background(this.ctx, this.canvasW, this.canvasH)
        this.floor = new Floor(this.ctx, this.canvasW, this.canvasH)
        this.player = new Player(this.ctx, this.canvasW, this.canvasH, this.keys)
        this.waterFront = new WaterFront(this.ctx, this.canvasW, this.canvasH)
        this.waterBack = new WaterBack(this.ctx, this.canvasW, this.canvasH)
        this.boss = new Boss(this.ctx, this.canvasW, this.canvasH, this.keys)

        this.frameCounter = 0
    },

    start: function () {
        this.reset()
        this.intervalId = setInterval(() => {
            this.clearCanvas()

            this.frameCounter++

            this.background.draw()

            this.waterBack.draw(this.frameCounter)

            this.floor.draw()

            this.player.draw(this.frameCounter)
            this.player.move()

            this.boss.draw(this.frameCounter)
            
            this.waterFront.draw(this.frameCounter)

            

        }, 1000 / this.fps)
    },

    clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
	},
}

export default Game