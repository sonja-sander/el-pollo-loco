import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

/**
 * Status bar that displays the current health of the endboss.
 * @class
 * @extends StatusBar
 */
export class StatusBarEndboss extends StatusBar{
    // #region Attributes
    x = 505;
    y = 55;
    paths = ImageHub.statusBars.statusBarEndboss;
    // #endregion

    /**
     * Creates a new endboss status bar, loads all endboss bar images
     * and initializes the bar to 100%.
     *
     * @constructor
     */
    constructor(){
        super();
        this.loadImages(this.paths);
        this.setPercentage(100);
    }
}
