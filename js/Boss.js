import Meteor from "./Meteor.js";

class Boss {
    constructor(ctx, canvasW, canvasH, keys) {
        this.ctx = ctx;
        this.keys = keys;

        this.canvasW = canvasW;
        this.canvasH = canvasH;

        this.x = canvasW * 0.7;

        this.y0 = canvasH - 700;
        this.y = this.y0;

        this.vy = 0;

        this.img = new Image();
        this.img.src = "assets/boss/Boss1_idle.png";

        this.img.frameCount = 16;
        this.frameSpeed = 5;
        this.frameIndex = 0;

        this.width = 600;
        this.height = 800;

        this.meteors = [];

        this.health = 100

        this.isAttacking = false;


        this.intervalMeteors();
    }

    intervalMeteors() {
        this.intervalMeteor = setInterval(() => {
            this.isAttacking = true
            this.shoot()
            this.frameIndex = 0
        }, 1000);
        
        

    }

    // healthSystem(){
    //     if(this.health <= 90){
    //         this.x +=50
    //     }
    // }

    draw(frameCounter) {
        // Pintamos un cada frame del sprite en función del frameIndex

        // if(this.health < 100) clearInterval(this.intervalMeteor)
        
 
        if(this.isAttacking){
            this.img.src = "assets/boss/Boss1_attack.png"
            this.img.frameCount = 7;
            this.frameSpeed = 4;
           

        } else{
            this.img.src = "assets/boss/Boss1_idle.png"; 
            this.img.frameCount = 16;
            this.frameSpeed = 5;
          
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
        );
        this.meteors.forEach((meteor) => {
            meteor.draw();
            meteor.move();
        });
        this.meteors = this.meteors.filter(
            (bullet) => bullet.x + bullet.width > 0
        );

        this.animateSprite(frameCounter);
        console.log(this.health)
    }
    animateSprite(frameCounter) {
        if (frameCounter % this.frameSpeed === 0) {
          
            this.frameIndex++;
            
        }
        if (this.frameIndex >= this.img.frameCount){
            
           if(this.isAttacking) this.isAttacking = false
           this.frameIndex = 0;
        } 


    }

    shoot() {
        this.meteors.push(
            new Meteor(
                this.ctx,
                this.width,
                this.height,
                this.x,
                this.y,
                this.y0,
                this.canvasW,
                this.canvasH
            )
        );
    }
}

export default Boss;
