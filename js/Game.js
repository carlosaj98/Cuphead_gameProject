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

            if (this.isCollision()) {
				this.gameover()
			}
            if(this.isBulletColl()){
                this.player.bullets.splice(0,1)
                this.boss.health -= 1
                // this.boss.healthSystem()
            }

        }, 1000 / this.fps)
    },

    stop: function(){
        this.reset()
		clearInterval(this.intervalId)
    },

    gameover() {
		clearInterval(this.intervalId)

		if (confirm('Quieres jugar de nuevo')) {
			this.start()
		}
	},

    isCollision() {
		return this.boss.meteors.some(
			(meteor) =>
				meteor.x < this.player.x + this.player.width - 100 &&
				meteor.x + meteor.width - 100 > this.player.x &&
				meteor.y + meteor.height  - 100 > this.player.y &&
				meteor.y < this.player.y + this.player.height - 100
		)
	},

    isBulletColl(){
         return this.player.bullets.some(
			(bullet) =>
				bullet.x + bullet.width > this.boss.x + 200 &&
                bullet.x < this.boss.x + this.boss.width - 200
		)
    },

    clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
	},
}

export default Game