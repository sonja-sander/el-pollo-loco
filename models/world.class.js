import { Character } from "./character.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { StatusBarHealth } from "./status-bar-health.class.js";
import { StatusBarCoin } from "./status-bar-coin.class.js";
import { StatusBarBottle } from "./status-bar-bottle.class.js";
import { StatusBarEndboss } from "./status-bar-endboss.class.js";
import { AudioHub } from "./audio-hub.class.js";

/**
 * Main game world.
 * Holds the current level, character, UI elements and handles
 * drawing, collision checks, throwing, collecting and game-over logic.
 * @class
 */
export class World {
    // #region Attributes
    canvas;
    ctx;
    level;
    screenIfLost;
    screenIfWon;
    character = new Character();
    cameraX = 0;
    statusBarHealth = new StatusBarHealth;
    statusBarCoin = new StatusBarCoin;
    statusBarBottle = new StatusBarBottle;
    statusBarEndboss = new StatusBarEndboss;
    screenIfLost;
    screenIfWon;
    throwableObjects = [];
    canThrowBottle = true;
    gameOver = false;
    // #endregion

    /**
     * Creates a new world instance, sets up rendering context,
     * links world references and starts the main loop.
     *
     * @constructor
     * @param {Object} [options={}] - Configuration object.
     * @param {HTMLCanvasElement} options._canvas - Canvas used to draw the game.
     * @param {Object} options._level - Level instance with enemies, background, collectibles, etc.
     * @param {Function} options._screenIfLost - Callback to show the "lost" screen.
     * @param {Function} options._screenIfWon - Callback to show the "won" screen.
     */
    constructor({_canvas, _level, _screenIfLost, _screenIfWon} = {}) {
        this.canvas = _canvas;
        this.level = _level;
        this.screenIfLost = _screenIfLost;
        this.screenIfWon = _screenIfWon;
        this.ctx = _canvas.getContext("2d");
        this.setWorld();
        this.draw();
        IntervalHub.startInterval(this.run, 1000/60);
    }

    // #region Methods

    /**
     * Assigns the world reference to the character and the endboss,
     * so they can access world state (e.g. for AI, camera).
     *
     * @returns {void}
     */
    setWorld(){
        this.character.world = this;
        this.level.endboss.world = this;
    }

    /**
     * Main draw loop.
     * Clears the canvas, applies camera translation,
     * draws background, UI and foreground objects and schedules the next frame.
     *
     * @returns {void}
     */
    draw() {
        if(this.gameOver){
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0); 
        this.getBackgroundObjects();
        this.ctx.translate(-this.cameraX, 0); 
        this.getFixedObjects();
        this.ctx.translate(this.cameraX, 0); 
        this.getForegroundObjects();
        this.ctx.translate(-this.cameraX, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws all background-related objects such as parallax layers and clouds.
     *
     * @returns {void}
     */
    getBackgroundObjects(){
        this.addObjectsToMap(this.level.backgroundObjects); 
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws fixed UI objects such as health, coin and bottle status bars,
     * and the endboss status bar once first contact has happened.
     *
     * @returns {void}
     */
    getFixedObjects(){
        this.addToMap(this.statusBarHealth); 
        this.addToMap(this.statusBarCoin); 
        this.addToMap(this.statusBarBottle); 
        if(this.level.endboss.hadFirstContact){
            this.addToMap(this.statusBarEndboss); 
        }
    }

    /**
     * Draws all foreground objects that move with the camera:
     * collectibles, enemies, endboss, character and throwable objects.
     *
     * @returns {void}
     */
    getForegroundObjects(){
        this.addCollectibleObjectsToMap(this.level.collectibleObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addToMap(this.character);
        this.addThrowableObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds an array of drawable objects to the canvas.
     *
     * @param {Array<DrawableObject>} objects - List of objects to be drawn.
     * @returns {void}
     */
    addObjectsToMap(objects){
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Adds collectible objects to the canvas, skipping those already collected.
     *
     * @param {Array} objects - List of collectible objects.
     * @returns {void}
     */
    addCollectibleObjectsToMap(objects){
        objects.forEach((o) => {
            if(o.isCollected){
                return;
            }
            this.addToMap(o);
        });
    }

    /**
     * Filters throwable objects to remove those marked for removal
     * and draws the remaining ones.
     *
     * @param {Array<ThrowableObject>} objects - List of throwable objects.
     * @returns {void}
     */
    addThrowableObjectsToMap(objects){
        const remaining = [];
        objects.forEach((bottle) => {
            if (!bottle.markedForRemoval) {
                remaining.push(bottle);
            }
        });

        this.throwableObjects = remaining;
        this.throwableObjects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single drawable object to the canvas.
     * Handles horizontal flipping when {@link dO.otherDirection} is true.
     *
     * @param {DrawableObject} dO - Drawable object to render.
     * @returns {void}
     */
    addToMap(dO){
        if(dO.otherDirection){ 
            this.flipImage(dO);
        }

        dO.draw(this.ctx);

        if(dO.otherDirection){
            this.flipImageBack(dO);
        }
    }

    /**
     * Flips an object horizontally by transforming the canvas context.
     *
     * @param {DrawableObject} dO - Drawable object to flip.
     * @returns {void}
     */
    flipImage(dO){
        this.ctx.save();
        this.ctx.translate(dO.width, 0); 
        this.ctx.scale(-1, 1);
        dO.x = dO.x * -1; 
    }

    /**
     * Restores the original x-position and canvas transform
     * after a horizontal flip.
     *
     * @param {DrawableObject} dO - Drawable object to unflip.
     * @returns {void}
     */
    flipImageBack(dO){
        dO.x = dO.x * -1;
        this.ctx.restore();
    }

    /**
     * Main game logic loop.
     * Checks collisions, throwing, collections and game-over conditions.
     *
     * @returns {void}
     */
    run = () => {
        this.checkCollisions();
        this.checkCollisionsWithEndboss();
        this.checkThrowObjects();
        this.checkCollectCoins();
        this.checkCollectBottles();
        this.checkGameOver();
    }

    /**
     * Checks collisions between the character and regular enemies:
     * - bottle hits enemies,
     * - stomp kills enemy and bounces character,
     * - enemy contact hurts character and updates health bar.
     *
     * @returns {void}
     */
    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            this.checkIfBottleHitEnemy(enemy);

            if(enemy.isDead){
                return;
            }else if(!this.character.isColliding(enemy)){
                return; 
            }else if(this.character.isFallingOnEnemy(enemy)){
                enemy.die(); 
                this.character.bounce(); 
            }else if(!this.character.isHurt()){ 
                this.character.hit(); 
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks if any throwable bottle has collided with a regular enemy.
     * On hit, the bottle explodes and the enemy dies.
     *
     * @param {Object} en - Enemy to check against.
     * @returns {void}
     */
    checkIfBottleHitEnemy(en){
        this.throwableObjects.forEach((bottle) => {
            if(bottle.isColliding(en)){
                bottle.explode(en);
                en.die();
            }
        });
    }
    
    /**
     * Checks collisions between the character and the endboss
     * and applies damage to the character when in contact.
     *
     * @returns {void}
     */
    checkCollisionsWithEndboss(){
        this.checkIfBottleHitEndboss();

        if (this.character.isColliding(this.level.endboss) && !this.character.isHurt()) { 
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if any throwable bottle has collided with the endboss.
     * On hit, applies damage to the endboss and updates its status bar.
     *
     * @returns {void}
     */
    checkIfBottleHitEndboss(){
        this.throwableObjects.forEach((bottle) => { 
            if (!bottle.hasExploded && bottle.isColliding(this.level.endboss)) {
                bottle.explode(this.level.endboss);
                this.level.endboss.hitByBottle();
                this.statusBarEndboss.setPercentage(this.level.endboss.energy);
            }
        });
    }
    
    /**
     * Handles bottle throwing when the D key is pressed:
     * - checks if throwing is allowed,
     * - determines the throw direction based on the character,
     * - creates a new {@link ThrowableObject},
     * - sets its direction, reduces the bottle count,
     * - updates the bottle status bar and prevents auto-repeat
     *   while the key is held down.
     *
     * @returns {void}
     */
    checkThrowObjects(){ 
        if(Keyboard.D && this.canThrowBottle && this.character.bottleAmount > 0 && !this.level.endboss.isHurt()){
            const thrownRight = this.checkThrownToRight();
            const startX = this.getStartXForBottleDirection(thrownRight);
            const bottle = new ThrowableObject({_x: startX, _y: this.character.y + 100});
            bottle.thrownToRight = thrownRight;
            this.throwableObjects.push(bottle);
            this.character.bottleAmount--;
            this.statusBarBottle.setAmount(this.character.bottleAmount);
            this.character.standingSince = 0;
            this.canThrowBottle = false; 
        }

        if(!Keyboard.D){
            this.canThrowBottle = true;
        }
    }

    /**
     * Calculates the starting x-position for a new bottle
     * based on the desired throw direction.
     *
     * @param {boolean} toRight - True if the bottle should be thrown to the right, false for left.
     * @returns {number} Starting x-position for the throwable bottle.
     */
    getStartXForBottleDirection(toRight){
        if(toRight){
            return this.character.x + 100; 
        }else{
            return this.character.x - 10; 
        }
    }

    /**
     * Determines whether the next bottle should be thrown to the right
     * based on the character's facing direction.
     *
     * @returns {boolean} True if the bottle should be thrown to the right, otherwise false.
     */
    checkThrownToRight(){
        if(this.character.otherDirection){
            return false;
        }else{
            return true;
        }
    }

    /**
     * Checks if the character has collected any coins.
     * Marks them as collected, increases the coin count,
     * updates the coin status bar and plays the coin sound.
     *
     * @returns {void}
     */
    checkCollectCoins(){
        this.level.collectibleObjects.forEach((object) => {
            if(object.type !== "coin"){
                return;
            }
            if(object.isCollected){
                return;
            }

            if(this.character.isColliding(object)){
                object.collect();
                this.character.coinAmount++;
                this.statusBarCoin.setAmount(this.character.coinAmount);
                AudioHub.playOne(AudioHub.COLLECT_COIN);
            }
        });
    }

    /**
     * Checks if the character has collected any bottles.
     * Marks them as collected, increases the bottle count,
     * updates the bottle status bar and plays the bottle sound.
     *
     * @returns {void}
     */
    checkCollectBottles(){
        this.level.collectibleObjects.forEach((object) => {
            if(object.type !== "bottle"){
                return;
            }
            if(object.isCollected){
                return;
            }

            if(this.character.isColliding(object)){
                object.collect();
                this.character.bottleAmount++;
                this.statusBarBottle.setAmount(this.character.bottleAmount);
                AudioHub.playOne(AudioHub.COLLECT_BOTTLE);
            }
        });
    }

    /**
     * Checks if the game is over:
     * - lost if character is dead,
     * - won if endboss is dead and no longer hurt.
     *
     * @returns {void}
     */
    checkGameOver(){
        if(this.character.isDead){
            this.endGameIfLost();
            return;
        }

        if(this.level.endboss.isDead && !this.level.endboss.isHurt()){
            this.endGameIfWon();
        }
    }

    /**
     * Ends the game in "lost" state:
     * stops all intervals and calls the "lost" screen callback.
     *
     * @returns {void}
     */
    endGameIfLost(){
        this.gameOver = true;
        IntervalHub.stopAllIntervals();
        this.screenIfLost();
    }

    /**
     * Ends the game in "won" state:
     * stops all intervals and calls the "won" screen callback.
     *
     * @returns {void}
     */
    endGameIfWon(){
        this.gameOver = true;
        IntervalHub.stopAllIntervals();
        this.screenIfWon();
    }
    // #endregion
}
