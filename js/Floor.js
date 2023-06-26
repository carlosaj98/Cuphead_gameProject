class Floor {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx

        this.canvasW = canvasW + 150
        this.canvasH = canvasH - 420
        this.x = 0
        this.y = 500

        this.img = new Image()
        this.img.src = "assets/environment/Floor.png"
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.canvasW,
            this.canvasH)
    }
}

export default Floor