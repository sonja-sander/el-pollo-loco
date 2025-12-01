import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

/**
 * Enemy chicken that walks from right to left across the level
 * and can be animated as walking or dead.
 * @class
 * @extends MovableObject
 */
export class Chicken extends MovableObject {
    // #region Attributes
    x;
    y = 340;
    height = 90;
    width = 90;
    rX;
    rY;
    rW;
    rH;
    offset = {top: 5, right: 5, bottom: 5, left: 5};
    speed = 0.15 + Math.random() * 0.8;
    imagesWalk = ImageHub.chicken.walk;
    imagesDead = ImageHub.chicken.dead;
    // #endregion

    /**
     * Creates a new chicken enemy at the given x-position
     * and starts movement, animation and frame-update intervals.
     *
     * @constructor
     * @param {number} _x - Initial x-position of the chicken.
     */
    constructor(_x) {
        super();
        this.x = _x;
        this.loadImage(ImageHub.chicken.walk[0]); 
        this.loadImages(this.imagesWalk); 
        this.loadImages(this.imagesDead); 
        IntervalHub.startInterval(this.move, 1000/60);
        IntervalHub.startInterval(this.animate, 1000/10);
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }

    // #region Methods

    /**
     * Moves the chicken to the left as long as it is not dead.
     *
     * @returns {void}
     */
    move = () => { 
        if(this.isDead){
            return;
        }else{
            this.moveLeft();
        }
    }

    /**
     * Updates the current animation of the chicken,
     * switching between walk and dead animations.
     *
     * @returns {void}
     */
    animate = () => { 
        if(this.isDead){
            this.playAnimation(this.imagesDead);
        }else{
            this.playAnimation(this.imagesWalk);
        }
    }
    // #endregion
}
