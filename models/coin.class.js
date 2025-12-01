import { CollectibleObject } from "./collectible-object.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

/**
 * Collectible coin that the character can pick up
 * to increase their coin count.
 * @class
 * @extends CollectibleObject
 */
export class Coin extends CollectibleObject{
    // #region Attributes
    x;
    y = 10 + Math.random() * 100;
    height = 150;
    width = 150;
    rX;
    rY;
    rW;
    rH;
    offset = {top: 40, right: 40, bottom: 40, left: 40};
    type = "coin";
    // #endregion

    /**
     * Creates a new coin at the given x-position
     * and starts updating its real frame for collision checks.
     *
     * @constructor
     * @param {number} _x - Initial x-position of the coin.
     */
    constructor(_x){
        super();
        this.x = _x;
        this.loadImage(ImageHub.coins.goldCoin[0]);
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }
}
