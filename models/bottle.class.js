import { CollectibleObject } from "./collectible-object.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

export class Bottle extends CollectibleObject{
    // #region Attributes
    x;
    y = 340;
    height = 90; 
    width = 80;
    rX;
    rY;
    rW;
    rH;
    offset = {top: 5, right: 15, bottom: 5, left: 15};
    type = "bottle";
    // #endregion

    constructor({_x}){
        super();
        this.x = _x;
        this.loadImage(ImageHub.salsaBottle.onGround[1]);
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }

    // #region Methods
    // #endregion
}