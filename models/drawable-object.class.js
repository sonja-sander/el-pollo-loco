export class DrawableObject {
    // #region Attributes
    x = 0;
    y = 0;
    width;
    height;
    img;
    imageCache = {};
    currentImage = 0;
    // #endregion

    constructor(){}

    // #region Methods
    loadImage(path) { 
        this.img = new Image(); 
        this.img.src = path; 
    }

    loadImages(arr){
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    getRealFrame = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    isColliding(mO){
        return this.rX + this.rW > mO.x &&
        this.rY + this.rH > mO.y &&
        this.rX < mO.x + mO.width &&
        this.rY < mO.y + mO.height;
    }
    // #endregion
}