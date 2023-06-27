class WaterBack {
    constructor(ctx, canvasW, canvasH, keys) {
        this.ctx = ctx
        this.keys = keys

        this.canvasW = canvasW
        this.canvasH = canvasH

        this.x = 0

        this.y = canvasH - 300

        this.vy = 0

        this.img = new Image()
        this.img.src = "assets/environment/Water_back.png"

        this.img.frameCount = 50
        this.frameIndex = 0

        this.width = canvasW
        this.height = 250

        this.bullets = []
    }
    draw(frameCounter) {
        // Pintamos un cada frame del sprite en función del frameIndex
        this.ctx.drawImage(
            this.img,
            (this.img.width / this.img.frameCount) * this.frameIndex,
            0,
            this.img.width / this.img.frameCount,
            this.img.height,

            this.x,
            this.y,
            this.width,
            this.height
        )
        this.animateSprite(frameCounter)
    }

    animateSprite(frameCounter) {
		if (frameCounter % 5 === 0) {
			this.frameIndex++
		}

		if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0
	}
}

export default WaterBack