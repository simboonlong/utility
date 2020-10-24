// inspired from https://github.com/davidgilbertson/easy-ease
// added extra easing functions from https://gist.github.com/gre/1650294#gistcomment-3141432
export var linear = function (t) {
    return t;
};
export var easeInQuad = function (t) {
    return t * t;
};
export var easeOutQuad = function (t) {
    return t * (2 - t);
};
export var easeInOutQuad = function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
export var easeInCubic = function (t) {
    return t * t * t;
};
export var easeOutCubic = function (t) {
    return --t * t * t + 1;
};
export var easeInOutCubic = function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
export var easeInQuart = function (t) {
    return t * t * t * t;
};
export var easeOutQuart = function (t) {
    return 1 - --t * t * t * t;
};
export var easeInOutQuart = function (t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
export var easeInQuint = function (t) {
    return t * t * t * t * t;
};
export var easeOutQuint = function (t) {
    return 1 + --t * t * t * t * t;
};
export var easeInOutQuint = function (t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};
var PI = Math.PI;
export var ease = function (_a) {
    var startValue = _a.startValue, endValue = _a.endValue, _b = _a.duration, duration = _b === void 0 ? 1000 : _b, _c = _a.easeType, easeType = _c === void 0 ? easeInOutCubic : _c, onStep = _a.onStep, _d = _a.onComplete, onComplete = _d === void 0 ? function () { return; } : _d;
    var now = window.performance.now();
    var currentSinValue = 0;
    var currentValue = startValue;
    var step = function (timestamp) {
        var timePassed = timestamp - now;
        currentSinValue = PI / (duration / timePassed);
        currentValue = parseInt((startValue + (easeType(timePassed / duration) * (endValue - startValue))).toFixed(0));
        if (currentSinValue < PI) {
            onStep(currentValue);
            window.requestAnimationFrame(step);
        }
        else {
            onStep(endValue);
            onComplete();
        }
    };
    window.requestAnimationFrame(step);
};
