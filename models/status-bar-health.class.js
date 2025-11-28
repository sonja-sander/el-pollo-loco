import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

export class StatusBarHealth extends StatusBar{
    // #region Attributes
    x = 20;
    y = 0;
    paths = ImageHub.statusBars.statusBarHealth;
    // #endregion

    constructor(){
        super();
        this.loadImages(this.paths);
        this.setPercentage(100);
    }

    // #region Methods
    // #endregion
}