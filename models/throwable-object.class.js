import { AudioHub } from "./audio-hub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
    // #region Attributes
    x;
    y;
    height = 60; 
    width = 50;
    rX;
    rY;
    rW;
    rH;
    offset = {top: 5, right: 5, bottom: 5, left: 5};
    speedY = 30;
    imagesRotatingBottle = ImageHub.salsaBottle.bottleRotation;
    imagesBottleSplash = ImageHub.salsaBottle.bottleSplash;
    hasExploded = false;
    markedForRemoval = false;
    static thrownToRight = true;
    // #endregion

    constructor({_x, _y} = {}) {
        super();
        this.x = _x;
        this.y = _y;
        this.loadImage(this.imagesRotatingBottle[0]);
        this.loadImages(this.imagesRotatingBottle);
        this.loadImages(this.imagesBottleSplash);
        IntervalHub.startInterval(this.applyGravity, 1000/60);
        IntervalHub.startInterval(this.throw, 1000/60);
        IntervalHub.startInterval(this.animate, 1000/10);
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }

    // #region Methods
    throw = () => {
        if(!this.hasExploded){
            if(ThrowableObject.thrownToRight){
                this.x += 10;
            }else{
                this.x -= 10;
            }
        }
    }

    animate = () => { 
        if(this.hasExploded){
            this.playAnimation(this.imagesBottleSplash);
        }else{
            this.playAnimation(this.imagesRotatingBottle);
        }
    }

    isAboveGround(){ 
        return true;
    }

    explode(enemy){
        this.width = enemy.width; 
        this.height = enemy.height; 
        this.x = enemy.x;
        this.y = enemy.y;
        this.speedY = 0;
        this.acceleration = 0;
        this.hasExploded = true;
        AudioHub.playOne(AudioHub.BOTTLE_HIT);

        setTimeout(() => {
            this.markedForRemoval = true;
        }, 400);
    }
    // #endregion
}