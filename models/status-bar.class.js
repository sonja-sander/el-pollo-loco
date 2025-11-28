import { DrawableObject } from "./drawable-object.class.js";

export class StatusBar extends DrawableObject {
    // #region Attributes
    width = 200;
    height = 60;
    percentage = 100;
    paths;
    // #endregion

    constructor() {
        super();
    }

    // #region Methods
    setPercentage(percentage){
        this.percentage = percentage; 
        let path = this.paths[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

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