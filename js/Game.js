import Background from "./Background.js";
import WaterFront from "./WaterFront.js";
import WaterBack from "./WaterBack.js";
import Floor from "./Floor.js";
import Player from "./Player.js";
import Boss from "./Boss.js";

const Game = {
    fps: 60,
    ctx: undefined,
    canvasW: 1536,
    canvasH: 722,
    keys: {
        JUMP: "Space",
        RIGHT: "KeyD",
        LEFT: "KeyA",
    },

    init: function () {
        const canvas = document.createElement("canvas");
        this.ctx = canvas.getContext("2d");

        canvas.width = this.canvasW;
        canvas.height = this.canvasH;

        document.body.append(canvas)

        this.start();
    },

    reset: function () {
        this.background = new Background(this.ctx, this.canvasW, this.canvasH);
        this.floor = new Floor(this.ctx, this.canvasW, this.canvasH);
        this.player = new Player(
            this.ctx,
            this.canvasW,
            this.canvasH,
            this.keys
        );
        this.waterFront = new WaterFront(this.ctx, this.canvasW, this.canvasH);
        this.waterBack = new WaterBack(this.ctx, this.canvasW, this.canvasH);
        this.boss = new Boss(this.ctx, this.canvasW, this.canvasH, this.keys);

        this.ostMusic = new Audio('../assets/sounds/ost_music.mp3')
        this.ostMusic.volume = 0.15
        this.ostMusic.play()


        this.frameCounter = 0;
    },

    start: function () {
        this.reset();
        this.intervalId = setInterval(() => {
            this.clearCanvas();

            this.frameCounter++;

            this.background.draw();

            this.waterBack.draw(this.frameCounter);

            this.floor.draw();

            this.player.draw(this.frameCounter);
            this.player.move();

            this.boss.draw(this.frameCounter);

            if(this.boss.health < 80){
                this.boss.drawPhase2(this.frameCounter);

            }

            this.waterFront.draw(this.frameCounter);

            if (this.isCollision()) {
                this.gameover();
            }

            if (this.isFireColl()) {
                this.gameover();
            }
            if (this.isBulletColl()) {
                this.hitAudio = new Audio('../assets/sounds/hitBullet_audio.mp3')
                this.hitAudio.volume = 0.1
                this.hitAudio.playbackRate = 1
                this.hitAudio.play()

                this.player.bullets.splice(0, 1);
                this.boss.health -= 1;
                // this.boss.healthSystem()
            }
        }, 1000 / this.fps);
    },

    stop: function () {
        this.reset();
        clearInterval(this.intervalId);
    },

    gameover() {
        clearInterval(this.intervalId);

        this.ostMusic.pause()

        if (confirm("Quieres jugar de nuevo")) {
            this.start();
        }
    },

    isCollision() {
        return this.boss.meteors.some(
            (meteor) =>
                meteor.x < this.player.x + this.player.width - 100 &&
                meteor.x + meteor.width - 100 > this.player.x &&
                meteor.y + meteor.height - 100 > this.player.y &&
                meteor.y < this.player.y + this.player.height - 100
        );
    },

    isFireColl() {
        return this.boss.fires.some(
            (fire) =>
                fire.x < this.player.x + this.player.width - 100 &&
                fire.x + fire.width - 100 > this.player.x &&
                fire.y + fire.height - 100 > this.player.y &&
                fire.y < this.player.y + this.player.height - 100
        );
    },

    isBulletColl() {
        return this.player.bullets.some(
            (bullet) =>
                bullet.x + bullet.width > this.boss.x + 200 &&
                bullet.x < this.boss.x + this.boss.width - 200
        );
    },

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    },
};

export default Game;
