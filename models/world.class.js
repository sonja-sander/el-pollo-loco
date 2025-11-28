import { Character } from "./character.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { StatusBarHealth } from "./status-bar-health.class.js";
import { StatusBarCoin } from "./status-bar-coin.class.js";
import { StatusBarBottle } from "./status-bar-bottle.class.js";
import { StatusBarEndboss } from "./status-bar-endboss.class.js";
import { AudioHub } from "./audio-hub.class.js";

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
    setWorld(){
        this.character.world = this;
        this.level.endboss.world = this;
    }

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

    getBackgroundObjects(){
        this.addObjectsToMap(this.level.backgroundObjects); 
        this.addObjectsToMap(this.level.clouds);
    }

    getFixedObjects(){
        this.addToMap(this.statusBarHealth); 
        this.addToMap(this.statusBarCoin); 
        this.addToMap(this.statusBarBottle); 
        if(this.level.endboss.hadFirstContact){
            this.addToMap(this.statusBarEndboss); 
        }
    }

    getForegroundObjects(){
        this.addCollectibleObjectsToMap(this.level.collectibleObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addToMap(this.character);
        this.addThrowableObjectsToMap(this.throwableObjects);
    }

    addObjectsToMap(objects){
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addCollectibleObjectsToMap(objects){
        objects.forEach((o) => {
            if(o.isCollected){
                return;
            }
            this.addToMap(o);
        });
    }

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

    addToMap(dO){
        if(dO.otherDirection){ 
            this.flipImage(dO);
        }

        dO.draw(this.ctx);

        if(dO.otherDirection){
            this.flipImageBack(dO);
        }
    }

    flipImage(dO){
        this.ctx.save();
        this.ctx.translate(dO.width, 0); 
        this.ctx.scale(-1, 1);
        dO.x = dO.x * -1; 
    }

    flipImageBack(dO){
        dO.x = dO.x * -1;
        this.ctx.restore();
    }

    run = () => {
        this.checkCollisions();
        this.checkCollisionsWithEndboss();
        this.checkThrowObjects();
        this.checkCollectCoins();
        this.checkCollectBottles();
        this.checkGameOver();
    }

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

    checkIfBottleHitEnemy(en){
        this.throwableObjects.forEach((bottle) => {
            if(bottle.isColliding(en)){
                bottle.explode(en);
                en.die();
            }
        });
    }
    
    checkCollisionsWithEndboss(){
        this.checkIfBottleHitEndboss();

        if (this.character.isColliding(this.level.endboss) && !this.character.isHurt()) { 
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    checkIfBottleHitEndboss(){
        this.throwableObjects.forEach((bottle) => { 
            if (!bottle.hasExploded && bottle.isColliding(this.level.endboss)) {
                bottle.explode(this.level.endboss);
                this.level.endboss.hitByBottle();
                this.statusBarEndboss.setPercentage(this.level.endboss.energy);
            }
        });
    }

    checkThrowObjects(){ 
        if(Keyboard.D && this.canThrowBottle && this.character.bottleAmount > 0 && !this.level.endboss.isHurt()){
            const startX = this.getStartXForBottleDirection();
            const bottle = new ThrowableObject({_x: startX, _y: this.character.y+100});
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

    getStartXForBottleDirection(){
        ThrowableObject.thrownToRight = !this.character.otherDirection; 
            if(ThrowableObject.thrownToRight){
                return this.character.x + 100; 
            }else{
                return this.character.x - 10; 
            }
    }

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

    checkGameOver(){
        if(this.character.isDead && !this.character.isHurt()){
            this.endGameIfLost();
            return;
        }

        if(this.level.endboss.isDead && !this.level.endboss.isHurt()){
            this.endGameIfWon();
        }
    }

    endGameIfLost(){
        this.gameOver = true;
        IntervalHub.stopAllIntervals();
        this.screenIfLost();
    }

    endGameIfWon(){
        this.gameOver = true;
        IntervalHub.stopAllIntervals();
        this.screenIfWon();
    }
    // #endregion
}




