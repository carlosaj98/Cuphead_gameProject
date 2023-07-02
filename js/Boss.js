import Meteor from "./Meteor.js";
import Fire from "./Fire.js";

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
        this.vx = 0

        this.img = new Image();
        this.img.src = "assets/boss/Boss1_idle.png";

        this.img.frameCount = 16;
        this.frameSpeed = 5;
        this.frameIndex = 0;

        this.width = 600;
        this.height = 800;

        this.meteors = [];
        this.fires = []

        this.health = 100

        this.isAttacking = false;

        this.meteorAudio = new Audio('assets/sounds/meteor_sound.mp3')
		this.meteorAudio.volume = 0.5
        this.meteorAudio.playbackRate = 3

        this.fireAudio = new Audio('assets/sounds/fire_sound.mp3')
		this.fireAudio.volume = 0.5
        this.fireAudio.playbackRate = 1
        this.intervalMeteors();
        this.intervalFires()
    }

    intervalMeteors() {
        this.intervalMeteor = setInterval(() => {
            if(this.health>50){
                this.isAttacking = true
                this.shoot()
                
                this.frameIndex = 0
            }

        }, 1000);
        
    }

    intervalFires(){
        this.intervalFire = setInterval(() => {
            if(this.health < 50){
                this.isAttacking = true
                this.shootFire()
                this.frameIndex = 0
            }

        }, 1500); 
    }

    stopAttacks(){
        clearInterval(this.intervalMeteor)
        clearInterval(this.intervalFire)
    }

    healthSystem(){
        if(this.health <= 50){
            this.vx = 5
            this.x += this.vx
            if(this.x < this.canvasW){
                this.vx = 0
                this.x += this.vx
                this.drawPhase2()
            }
            clearInterval(this.intervalMeteor)
        }
        if(this.health <= 0){
            setTimeout(() => {
                this.x = -3000
            }, 1500);
            
            clearInterval(this.intervalFire)
        }
    }

    draw(frameCounter) {
        // Pintamos un cada frame del sprite en función del frameIndex

        this.healthSystem()
        
        if(this.health >= 50){
            if(this.isAttacking){
                this.img.src = "assets/boss/Boss1_attack.png"
                this.img.frameCount = 7;
                this.frameSpeed = 4;
                this.meteorAudio.play()
               
    
            } else{
                this.img.src = "assets/boss/Boss1_idle.png"; 
                this.img.frameCount = 16;
                this.frameSpeed = 5;
              
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
        );
        this.meteors.forEach((meteor) => {
            meteor.draw();
            meteor.move();
        });
        this.meteors = this.meteors.filter(
            (bullet) => bullet.x + bullet.width > 0
        );

        this.animateSprite(frameCounter);
    }

    drawPhase2(frameCounter){
        
        setTimeout(() => {
            this.img.src = "assets/boss/Boss2_idle.png"; 
            this.img.frameCount = 14;
            this.frameSpeed = 6;
            this.x = this.canvasW * -0.15
            this.y = this.canvasH - 775;
            if(this.isAttacking && this.fires.length >= 1) this.fireAudio.play()
            
            if(this.health <= 0){
                this.img.src = "assets/boss/Boss_death.png"; 
                this.img.frameCount = 8;
                this.frameSpeed = 6;
            }

        }, 2000);
        this.fires.forEach((fire) => {
            fire.draw();
            
            fire.move();
        });
        this.fires = this.fires.filter(
            (fire) => fire.x + fire.width > 0
        );
        this.animateSprite(frameCounter);


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

    shootFire() {
        this.fires.push(
            new Fire(
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
