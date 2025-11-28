import { Level } from "./level.class.js";
import { Chicken } from "./chicken.class.js";
import { Chick } from "./chick.class.js";
import { Endboss } from "./endboss.class.js";
import { Cloud } from "./cloud.class.js";
import { Coin } from "./coin.class.js";
import { Bottle } from "./bottle.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { ImageHub } from "./image-hub.class.js";

export class LevelHub{
    // #region Attributes
    // #endregion

    // #region Methods
    static addBackgroundGroup({ _xGroup, _imgIndex, _BOArray} = {}){
        _BOArray.push(
            new BackgroundObject({ _x: _xGroup, _imagePath: ImageHub.background.air[0]}),
            new BackgroundObject({ _x: _xGroup, _imagePath: ImageHub.background.thirdLayer[_imgIndex]}),
            new BackgroundObject({ _x: _xGroup, _imagePath: ImageHub.background.secondLayer[_imgIndex]}),
            new BackgroundObject({ _x: _xGroup, _imagePath: ImageHub.background.firstLayer[_imgIndex]}),
        );
    }

    static createLevel1(){
        const backgroundGroups = [];
        LevelHub.addBackgroundGroup({ _xGroup: -720, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 0, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720, _imgIndex: 1, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*2, _imgIndex: 0, _BOArray: backgroundGroups});
        LevelHub.addBackgroundGroup({ _xGroup: 720*3, _imgIndex: 1, _BOArray: backgroundGroups});

        return new Level({
            _enemies: [
                new Chicken({_x: 400 + Math.random() * 720*2}), 
                new Chicken({_x: 400 + Math.random() * 720*2}), 
                new Chicken({_x: 400 + Math.random() * 720*2}), 
                new Chicken({_x: 400 + Math.random() * 720*2}), 
            ],
            _endboss: new Endboss({_x: 720*3, _speed: 1}),
            _clouds: [
                new Cloud({_x: -50 + Math.random() * 720*4}), 
                new Cloud({_x: -50 + Math.random() * 720*4}), 
            ],
            _backgroundObjects: backgroundGroups,
            _collectibleObjects: [
                new Coin({_x: 200 + Math.random() * 720*2}),
                new Coin({_x: 200 + Math.random() * 720*2}),
                new Coin({_x: 200 + Math.random() * 720*2}),
                new Coin({_x: 200 + Math.random() * 720*2}),
                new Coin({_x: 200 + Math.random() * 720*2}),
                new Bottle({_x: 300 + Math.random() * 720*2}),
                new Bottle({_x: 300 + Math.random() * 720*2}),
                new Bottle({_x: 300 + Math.random() * 720*2}),
                new Bottle({_x: 300 + Math.random() * 720*2}),
                new Bottle({_x: 300 + Math.random() * 720*2}),
                new Bottle({_x: 300 + Math.random() * 720*2}),
            ], 
            _levelEndX: 720*3,
        });
    }

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
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
                new Chick({_x: 400 + Math.random() * 720*5}), 
            ],
            _endboss: new Endboss({_x: 720*6, _speed: 3}),
            _clouds: [
                new Cloud({_x: -50 + Math.random() * 720*7}), 
                new Cloud({_x: -50 + Math.random() * 720*7}), 
                new Cloud({_x: -50 + Math.random() * 720*7}), 
                new Cloud({_x: -50 + Math.random() * 720*7}), 
            ],
            _backgroundObjects: backgroundGroups,
            _collectibleObjects: [
                new Coin({_x: 200 + Math.random() * 720*5}),
                new Coin({_x: 200 + Math.random() * 720*5}),
                new Coin({_x: 200 + Math.random() * 720*5}),
                new Coin({_x: 200 + Math.random() * 720*5}),
                new Coin({_x: 200 + Math.random() * 720*5}),
                new Bottle({_x: 300 + Math.random() * 720*5}),
                new Bottle({_x: 300 + Math.random() * 720*5}),
                new Bottle({_x: 300 + Math.random() * 720*5}),
                new Bottle({_x: 300 + Math.random() * 720*5}),
                new Bottle({_x: 300 + Math.random() * 720*5}),
            ], 
            _levelEndX: 720*6,
        });
    }

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
                new Chicken({_x: 400 + Math.random() * 720*9}), 
                new Chick({_x: 400 + Math.random() * 720*9}),
                new Chick({_x: 400 + Math.random() * 720*9}),
                new Chicken({_x: 400 + Math.random() * 720*9}),
                new Chicken({_x: 400 + Math.random() * 720*9}), 
                new Chick({_x: 400 + Math.random() * 720*9}),
                new Chicken({_x: 400 + Math.random() * 720*9}),
                new Chick({_x: 400 + Math.random() * 720*9}),
                new Chick({_x: 400 + Math.random() * 720*9}),
                new Chicken({_x: 400 + Math.random() * 720*9}),
                new Chick({_x: 400 + Math.random() * 720*9}),
                new Chicken({_x: 400 + Math.random() * 720*9}),
                new Chick({_x: 400 + Math.random() * 720*9}),
                new Chick({_x: 400 + Math.random() * 720*9}),
                new Chicken({_x: 400 + Math.random() * 720*9}),
            ],
            _endboss: new Endboss({_x: 720*10, _speed: 6}),
            _clouds: [
                new Cloud({_x: -50 + Math.random() * 720*11}), 
                new Cloud({_x: -50 + Math.random() * 720*11}), 
                new Cloud({_x: -50 + Math.random() * 720*11}), 
                new Cloud({_x: -50 + Math.random() * 720*11}), 
                new Cloud({_x: -50 + Math.random() * 720*11}), 
                new Cloud({_x: -50 + Math.random() * 720*11}), 
                new Cloud({_x: -50 + Math.random() * 720*11}), 
            ],
            _backgroundObjects: backgroundGroups,
            _collectibleObjects: [
                new Coin({_x: 200 + Math.random() * 720*9}),
                new Coin({_x: 200 + Math.random() * 720*9}),
                new Coin({_x: 200 + Math.random() * 720*9}),
                new Coin({_x: 200 + Math.random() * 720*9}),
                new Bottle({_x: 300 + Math.random() * 720*9}),
                new Bottle({_x: 300 + Math.random() * 720*9}),
                new Bottle({_x: 300 + Math.random() * 720*9}),
                new Bottle({_x: 300 + Math.random() * 720*9}),
            ], 
            _levelEndX: 720*10,
        });
    }
    // #endregion
}
