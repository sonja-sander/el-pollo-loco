import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

/**
 * Status bar that displays the current number of bottles
 * the character has collected.
 * @class
 * @extends StatusBar
 */
export class StatusBarBottle extends StatusBar{
    // #region Attributes
    x = 20;
    y = 100;
    paths = ImageHub.statusBars.statusBarBottle;
    // #endregion

    /**
     * Creates a new bottle status bar, loads all bottle bar images
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
