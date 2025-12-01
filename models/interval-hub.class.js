/**
 * Helper class for managing all active intervals in the game.
 * Allows starting intervals and stopping them all at once.
 * @class
 */
export class IntervalHub{
    static ALL_INTERVALS = [];

    // #region Methods

    /**
     * Starts a new interval with the given callback and delay,
     * stores its ID and returns it.
     *
     * @static
     * @param {Function} func - Callback function to execute on each tick.
     * @param {number} timer - Interval delay in milliseconds.
     * @returns {number} The created interval ID.
     */
    static startInterval(func, timer){
        const newInterval = setInterval(func, timer);
        IntervalHub.ALL_INTERVALS.push(newInterval);
        return newInterval;
    }

    /**
     * Stops all registered intervals and clears the internal list.
     *
     * @static
     * @returns {void}
     */
    static stopAllIntervals(){
        IntervalHub.ALL_INTERVALS.forEach(clearInterval);
        IntervalHub.ALL_INTERVALS = [];
    }
    // #endregion
}
