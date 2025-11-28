export class IntervalHub{
    // #region Attributes
    static ALL_INTERVALS = [];
    // #endregion

    // #region Methods
    static startInterval(func, timer){
        const newInterval = setInterval(func, timer);
        IntervalHub.ALL_INTERVALS.push(newInterval);
        return newInterval;
    }

    static stopAllIntervals(){
        IntervalHub.ALL_INTERVALS.forEach(clearInterval);
        IntervalHub.ALL_INTERVALS = [];
    }
    // #endregion
}