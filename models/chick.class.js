import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

export class Chick extends Chicken {
    // #region Attributes
    x;
    y = 360;
    height = 70;
    width = 70;
    rX;
    rY;
    rW;
    rH;
    offset = {top: 5, right: 5, bottom: 5, left: 5};
    speed = 0.7 + Math.random() * 0.3;
    imagesWalk = ImageHub.chick.walk;
    imagesDead = ImageHub.chick.dead;
    // #endregion

    constructor({_x} = {}) {
        super();
        this.x = _x;
        this.loadImage(ImageHub.chick.walk[0]); 
        this.loadImages(this.imagesWalk); 
        this.loadImages(this.imagesDead); 
        IntervalHub.startInterval(this.getRealFrame, 1000/60);
    }

    // #region Methods
    // #endregion
}