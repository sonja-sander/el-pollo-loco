import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a background element in the game world
 * that can move together with the camera/level.
 * @class
 * @extends MovableObject
 */
export class BackgroundObject extends MovableObject {
    // #region Attributes
    x;
    y = 0;
    height = 480;
    width = 720;
    imagePath;
    // #endregion

    /**
     * Creates a new BackgroundObject instance.
     *
     * @constructor
     * @param {{_x: number, _imagePath: string}} [options={}] - Configuration object.
     * @param {number} options._x - Initial x-position of the background object.
     * @param {string} options._imagePath - Path to the background image file.
     */
    constructor({_x, _imagePath} = {}) {
        super();
        this.x = _x;
        this.imagePath = _imagePath;
        this.loadImage(_imagePath);
    }
}
