import { throttle } from "./throttle.js";
export const onWindowResize = ({ callback, throtteRate = 50 }) => {
    const onResize = () => {
        callback();
    };
    const throttled = throttle({ func: onResize, wait: throtteRate });
    window.addEventListener("resize", throttled);
};
export const onWindowScroll = ({ callback, throtteRate = 50 }) => {
    let lastScrollTop = 0;
    const onScroll = () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const mostBottomTop = document.body.scrollHeight - window.innerHeight;
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
