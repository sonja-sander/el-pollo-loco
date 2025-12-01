/**
 * Represents a game level including enemies, endboss,
 * background elements and collectible objects.
 * @class
 */
export class Level {
    // #region Attributes
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectibleObjects;
    levelEndX;
    // #endregion

    /**
     * Creates a new level with enemies, endboss, background and collectibles.
     *
     * @constructor
     * @param {Object} [options={}] - Configuration object.
     * @param {Array} options._enemies - List of regular enemies in the level.
     * @param {Object} options._endboss - Endboss instance for this level.
     * @param {Array} options._clouds - Cloud objects in the background.
     * @param {Array} options._backgroundObjects - Static background objects.
     * @param {Array} options._collectibleObjects - Collectible items (coins, bottles, etc.).
     * @param {number} options._levelEndX - X-position of the level's end.
     */
    constructor({_enemies, _endboss, _clouds, _backgroundObjects, _collectibleObjects, _levelEndX} = {}) {
        this.enemies = _enemies;
        this.endboss = _endboss;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.collectibleObjects = _collectibleObjects;
        this.levelEndX = _levelEndX;
    }
}
