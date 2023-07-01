class Fire {
    constructor(
        ctx,
        bossW,
        bossH,
        bossX,
        bossY,
        bossY0,
        canvasW,
        canvasH,
    ) {
        this.ctx = ctx
        this.bossX = bossX
        this.bossW = bossW
        this.radius = 10
        this.canvasH = canvasH
        this.bossH = bossH
        this.bossY0 = bossY0
        this.floor = 550
        this.x = this.bossX + this.bossW - 100
        this.y = bossY + bossH - 250
        this.vx = 10

        this.img = new Image()
        this.img.src = "assets/boss/Boss2_proyectile.png"
        this.img.frameCount = 12;
        this.frameSpeed = 5;
        this.frameIndex = 0;
        
        this.width = 300
        this.height = 150

        this.frameCounter = 0
    }

    draw() {
  
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
        );
        this.animateSprite(this.frameCounter);

	}

    move() {

		this.x += this.vx
	}

    animateSprite(frameCounter) {
        if (frameCounter % this.frameSpeed === 0) {
            this.frameIndex++;
        }

        if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0;
    }
}

export default Fire