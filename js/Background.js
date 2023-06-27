class Background {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx

        this.x = 0
        this.y = 0

        this.canvasW = canvasW
        this.canvasH = canvasH

        this.img = new Image()
        this.img.src = "assets/environment/Sky.png"

    }

    draw() {
        this.ctx.drawImage(this.img,
            this.x,
            this.y,
            this.canvasW,
            this.canvasH)

        this.ctx.drawImage(
            this.img,
            this.x + this.canvasW,
            0,
            this.canvasW,
            this.canvasH
        )
    }
}

export default Background