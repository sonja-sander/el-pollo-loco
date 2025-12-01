import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

/**
 * Background cloud that slowly moves across the sky.
 * @class
 * @extends MovableObject
 */
export class Cloud extends MovableObject {
    // #region Attributes
    x;
    y = 20;
    height = 250;
    width = 500;
    // #endregion

    /**
     * Creates a new cloud at the given x-position
     * and starts its movement interval.
     *
     * @constructor
     * @param {number} _x - Initial x-position of the cloud.
     */
    constructor(_x) {
        super();
        this.x = _x;
        this.loadImage(ImageHub.background.clouds[0]);
        IntervalHub.startInterval(this.move, 1000/60);
    }

    /**
     * Moves the cloud slowly to the left.
     *
     * @returns {void}
     */
    move = () => {
        this.moveLeft(); 
    }
}
