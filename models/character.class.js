import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { AudioHub } from "./audio-hub.class.js";

/**
 * Main player character of the game.
 * Handles movement, animations, jumping and related sounds.
 * @class
 * @extends MovableObject
 */
export class Character extends MovableObject {
    // #region Attributes
    x = 100;
    y = 120;
    height = 300;
    width = 150;
    rX;
    rY;
    rW;
    rH;
    offset = {top: 110, right: 20, bottom: 10, left: 15};
    speed = 10;
    imagesIdle = ImageHub.character.idle; 
    imagesLongIdle = ImageHub.character.longIdle;
    imagesWalk = ImageHub.character.walk; 
    imagesJump = ImageHub.character.jump;
    imagesHurt = ImageHub.character.hurt;
    imagesDead = ImageHub.character.dead;
    world;
    standingSince = 0;
    coinAmount = 0;
    bottleAmount = 0;
    // #endregion

    /**
     * Creates a new Character instance and starts
     * movement, gravity and animation intervals.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImage(ImageHub.character.idle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle); 
        this.loadImages(this.imagesWalk); 
        this.loadImages(this.imagesJump); 
        this.loadImages(this.imagesHurt); 
        this.loadImages(this.imagesDead); 
        IntervalHub.startInterval(this.applyGravity, 1000/60);
        IntervalHub.startInterval(this.move, 1000/60);
        IntervalHub.startInterval(this.animate, 1000/10);
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }

    // #region Methods

    /**
     * Handles character input and horizontal movement.
     * Also updates the camera position and walking state.
     *
     * @returns {void}
     */
    move = () => { 
        let isWalkingNow = false;
        
        if(Keyboard.RIGHT && this.x < this.world.level.levelEndX){ 
            this.moveRight();
            isWalkingNow = true;
            this.otherDirection = false;
        }
        
        if(Keyboard.LEFT && this.x > 0){ 
            this.moveLeft();
            isWalkingNow = true;
            this.otherDirection = true;
        }

        if(Keyboard.SPACE && !this.isJumping){ 
            this.jump(); 
        }

        this.world.cameraX = -this.x + 100; 
        this.isWalking = isWalkingNow;
    }

    /**
     * Controls the current animation of the character
     * based on its state (dead, hurt, jumping, walking, idle)
     * and triggers walking audio when needed.
     *
     * @returns {void}
     */
    animate = () => { 
        if(this.isDead){
            this.playAnimation(this.imagesDead);
            this.standingSince = 0;
        }else if(this.isHurt()){
            this.playAnimation(this.imagesHurt);
            this.standingSince = 0;
        }else if(this.isJumping){
            this.playAnimation(this.imagesJump);
            this.standingSince = 0;
        }else if(this.isWalking){
            this.playAnimation(this.imagesWalk);
            this.standingSince = 0;
        }else{
            this.checkIfStandingAround();
        }
        this.playWalkingAudio();
    }

    /**
     * Checks if the character has been standing still
     * long enough and switches between idle and long-idle animations.
     *
     * @returns {void}
     */
    checkIfStandingAround = () => {
        if(this.standingSince === 0){ 
                this.standingSince = new Date().getTime();
            }

            if(this.isStandingAround()){ 
                this.playAnimation(this.imagesLongIdle); 
            }else{
                this.playAnimation(this.imagesIdle); 
            }
    }

    /**
     * Determines whether the character has been standing
     * still for more than 10 seconds.
     *
     * @returns {boolean} True if the character has been standing for more than 10 seconds.
     */
    isStandingAround(){
        let timePassed = new Date().getTime() - this.standingSince;
        timePassed = timePassed/1000;
        return timePassed > 10;
    }

    /**
     * Plays or stops the walking sound depending on
     * the current state of the character.
     *
     * @returns {void}
     */
    playWalkingAudio = () => {
        if (!this.isDead && !this.isHurt() && !this.isJumping &&
            this.isWalking) {
            AudioHub.playOne(AudioHub.CHARACTER_WALK);
        } else {
            AudioHub.stopOne(AudioHub.CHARACTER_WALK);
        }
    }

    /**
     * Makes the character jump and plays the jump sound.
     *
     * @returns {void}
     */
    jump(){
        super.jump();
        AudioHub.playOne(AudioHub.CHARACTER_JUMP);
    }
    // #endregion
}
