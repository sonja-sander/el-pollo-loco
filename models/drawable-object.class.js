/**
 * Base class for all drawable objects in the game.
 * Handles image loading, drawing and basic collision frame calculation.
 * @class
 */
export class DrawableObject {
    // #region Attributes
    x = 0;
    y = 0;
    width;
    height;
    img;
    imageCache = {};
    currentImage = 0;
    // #endregion

    // #region Methods

    /**
     * Loads a single image and assigns it as the main sprite.
     *
     * @param {string} path - Path to the image file.
     * @returns {void}
     */
    loadImage(path) { 
        this.img = new Image(); 
        this.img.src = path; 
    }

    /**
     * Preloads multiple images and stores them in the image cache.
     *
     * @param {string[]} arr - Array of image paths to load.
     * @returns {void}
     */
    loadImages(arr){
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image of this object on the given canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context.
     * @returns {void}
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    /**
     * Calculates the real hitbox frame based on the visual offset
     * and stores it in rX, rY, rW and rH.
     *
     * @returns {void}
     */
    getRealFrame = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Checks if this object is colliding with another object
     * based on their positions and sizes.
     *
     * @param {DrawableObject} mO - The other object to check collision against.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mO){
        return this.rX + this.rW > mO.x &&
        this.rY + this.rH > mO.y &&
        this.rX < mO.x + mO.width &&
        this.rY < mO.y + mO.height;
    }
    // #endregion
}
