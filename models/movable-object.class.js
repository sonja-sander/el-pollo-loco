import { AudioHub } from "./audio-hub.class.js";
import { DrawableObject } from "./drawable-object.class.js";

export class MovableObject extends DrawableObject {
    // #region Attributes
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    otherDirection = false;
    isWalking = false;
    isJumping = false;
    isDead = false;
    // #endregion

    constructor() {
        super();
    }

    // #region Methods
    playAnimation(images){
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft(){
        this.x -= this.speed;
    }
    
    moveRight() {
        this.x += this.speed;
    }

    applyGravity = () => {
        this.lastY = this.y;

        if(this.isAboveGround() || this.speedY > 0){ 
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }else{
            this.isJumping = false;
            this.speedY = 0;
        }
    }

    isAboveGround(){
        return this.y < 130;
    }

    jump(){
        this.speedY = 30;
        this.currentImage = 2;
        this.isJumping = true;
    }

    bounce(){
        this.speedY = 15;
        this.isJumping = true;
    }

    isFalling(){ 
        return this.speedY < 0; 
    }

    isFallingOnEnemy(enemy){
        const characterBottom = this.y + this.height;  
        const enemyTop = enemy.y;
        return this.isFalling() && characterBottom >= enemyTop;
    }

    hit(){
        this.energy -= 10;
        this.lastHit = new Date().getTime();

        if(this.energy <= 0){
            this.energy = 0;
            this.die();
        }else{
            AudioHub.playOne(AudioHub.CHARACTER_HURT);
        }
    }

    isHurt(){                          
        let timePassed = new Date().getTime() - this.lastHit; 
        timePassed = timePassed/1000; 
        return timePassed < 1;
    }

    die(){
        this.isDead = true;
    }
    // #endregion
}
