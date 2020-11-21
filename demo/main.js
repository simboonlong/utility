var updateCookie = () => {
  document.getElementById("cookie").innerText =
    getCookie({ cname: "tracker" }) ?? "undefined";
};

var updateViewport = () => {
  document.getElementById("vp-w").innerText = String(getViewport().w);
  document.getElementById("vp-h").innerText = String(getViewport().h);
};

var fixie = document.querySelector(".on-window-scroll");
var scrollHandler;

var setFixie = () => {
  clearTimeout(scrollHandler);

  if (!fixie.classList.contains('is-active')) {
    fixie.classList.add('is-active');
  } else {
    scrollHandler = setTimeout(() => {
      fixie.classList.remove('is-active');
    }, 1900);
  }
}

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
    scrollToY({ endValue: 0 });
  });

document
  .getElementById("scroll-to-x")
  .addEventListener("click", (event) => {
    event.preventDefault();
    ease({
      startValue: 0,
      endValue: 800,
      onStep: (value) => {
        document.getElementById("on-step-scroll").innerText = value;
        document.getElementById("ease-scroll").scrollLeft = value;
      },
    });
  });

document
  .getElementById("ease-to-opacity")
  .addEventListener("click", (event) => {
    event.preventDefault();
    ease({
      startValue: 0,
      endValue: 1,
      decimal: 2,
      onStep: (value) => {
        document.getElementById("on-step-opacity").innerText = value;
        document.getElementById("ease-opacity").style.opacity = value;
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
  up: () => {
    document.getElementById("scroll").innerHTML = "&#8607;";
  },
  down: () => {
    document.getElementById("scroll").innerHTML = "&#8609;";
  },
  top: () => {
    document.getElementById("hit-top").innerHTML = "&#10003;";
  },
  between: (st) => {
    document.getElementById("hit-bottom").innerHTML = "&#10007;";
    document.getElementById("hit-top").innerHTML = "&#10007;";
    document.getElementById("hit-between").innerText = `${st}`;

    setFixie();
  },
  bottom: () => {
    document.getElementById("hit-bottom").innerHTML = "&#10003;";
  },
  throtteRate: 75,
});
onWindowResize({ resize: updateViewport, throtteRate: 75 });

// init
updateCookie();
updateViewport();
inView({
  elements: document.querySelectorAll('[data-inview]')
});
