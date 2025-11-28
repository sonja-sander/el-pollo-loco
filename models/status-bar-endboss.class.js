import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

export class StatusBarEndboss extends StatusBar{
    // #region Attributes
    x = 505;
    y = 55;
    paths = ImageHub.statusBars.statusBarEndboss;
    // #endregion

    constructor(){
        super();
        this.loadImages(this.paths);
        this.setPercentage(100);
    }

    // #region Methods
    // #endregion
}