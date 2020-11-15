var updateCookie = () => {
  document.getElementById("cookie").innerText =
    getCookie({ cname: "tracker" }) ?? "undefined";
};

var updateViewport = () => {
  document.getElementById("vp-w").innerText = String(getViewport().w);
  document.getElementById("vp-h").innerText = String(getViewport().h);
};

document.getElementById("cookie-unset").addEventListener("click", () => {
  setCookie({ cname: "tracker", cvalue: "abc123", exdays: 0 });
  updateCookie();
});

document.getElementById("cookie-set").addEventListener("click", () => {
  setCookie({ cname: "tracker", cvalue: "abc123", exdays: 0.125 });
  updateCookie();
});

document
  .getElementById("scroll-to-y")
  .addEventListener("click", (event) => {
    event.preventDefault();
    scrollToY({ endValue: 200 });
  });

document
  .getElementById("scroll-to-x")
  .addEventListener("click", (event) => {
    event.preventDefault();
    ease({
      startValue: 0,
      endValue: 1000,
      onStep: (value) => {
        document.getElementById("scrollable-x").scrollLeft = value;
      },
    });
  });

document
  .getElementById("scroll-to-y-infinity")
  .addEventListener("click", (event) => {
    event.preventDefault();
    scrollToY({ endValue: Infinity });
  });

document
  .getElementById("scroll-to-target")
  .addEventListener("click", (event) => {
    event.preventDefault();
    scrollToY({ endValue: document.getElementById("target").offsetTop });
  });

onWindowScroll({
  callback: {
    scrollDown: () => {
      document.getElementById("scroll").innerText = "down";
    },
    scrollUp: () => {
      document.getElementById("scroll").innerText = "up";
    },
    hitTop: () => {
      document.getElementById("hit-top").innerText = `${true}`;
    },
    hitBetween: (st) => {
      document.getElementById("hit-bottom").innerText = `${false}`;
      document.getElementById("hit-top").innerText = `${false}`;
      document.getElementById("hit-between").innerText = `${st}`;
    },
    hitBottom: () => {
      document.getElementById("hit-bottom").innerText = `${true}`;
    },
  },
  throtteRate: 75,
});
onWindowResize({ callback: updateViewport, throtteRate: 75 });

// init
updateCookie();
updateViewport();
inView({
  elements: document.querySelectorAll('[data-inview]'),
  trigger: "FULL"
});
