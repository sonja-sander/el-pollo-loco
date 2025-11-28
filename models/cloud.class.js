import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";

export class Cloud extends MovableObject {
    // #region Attributes
    x;
    y = 20;
    height = 250;
    width = 500;
    // #endregion

    constructor({_x} = {}) {
        super();
        this.x = _x;
        this.loadImage(ImageHub.background.clouds[0]);
        IntervalHub.startInterval(this.move, 1000/60);
    }

    // #region Methods
    move = () => {
        this.moveLeft(); 
    }
    // #endregion
}