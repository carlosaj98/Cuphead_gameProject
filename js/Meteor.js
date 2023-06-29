class Meteor {
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
        this.x = this.bossX -50
        this.y = bossY + bossH / 5
        this.vx = Math.floor(Math.random()*(-15 - -2)+ -2)
        this.vy = Math.floor(Math.random()*(20 - 5)+ 5)

        this.img = new Image()
        this.img.src = "assets/boss/Boss1_proyectile.png"
        this.img.frameCount = 8;
        this.frameSpeed = 3;
        this.frameIndex = 0;
        
        this.width = 220
        this.height = 180

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

     
        this.ay = 0.5

     

        this.vy += this.ay


		this.x += this.vx
		this.y += this.vy

		if (this.y + this.vy > this.floor) {
            this.vx -= 3
			this.vy *= -1
            
		}
	}

    animateSprite(frameCounter) {
        if (frameCounter % this.frameSpeed === 0) {
            this.frameIndex++;
        }

        if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0;
    }
}

export default Meteor
