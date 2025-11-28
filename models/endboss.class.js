import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { AudioHub } from "./audio-hub.class.js";

export class Endboss extends MovableObject {
    // #region Attributes
    x;
    y = 55;
    height = 400;
    width = 250;
    rX;
    rY;
    rW;
    rH;
    offset = {top: 50, right: 10, bottom: 10, left: 10};
    speed;
    imagesWalk = ImageHub.endboss.walk;
    imagesAlert = ImageHub.endboss.alert;
    imagesAttack = ImageHub.endboss.attack;
    imagesHurt = ImageHub.endboss.hurt;
    imagesDead = ImageHub.chicken.dead;
    world;
    energy = 100;
    hadFirstContact = false;
    firstContactCounter = 0;
    isAlert = true;
    isAttacking = false;
    // #endregion

    constructor({_x, _speed} = {}){
        super();
        this.x = _x;
        this.speed = _speed;
        this.loadImage(ImageHub.endboss.alert[0]);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        IntervalHub.startInterval(this.move, 1000/60);
        IntervalHub.startInterval(this.animate, 1000/10);
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }

    // #region Methods
    move = () => { 
        let isWalkingNow = false;
        if(this.isDead || this.isHurt() || this.isAlert || !this.hadFirstContact){
            return;
        }

        if(this.world.character.x < this.x){
            this.moveLeft();
            isWalkingNow = true;
            this.otherDirection = false;
        }else if(this.world.character.x > this.x){
            this.moveRight();
            isWalkingNow = true;
            this.otherDirection = true;
        }
        this.isWalking = isWalkingNow;
    }

    animate = () => {
        this.playFirstContactAnimation();

        if(this.isDead){
            this.playAnimation(this.imagesDead);
            this.isAttacking = false;
        }else if (this.isHurt()){
            this.playAnimation(this.imagesHurt);  
            this.isAttacking = false;
        }else if(this.world.character.x + 200 >= this.x || this.world.character.x >= this.x - 200){
            if(!this.isAttacking){
                AudioHub.ENDBOSS_ATTACK.volume = 1;
                AudioHub.playOne(AudioHub.ENDBOSS_ATTACK);
            }
            this.playAnimation(this.imagesAttack);
        }else if(this.isWalking){
            this.playAnimation(this.imagesWalk);
            this.isAttacking = false;
        }
    }

    playFirstContactAnimation = () => {
        if(!this.hadFirstContact){
            this.playAnimation(this.imagesAlert);
            this.isAlert = true;
        }

        if(!this.hadFirstContact && this.world.character.x +500 >= this.x){
            this.hadFirstContact = true;
            this.firstContactCounter = 0;
        }

        if(this.hadFirstContact && this.firstContactCounter < 20){
            this.playAnimation(this.imagesAlert);
            this.isAlert = true;
            this.firstContactCounter++;
            return;
        }else{
            this.isAlert = false;
        }
    }

    hitByBottle() {
        this.energy -= 34; 
        this.lastHit = new Date().getTime();

        if (this.energy < 0) {
            this.energy = 0;
            this.die();
        }
    }
    // #endregion
}