import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

/**
 * Status bar that displays the current number of collected coins.
 * @class
 * @extends StatusBar
 */
export class StatusBarCoin extends StatusBar{
    // #region Attributes
    x = 20;
    y = 50;
    paths = ImageHub.statusBars.statusBarCoin;
    // #endregion

    /**
     * Creates a new coin status bar, loads all coin bar images
     * and initializes the amount to 0.
     *
     * @constructor
     */
    constructor(){
        super();
        this.loadImages(this.paths);
        this.setAmount(0);
    }
}
