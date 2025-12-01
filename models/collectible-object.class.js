import { DrawableObject } from "./drawable-object.class.js"

/**
 * Base class for collectible objects in the game world
 * (e.g. coins, bottles) that can be picked up by the character.
 * @class
 * @extends DrawableObject
 */
export class CollectibleObject extends DrawableObject{
    // #region Attributes
    x = 500;
    y = 100;
    isCollected = false;
    // #endregion

    /**
     * Creates a new collectible object with default position
     * and not yet collected state.
     *
     * @constructor
     */
    constructor(){
        super();
    }

    // #region Methods

    /**
     * Marks this collectible as collected.
     *
     * @returns {void}
     */
    collect(){
        this.isCollected = true;
    }
    // #endregion
}
