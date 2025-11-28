export class Level {
    // #region Attributes
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectibleObjects;
    levelEndX;
    // #endregion

    constructor({_enemies, _endboss, _clouds, _backgroundObjects, _collectibleObjects, _levelEndX} = {}) {
        this.enemies = _enemies;
        this.endboss = _endboss;
        this.clouds = _clouds;
        this.backgroundObjects = _backgroundObjects;
        this.collectibleObjects = _collectibleObjects;
        this.levelEndX = _levelEndX;
    }

    // #region Methods
    // #endregion
}