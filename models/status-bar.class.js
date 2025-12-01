import { DrawableObject } from "./drawable-object.class.js";

/**
 * Base status bar class for displaying percentages or discrete amounts,
 * such as health, coins, bottles or endboss energy.
 * Handles selecting the correct bar image based on value.
 * @class
 * @extends DrawableObject
 */
export class StatusBar extends DrawableObject {
    // #region Attributes
    width = 200;
    height = 60;
    percentage = 100;
    paths;
    // #endregion

    /**
     * Creates a new status bar with default size and 100% value.
     *
     * @constructor
     */
    constructor() {
        super();
    }

    // #region Methods

    /**
     * Sets the current percentage value and updates the displayed image
     * based on the resolved image index.
     *
     * @param {number} percentage - The current percentage (0–100).
     * @returns {void}
     */
    setPercentage(percentage){
        this.percentage = percentage; 
        let path = this.paths[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves which image index should be used for the current percentage.
     * Maps percentage ranges to indices 0–5.
     *
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage > 80){
            return 4;
        }else if(this.percentage > 60){
            return 3;
        }else if(this.percentage > 40){
            return 2;
        }else if(this.percentage > 20){
            return 1;
        }else{
            return 0;
        }
    }

    /**
     * Sets the current amount using a direct index into the paths array,
     * clamping the value to a valid range, and updates the displayed image.
     * Useful for discrete values like number of coins or bottles.
     *
     * @param {number} amount - Index-like amount to map to a status image.
     * @returns {void}
     */
    setAmount(amount){
        let index = amount;

        if(index < 0){
            index = 0;
        }
        
        if(index > this.paths.length - 1){
            index = this.paths.length - 1;
        }

        const path = this.paths[index];
        this.img = this.imageCache[path];
    }
    // #endregion
}
