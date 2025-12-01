import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { LevelHub } from "../models/level-hub.class.js";
import { AudioHub } from "../models/audio-hub.class.js";
import { ImageHub } from "../models/image-hub.class.js";

/**
 * Main game bootstrap script.
 * Wires DOM elements, initializes keyboard/mobile controls,
 * creates the {@link World}, handles level flow, audio mute state
 * and fullscreen mode.
 * @file
 */

// #region Variables
let canvas;
let ctx;
let world;
let currentLevel = 1;
const MAX_LEVEL = 3;
const INSTRUCTIONS = document.getElementById("instructions");
const MOBILE_BTNS_LEFT = document.getElementById("mobile-control-btns-left");
const MOBILE_BTNS_RIGHT = document.getElementById("mobile-control-btns-right");
const START_GAME_BTN = document.getElementById("start-game-btn");
const NEXT_LEVEL_BTN = document.getElementById("next-level-btn");
const RESTART_GAME_BTN = document.getElementById("restart-game-btn");
const BACK_TO_HOME_BTN = document.getElementById("back-to-home-btn");
const OPTION_BTNS = document.getElementById("option-btns-container");
const MUTE_BTN = document.getElementById("mute-btn");
const UNMUTE_BTN = document.getElementById("unmute-btn");
const ENTER_FULLSCREEN_BTN = document.getElementById("enter-fullscreen-btn");
const EXIT_FULLSCREEN_BTN = document.getElementById("exit-fullscreen-btn");
// #endregion

document.addEventListener("DOMContentLoaded", init);

/**
 * Initializes the game on page load:
 * - grabs canvas and context,
 * - sets up keyboard and mobile controls,
 * - restores mute state from localStorage,
 * - shows the start screen and registers button listeners.
 *
 * @returns {void}
 */
function init() {
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");
    Keyboard.setControls();  
    Keyboard.setMobileControls();
    getFromLocalStorage();
    showStartScreen();
    listenForButtonClicks();
}

// #region Start game

/**
 * Shows the start screen with the intro image,
 * shows only the start button and hides all in-game controls.
 *
 * @returns {void}
 */
function showStartScreen(){
    getStartImage();
    START_GAME_BTN.classList.remove("d-none");
    INSTRUCTIONS.classList.add("d-none");
    OPTION_BTNS.classList.add("d-none");
    MOBILE_BTNS_LEFT.classList.add("d-none");
    MOBILE_BTNS_RIGHT.classList.add("d-none");
    RESTART_GAME_BTN.classList.add("d-none");
    BACK_TO_HOME_BTN.classList.add("d-none");
    NEXT_LEVEL_BTN.classList.add("d-none");
}

/**
 * Loads and draws the start screen image onto the canvas.
 *
 * @returns {void}
 */
function getStartImage(){
    const startScreen = new Image();
    startScreen.src = ImageHub.introAndOutro.startScreen;
    startScreen.addEventListener("load", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(startScreen, 0, 0, canvas.width, canvas.height);
    });
}

/**
 * Starts or restarts the game:
 * - creates a new {@link World} with the current level,
 * - starts background music,
 * - shows in-game controls and hides menu buttons.
 *
 * @returns {void}
 */
function startGame(){
    let level = getLevel();
    world = new World({
        _canvas: canvas,
        _level: level,
        _screenIfLost: showEndScreenIfLost,
        _screenIfWon: showEndScreenIfWon
    });
    startMusic();
    OPTION_BTNS.classList.remove("d-none");
    INSTRUCTIONS.classList.remove("d-none");
    MOBILE_BTNS_LEFT.classList.remove("d-none");
    MOBILE_BTNS_RIGHT.classList.remove("d-none");
    START_GAME_BTN.classList.add("d-none");
    RESTART_GAME_BTN.classList.add("d-none");
    NEXT_LEVEL_BTN.classList.add("d-none");
    BACK_TO_HOME_BTN.classList.add("d-none");
}

/**
 * Returns the {@link Level} instance for the current level number.
 *
 * @returns {Level} The current level instance.
 */
function getLevel(){
    if(currentLevel === 1){
        return LevelHub.createLevel1();
    }else if(currentLevel === 2){
        return LevelHub.createLevel2();
    }else if(currentLevel === 3){
        return LevelHub.createLevel3();
    }
}

/**
 * Starts game music:
 * plays the start sound once and loops the background music.
 *
 * @returns {void}
 */
function startMusic(){
    AudioHub.playOne(AudioHub.GAME_START);
    AudioHub.BACKGROUND_MUSIC.loop = true;
    AudioHub.playOne(AudioHub.BACKGROUND_MUSIC);
}
// #endregion

// #region End game

/**
 * Shows the "game over" screen when the player lost:
 * - draws the lost image,
 * - plays the death sound,
 * - stops background music,
 * - shows restart and home buttons and hides in-game controls.
 *
 * @returns {void}
 */
function showEndScreenIfLost(){
    getLostImage();
    AudioHub.playOne(AudioHub.CHARACTER_DEAD);
    AudioHub.stopOne(AudioHub.BACKGROUND_MUSIC);
    RESTART_GAME_BTN.classList.remove("d-none");
    BACK_TO_HOME_BTN.classList.remove("d-none");
    OPTION_BTNS.classList.add("d-none");
    MOBILE_BTNS_LEFT.classList.add("d-none");
    MOBILE_BTNS_RIGHT.classList.add("d-none");
    NEXT_LEVEL_BTN.classList.add("d-none");
}

/**
 * Loads and draws the "lost" end screen image.
 *
 * @returns {void}
 */
function getLostImage(){
    const endScreenLost = new Image();
    endScreenLost.src = ImageHub.introAndOutro.lost;
    endScreenLost.addEventListener("load", () => {
        ctx.drawImage(endScreenLost, 0, 0, canvas.width, canvas.height);
    });
}

/**
 * Shows the "you won" screen:
 * - draws the win image,
 * - stops background music,
 * - shows next level (if available), restart and home buttons,
 * - hides in-game controls.
 *
 * @returns {void}
 */
function showEndScreenIfWon(){
    getWonImage();
    AudioHub.stopOne(AudioHub.BACKGROUND_MUSIC);
    NEXT_LEVEL_BTN.classList.remove("d-none");
    RESTART_GAME_BTN.classList.remove("d-none");
    BACK_TO_HOME_BTN.classList.remove("d-none");
    OPTION_BTNS.classList.add("d-none");
    MOBILE_BTNS_LEFT.classList.add("d-none");
    MOBILE_BTNS_RIGHT.classList.add("d-none");
    updateNextLevelButton();
}

/**
 * Loads and draws the "won" end screen image
 * with a small margin inside the canvas border.
 *
 * @returns {void}
 */
function getWonImage(){
    const endScreenWon = new Image();
    endScreenWon.src = ImageHub.introAndOutro.won;
    endScreenWon.addEventListener("load", () => {
        ctx.drawImage(endScreenWon, 25, 25, canvas.width - 50, canvas.height - 50);
    });
}

/**
 * Updates the text and visibility of the "next level" button
 * depending on the current level and {@link MAX_LEVEL}.
 *
 * @returns {void}
 */
function updateNextLevelButton(){
    if(currentLevel < MAX_LEVEL){
        NEXT_LEVEL_BTN.textContent = `Go to level ${currentLevel + 1}`;
        NEXT_LEVEL_BTN.classList.remove("d-none");
    }else{
        NEXT_LEVEL_BTN.classList.add("d-none");
    }
}
// #endregion

// #region Event listeners

/**
 * Registers all main menu and flow button click listeners:
 * start, next level, restart and back to home.
 *
 * @returns {void}
 */
function listenForButtonClicks(){
    listenForStartGameClick();
    listenForNextLevelClick();
    listenForRestartGameClick();
    listenForBackToHomeClick();
}

/**
 * Registers click handler for the "start game" button.
 * Resets the level to 1 and starts the game.
 *
 * @returns {void}
 */
function listenForStartGameClick(){
    START_GAME_BTN.addEventListener("click", () => {
        currentLevel = 1;
        startGame();
    });
}

/**
 * Registers click handler for the "next level" button.
 * Increases the level up to {@link MAX_LEVEL} and starts the game.
 *
 * @returns {void}
 */
function listenForNextLevelClick(){
    NEXT_LEVEL_BTN.addEventListener("click", () => {
        if (currentLevel < MAX_LEVEL){
            currentLevel++;
        }
        startGame();
    });
}

/**
 * Registers click handler for the "restart game" button.
 * Resets to level 1 and starts the game.
 *
 * @returns {void}
 */
function listenForRestartGameClick(){
    RESTART_GAME_BTN.addEventListener("click", () => {
        currentLevel = 1;
        startGame();
    });
}

/**
 * Registers click handler for the "back to home" button.
 * Resets to level 1 and shows the start screen.
 *
 * @returns {void}
 */
function listenForBackToHomeClick(){
    BACK_TO_HOME_BTN.addEventListener("click", () => {
        currentLevel = 1;
        showStartScreen();
    });
}
// #endregion

// #region Mute audio

/**
 * Click handler for the mute button:
 * - stops all currently playing sounds,
 * - sets the global mute flag,
 * - saves the state in localStorage,
 * - updates the UI to show the unmute button.
 */
MUTE_BTN.addEventListener("click", () => {
    AudioHub.stopAll();
    AudioHub.IS_MUTED = true;
    saveToLocalStorage();
    MUTE_BTN.classList.add("d-none");
    UNMUTE_BTN.classList.remove("d-none");
});

/**
 * Click handler for the unmute button:
 * - clears the global mute flag,
 * - saves the state in localStorage,
 * - restarts background music,
 * - updates the UI to show the mute button.
 */
UNMUTE_BTN.addEventListener("click", () => {
    AudioHub.IS_MUTED = false;
    saveToLocalStorage();
    AudioHub.playOne(AudioHub.BACKGROUND_MUSIC);
    UNMUTE_BTN.classList.add("d-none");
    MUTE_BTN.classList.remove("d-none");
});


/**
 * Saves the current mute state to localStorage
 * under the key "muteState".
 *
 * @returns {void}
 */
function saveToLocalStorage(){
    localStorage.setItem("muteState", JSON.stringify(AudioHub.IS_MUTED));
}

/**
 * Restores the mute state from localStorage and
 * updates the visible mute/unmute buttons accordingly.
 *
 * @returns {void}
 */
function getFromLocalStorage(){
    let mutedBoolean = JSON.parse(localStorage.getItem("muteState"));

    if(mutedBoolean !== null){
        AudioHub.IS_MUTED = mutedBoolean;
    }

    if(AudioHub.IS_MUTED){
        MUTE_BTN.classList.add("d-none");
        UNMUTE_BTN.classList.remove("d-none");
    }else{
        UNMUTE_BTN.classList.add("d-none");
        MUTE_BTN.classList.remove("d-none");
    }
}
// #endregion

// #region Fullscreen

/**
 * Click handler for the "enter fullscreen" button:
 * - puts the #fullscreen container into fullscreen mode,
 * - hides the enter button,
 * - shows the exit button.
 */
ENTER_FULLSCREEN_BTN.addEventListener("click", () => {
    const fullscreen = document.getElementById("fullscreen");
    enterFullscreen(fullscreen);
    ENTER_FULLSCREEN_BTN.classList.add("d-none");
    EXIT_FULLSCREEN_BTN.classList.remove("d-none");
});

/**
 * Click handler for the "exit fullscreen" button:
 * - leaves fullscreen mode,
 * - hides the exit button,
 * - shows the enter button again.
 */
EXIT_FULLSCREEN_BTN.addEventListener("click", () => {
    exitFullscreen();
    EXIT_FULLSCREEN_BTN.classList.add("d-none");
    ENTER_FULLSCREEN_BTN.classList.remove("d-none");
});


/**
 * Requests fullscreen mode for the given element,
 * handling various browser vendor prefixes.
 *
 * @param {HTMLElement} element - The element to display in fullscreen.
 * @returns {void}
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.msRequestFullscreen) { 
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) { 
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode, handling browser vendor prefixes.
 *
 * @returns {void}
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
// #endregion
