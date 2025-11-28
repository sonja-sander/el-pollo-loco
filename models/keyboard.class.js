export class Keyboard {
    // #region Attributes
    static SPACE = false; // key: " "
    static LEFT = false; // key: 'ArrowLeft'
    static RIGHT = false; // key: 'ArrowRight'
    static D = false; // key: 'KeyD'
    // #endregion

    constructor() {}

    // #region Methods
    static setControls(){
        window.addEventListener("keydown", (event) => {
            // console.log(event); 
            if(event.key === " "){
                Keyboard.SPACE = true;
            }
            if(event.key === "ArrowLeft"){
                Keyboard.LEFT = true;
            }
            if(event.key === "ArrowRight"){
                Keyboard.RIGHT = true;
            }
            if(event.code === "KeyD"){
                Keyboard.D = true;
            }
        });

        window.addEventListener("keyup", (event) => {
            // console.log(event); 
            if(event.key === " "){
                Keyboard.SPACE = false;
            }
            if(event.key === "ArrowLeft"){
                Keyboard.LEFT = false;
            }
            if(event.key === "ArrowRight"){
                Keyboard.RIGHT = false;
            }
            if(event.code === "KeyD"){
                Keyboard.D = false;
            }
        });
    }

    static setMobileControls(){
        const mobileBtnLeft = document.getElementById("mobile-btn-left");
        const mobileBtnRight = document.getElementById("mobile-btn-right");
        const mobileBtnBottle = document.getElementById("mobile-btn-bottle");
        const mobileBtnJump = document.getElementById("mobile-btn-jump");

        mobileBtnLeft.addEventListener("touchstart", () => {
            Keyboard.LEFT = true;
        });
        mobileBtnLeft.addEventListener("touchend", () => {
            Keyboard.LEFT = false;
        });
        
        mobileBtnRight.addEventListener("touchstart", () => {
            Keyboard.RIGHT = true;
        });
        mobileBtnRight.addEventListener("touchend", () => {
            Keyboard.RIGHT = false;
        });
        
        mobileBtnBottle.addEventListener("touchstart", () => {
            Keyboard.D = true;
        });
        mobileBtnBottle.addEventListener("touchend", () => {
            Keyboard.D = false;
        });
        
        mobileBtnJump.addEventListener("touchstart", () => {
            Keyboard.SPACE = true;
        });
        mobileBtnJump.addEventListener("touchend", () => {
            Keyboard.SPACE = false;
        });

        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
    }
    // #endregion
}