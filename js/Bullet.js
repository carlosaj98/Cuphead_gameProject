class Bullet {
    constructor(
        ctx,
        playerW,
        playerH,
        playerX,
        playerY,
        playerY0,
        canvasW,
        canvasH,
        direction
    ) {
        this.ctx = ctx
        this.playerX = playerX
        this.playerW = playerW
        this.radius = 10
        this.canvasH = canvasH
        this.playerH = playerH
        this.playerY0 = playerY0
        this.direction = direction
        this.floor = this.playerY0 + this.playerH - this.radius
        this.x = (direction==='right') ? playerX + playerW : playerX
       
        this.y = playerY + playerH / 2
        this.vx = (direction==='right') ? 25 : -25

        this.img = new Image()
        

        this.img.frameCount = 4;
        this.frameSpeed = 6;
        this.frameIndex = 0;

        this.width = 60
        this.height = 30

        this.frameCounter = 0

       
    }

    directionSprites(){
        if(this.direction === "left"){  
            this.img.src = "assets/character/Character_proyectile_L.png"   

        }else{
            this.img.src = "assets/character/Character_proyectile.png"
        }
    }

    draw() {
        this.directionSprites()
  
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

export default Bullet