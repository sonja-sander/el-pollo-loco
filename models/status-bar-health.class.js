import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

/**
 * Status bar that displays the character's current health.
 * @class
 * @extends StatusBar
 */
export class StatusBarHealth extends StatusBar{
    // #region Attributes
    x = 20;
    y = 0;
    paths = ImageHub.statusBars.statusBarHealth;
    // #endregion

    /**
     * Creates a new health status bar, loads all health bar images
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
