import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

export class StatusBarCoin extends StatusBar{
    // #region Attributes
    x = 20;
    y = 50;
    paths = ImageHub.statusBars.statusBarCoin;
    // #endregion

    constructor(){
        super();
        this.loadImages(this.paths);
        this.setAmount(0);
    }

    // #region Methods
    // #endregion
}