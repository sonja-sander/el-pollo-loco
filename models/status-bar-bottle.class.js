import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

export class StatusBarBottle extends StatusBar{
    // #region Attributes
    x = 20;
    y = 100;
    paths = ImageHub.statusBars.statusBarBottle;
    // #endregion

    constructor(){
        super();
        this.loadImages(this.paths);
        this.setAmount(0);
    }

    // #region Methods
    // #endregion
}