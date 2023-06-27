class Player {
    constructor(ctx, canvasW, canvasH, keys) {
        this.ctx = ctx
        this.keys = keys

        this.canvasW = canvasW
        this.canvasH = canvasH

        this.x0 = canvasW * 0.08
        this.x = this.x0

        this.y0 = canvasH - 230
        this.y = this.y0

        this.vy = 0
        this.vx = 0

        this.img = new Image()
        this.img.src = "assets/character/Character_idle.png"

        this.img.frameCount = 5
        this.frameSpeed = 6
        this.frameIndex = 0

        this.width = 100
        this.height = 150

        this.bullets = []


        this.lastKey = "right"
        this.pressedKeys = {
            jump: false,
            right: false,
            left: false,
        }

        this.setControls()
    }

    setControls() {
        addEventListener('keydown', (event) => {
            switch (event.code) {
                case this.keys.JUMP:
                    this.pressedKeys.jump = true
                    if (this.y === this.y0) this.vy = -25
                    break
                case this.keys.RIGHT:
                    this.pressedKeys.right = true
                    this.lastKey = "right"
                    break
                case this.keys.LEFT:
                    this.pressedKeys.left = true
                    this.lastKey = "left"
                    break
            }
        })

        addEventListener('keyup', (event) => {
            switch (event.code) {
                case this.keys.JUMP:
                    this.pressedKeys.jump = false
                    break
                case this.keys.RIGHT:
                    this.pressedKeys.right = false
                    break
                case this.keys.LEFT:
                    this.pressedKeys.left = false
                    break
            }
        })
    }



    draw(frameCounter) {
        // Pintamos un cada frame del sprite en función del frameIndex
        if (this.lastKey === "right") {
            if (this.pressedKeys.right && this.y >= this.y0) {

                this.img.src = "assets/character/Character_run.png"
                this.img.frameCount = 16
                this.frameSpeed = 2

            }
            else if (this.pressedKeys.jump || this.y < this.y0) {

                this.img.src = "assets/character/Character_jump.png"
                this.img.frameCount = 8
                this.frameSpeed = 3
            }
            else {

                this.img.src = "assets/character/Character_idle.png"
                this.img.frameCount = 5
                this.frameSpeed = 6
            }
        } else {
            if (this.pressedKeys.left && this.y >= this.y0) {

                this.img.src = "assets/character/Character_run_L.png"
                this.img.frameCount = 16
                this.frameSpeed = 2

            }
            else if (this.pressedKeys.jump || this.y < this.y0) {

                this.img.src = "assets/character/Character_jump_L.png"
                this.img.frameCount = 8
                this.frameSpeed = 3
            }
            else {

                this.img.src = "assets/character/Character_idle_L.png"
                this.img.frameCount = 5
                this.frameSpeed = 6
            }
        }


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
        if (frameCounter % this.frameSpeed === 0) {
            this.frameIndex++
        }

        if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0
    }

    move() {

        if(this.x + this.vx < 0 || this.x + this.width + this.vx >= this.canvasW - 320){
            this.vx = 0
        }

        this.gravity = 0.95
        this.vy += this.gravity
        this.y += this.vy
        this.x += this.vx




        //Movimiento horizontal
        if (this.pressedKeys.right && this.pressedKeys.left) {

            if (this.lastKey === "right") {
                this.vx = 10
            } else {
                this.vx = -10
            }

        }
        else if (this.pressedKeys.right) {
            this.vx = 10
        } else if (this.pressedKeys.left) {
            this.vx = -10
        } else {
            this.vx = 0
        }

        //Movimiento vertical
        if (this.y >= this.y0) {
            this.vy = 0
            this.y = this.y0
        }

    }
}

export default Player