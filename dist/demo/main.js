/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getCookie, setCookie, ease, getViewport, onWindowResize, onWindowScroll, scrollToY } from "../helper/index.js";
var updateCookie = function () {
    var _a;
    document.getElementById("cookie").innerText = (_a = getCookie({ cname: "tracker" })) !== null && _a !== void 0 ? _a : "undefined";
};
var updateViewport = function () {
    document.getElementById("vp-w").innerText = String(getViewport().w);
    document.getElementById("vp-h").innerText = String(getViewport().h);
};
document.getElementById("cookie-unset").addEventListener("click", function () {
    setCookie({ cname: "tracker", cvalue: "abc123", exdays: 0 });
    updateCookie();
});
document.getElementById("cookie-set").addEventListener("click", function () {
    setCookie({ cname: "tracker", cvalue: "abc123", exdays: 0.125 });
    updateCookie();
});
document.getElementById("scroll-to-y").addEventListener("click", function (event) {
    event.preventDefault();
    scrollToY({ endValue: 200 });
});
document.getElementById("scroll-to-x").addEventListener("click", function (event) {
    event.preventDefault();
    ease({ startValue: 0, endValue: 1000, onStep: function (value) { document.getElementById("scrollable-x").scrollLeft = value; } });
});
document.getElementById("scroll-to-y-infinity").addEventListener("click", function (event) {
    event.preventDefault();
    scrollToY({ endValue: Infinity });
});
document.getElementById("scroll-to-target").addEventListener("click", function (event) {
    event.preventDefault();
    scrollToY({ endValue: document.getElementById("target").offsetTop });
});
onWindowScroll({
    callback: {
        scrollDown: function () {
            document.getElementById("scroll").innerText = "down";
        },
        scrollUp: function () {
            document.getElementById("scroll").innerText = "up";
        },
        hitTop: function () {
            document.getElementById("hit-top").innerText = "" + true;
        },
        hitBetween: function (st) {
            document.getElementById("hit-bottom").innerText = "" + false;
            document.getElementById("hit-top").innerText = "" + false;
            document.getElementById("hit-between").innerText = "" + st;
        },
        hitBottom: function () {
            document.getElementById("hit-bottom").innerText = "" + true;
        }
    },
    throtteRate: 75
});
onWindowResize({ callback: updateViewport, throtteRate: 75 });
// init
updateCookie();
updateViewport();
