/**
 * Static keyboard and touch input handler for the game.
 * Tracks pressed keys for both desktop and mobile controls.
 * @class
 */
export class Keyboard {
    // #region Attributes
    static SPACE = false; 
    static LEFT = false; 
    static RIGHT = false;
    static D = false; 
    // #endregion

    // #region Methods

    /**
     * Sets up keyboard listeners for desktop controls.
     * Delegates to {@link Keyboard.getKeydownEvents} and {@link Keyboard.getKeyupEvents}.
     *
     * @static
     * @returns {void}
     */
    static setControls(){
        window.addEventListener("keydown", (event) => {
            Keyboard.getKeydownEvents(event);
        });

        window.addEventListener("keyup", (event) => {
            Keyboard.getKeyupEvents(event);
        });
    }

    /**
     * Handles keydown events and updates the corresponding
     * static flags (SPACE, LEFT, RIGHT, D).
     *
     * @static
     * @param {KeyboardEvent} e - The keydown event.
     * @returns {void}
     */
    static getKeydownEvents(e){
        if(e.key === " "){
            Keyboard.SPACE = true;
        }
        if(e.key === "ArrowLeft"){
            Keyboard.LEFT = true;
        }
        if(e.key === "ArrowRight"){
            Keyboard.RIGHT = true;
        }
        if(e.code === "KeyD"){
            Keyboard.D = true;
        }
    }

    /**
     * Handles keyup events and resets the corresponding
     * static flags (SPACE, LEFT, RIGHT, D).
     *
     * @static
     * @param {KeyboardEvent} e - The keyup event.
     * @returns {void}
     */
    static getKeyupEvents(e){
        if(e.key === " "){
            Keyboard.SPACE = false;
        }
        if(e.key === "ArrowLeft"){
            Keyboard.LEFT = false;
        }
        if(e.key === "ArrowRight"){
            Keyboard.RIGHT = false;
        }
        if(e.code === "KeyD"){
            Keyboard.D = false;
        }
    }

    /**
     * Sets up touch controls for mobile by binding handlers
     * to the on-screen control buttons and disabling the context menu.
     *
     * @static
     * @returns {void}
     */
    static setMobileControls(){
        const mobileBtnLeft = document.getElementById("mobile-btn-left");
        const mobileBtnRight = document.getElementById("mobile-btn-right");
        const mobileBtnBottle = document.getElementById("mobile-btn-bottle");
        const mobileBtnJump = document.getElementById("mobile-btn-jump");

        Keyboard.getMobileLeft(mobileBtnLeft);
        Keyboard.getMobileRight(mobileBtnRight);
        Keyboard.getMobileBottle(mobileBtnBottle);
        Keyboard.getMobileJump(mobileBtnJump);
        Keyboard.preventContextMenu();
    }

    /**
     * Binds touch controls for moving left to the given button element.
     *
     * @static
     * @param {HTMLElement} btnLeft - The left movement button element.
     * @returns {void}
     */
    static getMobileLeft(btnLeft){
        btnLeft.addEventListener("touchstart", () => {
            Keyboard.LEFT = true;
        });
        btnLeft.addEventListener("touchend", () => {
            Keyboard.LEFT = false;
        });
    }

    /**
     * Binds touch controls for moving right to the given button element.
     *
     * @static
     * @param {HTMLElement} btnRight - The right movement button element.
     * @returns {void}
     */
    static getMobileRight(btnRight){
        btnRight.addEventListener("touchstart", () => {
            Keyboard.RIGHT = true;
        });
        btnRight.addEventListener("touchend", () => {
            Keyboard.RIGHT = false;
        });
    }

    /**
     * Binds touch controls for throwing a bottle (D action)
     * to the given button element.
     *
     * @static
     * @param {HTMLElement} btnBottle - The bottle action button element.
     * @returns {void}
     */
    static getMobileBottle(btnBottle){
        btnBottle.addEventListener("touchstart", () => {
            Keyboard.D = true;
        });
        btnBottle.addEventListener("touchend", () => {
            Keyboard.D = false;
        });
    }

    /**
     * Binds touch controls for jumping (SPACE action)
     * to the given button element.
     *
     * @static
     * @param {HTMLElement} btnJump - The jump button element.
     * @returns {void}
     */
    static getMobileJump(btnJump){
        btnJump.addEventListener("touchstart", () => {
            Keyboard.SPACE = true;
        });
        btnJump.addEventListener("touchend", () => {
            Keyboard.SPACE = false;
        });
    }

    /**
     * Prevents the default context menu from appearing
     * (useful on mobile long-press).
     *
     * @static
     * @returns {void}
     */
    static preventContextMenu(){
        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
    }
    // #endregion
}
