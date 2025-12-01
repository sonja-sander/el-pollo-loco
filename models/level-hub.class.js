import { Level } from "./level.class.js";
import { Chicken } from "./chicken.class.js";
import { Chick } from "./chick.class.js";
import { Endboss } from "./endboss.class.js";
import { Cloud } from "./cloud.class.js";
import { Coin } from "./coin.class.js";
import { Bottle } from "./bottle.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { ImageHub } from "./image-hub.class.js";

/**
 * Helper and factory class for creating game levels.
 * Provides static methods to build background groups and
 * predefined levels (level 1–3) with enemies, clouds and collectibles.
 * @class
 */
export class LevelHub{
    // #region Attributes
    // #endregion

    // #region Methods

    /**
     * Adds one full background group (air + 3 parallax layers)
     * at a given x-position to the provided BackgroundObject array.
     *
     * @static
     * @param {Object} [options={}] - Configuration object.
     * @param {number} options._xGroup - X-position for this background group.
     * @param {number} options._imgIndex - Index for selecting layer variants.
     * @param {BackgroundObject[]} options._BOArray - Array to push new background objects into.
     * @returns {void}
     */
    static addBackgroundGroup({ _xGroup, _imgIndex, _BOArray} = {}){
        _BOArray.push(
            new BackgroundObject({ _x: _xGroup, _imagePath: ImageHub.background.air[0]}),
            new BackgroundObject({ _x: _xGroup, _imagePath: ImageHub.background.thirdLayer[_imgIndex]}),
            new BackgroundObject({ _x: _xGroup, _imagePath: ImageHub.background.secondLayer[_imgIndex]}),
            new BackgroundObject({ _x: _xGroup, _imagePath: ImageHub.background.firstLayer[_imgIndex]}),
        );
    }

    /**
     * Creates and returns level 1 with a short distance,
     * regular chickens, a slow endboss and a basic amount
     * of coins and bottles.
     *
     * @static
     * @returns {Level} The configured level 1 instance.
     */
    static createLevel1(){
        const backgroundGroups = [];
        LevelHub.addBackgroundGroup({ _xGroup: -720, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 0, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*2, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*3, _imgIndex: 1, _BOArray: backgroundGroups});

        return new Level({
            _enemies: [
                new Chicken(400 + Math.random() * 720*2), 
                new Chicken(400 + Math.random() * 720*2), 
                new Chicken(400 + Math.random() * 720*2), 
                new Chicken(400 + Math.random() * 720*2), 
            ],
            _endboss: new Endboss({_x: 720*3, _speed: 1}),
            _clouds: [
                new Cloud(-50 + Math.random() * 720*4), 
                new Cloud(-50 + Math.random() * 720*4), 
            ],
            _backgroundObjects: backgroundGroups,
            _collectibleObjects: [
                new Coin(200 + Math.random() * 720*2),
                new Coin(200 + Math.random() * 720*2),
                new Coin(200 + Math.random() * 720*2),
                new Coin(200 + Math.random() * 720*2),
                new Coin(200 + Math.random() * 720*2),
                new Bottle(300 + Math.random() * 720*2),
                new Bottle(300 + Math.random() * 720*2),
                new Bottle(300 + Math.random() * 720*2),
                new Bottle(300 + Math.random() * 720*2),
                new Bottle(300 + Math.random() * 720*2),
                new Bottle(300 + Math.random() * 720*2),
            ], 
            _levelEndX: 720*3,
        });
    }

    /**
     * Creates and returns level 2 with a longer distance,
     * many small chicks as enemies, a faster endboss and
     * more clouds and collectibles.
     *
     * @static
     * @returns {Level} The configured level 2 instance.
     */
    static createLevel2(){
        const backgroundGroups = [];
        LevelHub.addBackgroundGroup({ _xGroup: -720, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 0, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*2, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*3, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*4, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*5, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*6, _imgIndex: 0, _BOArray: backgroundGroups});

        return new Level({
            _enemies: [
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
                new Chick(400 + Math.random() * 720*5), 
            ],
            _endboss: new Endboss({_x: 720*6, _speed: 3}),
            _clouds: [
                new Cloud(-50 + Math.random() * 720*7), 
                new Cloud(-50 + Math.random() * 720*7), 
                new Cloud(-50 + Math.random() * 720*7), 
                new Cloud(-50 + Math.random() * 720*7), 
            ],
            _backgroundObjects: backgroundGroups,
            _collectibleObjects: [
                new Coin(200 + Math.random() * 720*5),
                new Coin(200 + Math.random() * 720*5),
                new Coin(200 + Math.random() * 720*5),
                new Coin(200 + Math.random() * 720*5),
                new Coin(200 + Math.random() * 720*5),
                new Bottle(300 + Math.random() * 720*5),
                new Bottle(300 + Math.random() * 720*5),
                new Bottle(300 + Math.random() * 720*5),
                new Bottle(300 + Math.random() * 720*5),
                new Bottle(300 + Math.random() * 720*5),
            ], 
            _levelEndX: 720*6,
        });
    }

    /**
     * Creates and returns level 3 as the longest and hardest level,
     * mixing chickens and chicks, with a very fast endboss and
     * many clouds and collectibles over a long distance.
     *
     * @static
     * @returns {Level} The configured level 3 instance.
     */
    static createLevel3(){
        const backgroundGroups = [];
        LevelHub.addBackgroundGroup({ _xGroup: -720, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 0, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*2, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*3, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*4, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*5, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*6, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*7, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*8, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*9, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*10, _imgIndex: 0, _BOArray: backgroundGroups});

        return new Level({
            _enemies: [
                new Chicken(400 + Math.random() * 720*9), 
                new Chick(400 + Math.random() * 720*9),
                new Chick(400 + Math.random() * 720*9),
                new Chicken(400 + Math.random() * 720*9),
                new Chicken(400 + Math.random() * 720*9), 
                new Chick(400 + Math.random() * 720*9),
                new Chicken(400 + Math.random() * 720*9),
                new Chick(400 + Math.random() * 720*9),
                new Chick(400 + Math.random() * 720*9),
                new Chicken(400 + Math.random() * 720*9),
                new Chick(400 + Math.random() * 720*9),
                new Chicken(400 + Math.random() * 720*9),
                new Chick(400 + Math.random() * 720*9),
                new Chick(400 + Math.random() * 720*9),
                new Chicken(400 + Math.random() * 720*9),
            ],
            _endboss: new Endboss({_x: 720*10, _speed: 6}),
            _clouds: [
                new Cloud(-50 + Math.random() * 720*11), 
                new Cloud(-50 + Math.random() * 720*11), 
                new Cloud(-50 + Math.random() * 720*11), 
                new Cloud(-50 + Math.random() * 720*11), 
                new Cloud(-50 + Math.random() * 720*11), 
                new Cloud(-50 + Math.random() * 720*11), 
                new Cloud(-50 + Math.random() * 720*11), 
            ],
            _backgroundObjects: backgroundGroups,
            _collectibleObjects: [
                new Coin(200 + Math.random() * 720*9),
                new Coin(200 + Math.random() * 720*9),
                new Coin(200 + Math.random() * 720*9),
                new Coin(200 + Math.random() * 720*9),
                new Bottle(300 + Math.random() * 720*9),
                new Bottle(300 + Math.random() * 720*9),
                new Bottle(300 + Math.random() * 720*9),
                new Bottle(300 + Math.random() * 720*9),
            ], 
            _levelEndX: 720*10,
        });
    }
    // #endregion
}
