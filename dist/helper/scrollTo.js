import { getViewport } from "./getViewport.js";
import { ease } from "./ease.js";
export var scrollToY = function (_a) {
    var endValue = _a.endValue, easeType = _a.easeType, duration = _a.duration, onComplete = _a.onComplete;
    var mostBottomScrollTop = document.body.scrollHeight - getViewport().h;
    ease({
        startValue: window.scrollY,
        endValue: endValue >= mostBottomScrollTop ? mostBottomScrollTop : endValue,
        duration: duration,
        easeType: easeType,
        onStep: function (value) { return window.scroll(0, value); },
        onComplete: onComplete
    });
};
