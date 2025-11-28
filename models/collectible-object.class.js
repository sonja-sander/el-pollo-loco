import { DrawableObject } from "./drawable-object.class.js"

export class CollectibleObject extends DrawableObject{
    // #region Attributes
    x = 500;
    y = 100;
    isCollected = false;
    // #endregion

    constructor(){
        super();
    }

    // #region Methods
    collect(){
        this.isCollected = true;
    }
    // #endregion
}