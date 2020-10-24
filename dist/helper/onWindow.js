import { throttle } from "./throttle.js";
export var onWindowResize = function (_a) {
    var callback = _a.callback, _b = _a.throtteRate, throtteRate = _b === void 0 ? 50 : _b;
    var onResize = function () {
        callback();
    };
    var throttled = throttle({ func: onResize, wait: throtteRate });
    window.addEventListener("resize", throttled);
};
export var onWindowScroll = function (_a) {
    var callback = _a.callback, _b = _a.throtteRate, throtteRate = _b === void 0 ? 50 : _b;
    var lastScrollTop = 0;
    var onScroll = function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        var mostBottomTop = document.body.scrollHeight - window.innerHeight;
        if (callback.hitBetween) {
            callback.hitBetween(st);
        }
        if (callback.hitTop && st <= 0) {
            callback.hitTop();
        }
        if (callback.hitBottom && st >= mostBottomTop) {
            callback.hitBottom();
        }
        try {
            if (st > lastScrollTop) {
                callback.scrollDown();
            }
            else {
                callback.scrollUp();
            }
        }
        catch (error) {
            throw Error(error);
        }
        lastScrollTop = st < 0 ? 0 : st;
    };
    window.addEventListener("scroll", throttle({ func: onScroll, wait: throtteRate }));
};
