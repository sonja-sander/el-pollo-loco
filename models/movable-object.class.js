import { AudioHub } from "./audio-hub.class.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Base class for all movable objects in the game.
 * Adds movement, gravity, jumping and damage logic on top of DrawableObject.
 * @class
 * @extends DrawableObject
 */
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

    /**
     * Creates a new movable object with default movement and state values.
     *
     * @constructor
     */
    constructor() {
        super();
    }

    // #region Methods

    /**
     * Cycles through an array of images and sets the current sprite
     * based on the internal animation index.
     *
     * @param {string[]} images - Array of image paths used for the animation.
     * @returns {void}
     */
    playAnimation(images){
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the left by its current speed.
     *
     * @returns {void}
     */
    moveLeft(){
        this.x -= this.speed;
    }
    
    /**
     * Moves the object to the right by its current speed.
     *
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Applies gravity to the object.
     * Updates vertical position and speed, and resets jump state
     * when the object reaches the ground.
     *
     * @returns {void}
     */
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

    /**
     * Checks whether the object is above the ground level.
     *
     * @returns {boolean} True if above ground, false if on or below ground.
     */
    isAboveGround(){
        return this.y < 130;
    }

    /**
     * Initiates a jump by setting vertical speed and jump state.
     *
     * @returns {void}
     */
    jump(){
        this.speedY = 30;
        this.currentImage = 2;
        this.isJumping = true;
    }

    /**
     * Applies a smaller upward impulse, used for bounce effects.
     *
     * @returns {void}
     */
    bounce(){
        this.speedY = 15;
        this.isJumping = true;
    }

    /**
     * Checks if the object is currently falling down.
     *
     * @returns {boolean} True if vertical speed is negative.
     */
    isFalling(){ 
        return this.speedY < 0; 
    }

    /**
     * Checks if this object is falling onto an enemy from above.
     *
     * @param {MovableObject} enemy - The enemy to test against.
     * @returns {boolean} True if falling and overlapping the top of the enemy.
     */
    isFallingOnEnemy(enemy){
        const characterBottom = this.y + this.height;  
        const enemyTop = enemy.y;
        return this.isFalling() && characterBottom >= enemyTop;
    }

    /**
     * Applies damage to this object, reduces its energy
     * and plays a hurt sound if still alive. If energy reaches zero,
     * the object dies.
     *
     * @returns {void}
     */
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

    /**
     * Checks if the object is currently in a hurt state,
     * based on the time elapsed since the last hit.
     *
     * @returns {boolean} True if the last hit was less than 1 second ago.
     */
    isHurt(){                          
        let timePassed = new Date().getTime() - this.lastHit; 
        timePassed = timePassed/1000; 
        return timePassed < 1;
    }

    /**
     * Marks this object as dead.
     *
     * @returns {void}
     */
    die(){
        this.isDead = true;
    }
    // #endregion
}
