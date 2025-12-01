import { IntervalHub } from "./interval-hub.class.js";

/**
 * Central audio manager that controls all game sounds.
 * Provides helper methods for playing and stopping sounds globally.
 * @class
 */
export class AudioHub{
    // #region Attributes
    static BACKGROUND_MUSIC = new Audio("./audio/background-music/Fiesta-Pixelada.mp3");
    static GAME_START = new Audio("./audio/game/gameStart.mp3");
    static CHARACTER_LONG_IDLE = new Audio("./audio/character/characterSnoring.mp3");
    static CHARACTER_WALK = new Audio("./audio/character/characterRun.mp3");
    static CHARACTER_JUMP = new Audio("./audio/character/characterJump.wav");
    static CHARACTER_HURT = new Audio("./audio/character/characterDamage.mp3");
    static CHARACTER_DEAD = new Audio("./audio/character/characterDead.wav");
    static ENEMY_DEAD = new Audio("./audio/chicken/chickenDead2.mp3");
    static ENDBOSS_ATTACK = new Audio("./audio/endboss/endbossApproach.wav");
    static COLLECT_COIN = new Audio("./audio/collectibles/collectSound.wav");
    static COLLECT_BOTTLE = new Audio("./audio/collectibles/bottleCollectSound.wav");
    static BOTTLE_HIT = new Audio("./audio/throwable/bottleBreak.mp3");

    static ALL_SOUNDS = [
        AudioHub.BACKGROUND_MUSIC,
        AudioHub.GAME_START,
        AudioHub.CHARACTER_LONG_IDLE,
        AudioHub.CHARACTER_WALK,
        AudioHub.CHARACTER_JUMP,
        AudioHub.CHARACTER_HURT,
        AudioHub.CHARACTER_DEAD,
        AudioHub.ENEMY_DEAD,
        AudioHub.ENDBOSS_ATTACK,
        AudioHub.COLLECT_COIN,
        AudioHub.COLLECT_BOTTLE,
        AudioHub.BOTTLE_HIT,
    ];

    static IS_MUTED = false;
    // #endregion

    // #region Methods

    /**
     * Plays a single sound if audio is not muted.
     * Waits until the sound is fully loaded before playing.
     * @static
     * @param {HTMLAudioElement} sound - The audio object that should be played.
     * @returns {void}
     */
    static playOne(sound) { 
        if (AudioHub.IS_MUTED){ 
            return;
        }

        if (sound.readyState == 4){ 
            sound.volume = 0.1;
            sound.play();
            return;
        } else {
            const intervalId = IntervalHub.startInterval(() => {
                if (sound.readyState == 4) { 
                    sound.volume = 0.1; 
                    sound.play(); 
                    clearInterval(intervalId);
                }
            }, 200);
        }
    }

    /**
     * Stops all registered sounds by pausing each one.
     * @static
     * @returns {void}
     */
    static stopAll() {
        AudioHub.ALL_SOUNDS.forEach(sound => {
            sound.pause(); 
        });
    }

    /**
     * Stops a single sound by pausing it.
     * @static
     * @param {HTMLAudioElement} sound - The audio object that should be paused.
     * @returns {void}
     */
    static stopOne(sound) {
        sound.pause(); 
    }
    // #endregion
}
