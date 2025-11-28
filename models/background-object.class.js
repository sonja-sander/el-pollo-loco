import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject {
    // #region Attributes
    x;
    y = 0;
    height = 480;
    width = 720;
    imagePath;
    // #endregion

    constructor({_x, _imagePath} = {}) {
        super();
        this.x = _x;
        this.imagePath = _imagePath;
        this.loadImage(_imagePath);
    }

    // #region Methods
    // #endregion
}