import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { AudioHub } from "./audio-hub.class.js";

/**
 * Final boss enemy of the game.
 * Handles movement, AI (first contact, chasing, attacking),
 * animations and damage/energy state.
 * @class
 * @extends MovableObject
 */
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

    /**
     * Creates a new Endboss instance with a given position and speed,
     * loads all required animations and starts movement/animation intervals.
     *
     * @constructor
     * @param {{_x: number, _speed: number}} [options={}] - Configuration object.
     * @param {number} options._x - Initial x-position of the endboss.
     * @param {number} options._speed - Movement speed of the endboss.
     */
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

    /**
     * Handles endboss movement logic.
     * The boss only moves after first contact and if not dead, hurt or alert.
     * It chases the character horizontally and sets the walking state.
     *
     * @returns {void}
     */
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

    /**
     * Controls the current animation of the endboss based on its state:
     * first contact, dead, hurt, attacking or walking.
     * Also triggers the attack sound when entering attack state.
     *
     * @returns {void}
     */
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

    /**
     * Handles the "first contact" alert phase.
     * The boss will play its alert animation before starting to move,
     * once the character is close enough. This is controlled via
     * {@link hadFirstContact} and {@link firstContactCounter}.
     *
     * @returns {void}
     */
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

    /**
     * Reduces the endboss energy when hit by a bottle.
     * If energy drops below 0, the boss dies.
     *
     * @returns {void}
     */
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
