import { AudioHub } from "./audio-hub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Throwable salsa bottle object.
 * Handles projectile movement, rotation animation, explosion effect
 * and marks itself for removal after the splash.
 * @class
 * @extends MovableObject
 */
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
    thrownToRight = true;
    // #endregion

    /**
     * Creates a new throwable bottle at the given position,
     * loads rotation and splash images and starts movement,
     * gravity and animation intervals.
     *
     * @constructor
     * @param {{_x: number, _y: number}} [options={}] - Configuration object.
     * @param {number} options._x - Initial x-position of the bottle.
     * @param {number} options._y - Initial y-position of the bottle.
     */
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

    /**
     * Moves the bottle horizontally while it is flying.
     * Direction depends on the {@link ThrowableObject#thrownToRight} flag of this instance.
     *
     * @returns {void}
     */
    throw = () => {
        if(!this.hasExploded){
            if(this.thrownToRight){
                this.x += 10;
            }else{
                this.x -= 10;
            }
        }
    }

    /**
     * Plays the appropriate animation depending on the state:
     * rotation while flying, splash after explosion.
     *
     * @returns {void}
     */
    animate = () => { 
        if(this.hasExploded){
            this.playAnimation(this.imagesBottleSplash);
        }else{
            this.playAnimation(this.imagesRotatingBottle);
        }
    }

    /**
     * Overrides the default ground check.
     * For throwable objects we treat them as always above ground
     * so gravity continues to act until manually stopped.
     *
     * @returns {boolean} Always true.
     */
    isAboveGround(){ 
        return true;
    }

    /**
     * Triggers the explosion on a hit enemy:
     * resizes and repositions the bottle to cover the enemy area,
     * stops vertical movement, plays the hit sound,
     * switches to splash animation and marks the object
     * for removal after a short delay.
     *
     * @param {MovableObject} enemy - The enemy that was hit by the bottle.
     * @returns {void}
     */
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
