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

// scrolling vars
var scrollDirection = document.getElementById("scroll")
var hitBottom = document.getElementById("hit-bottom");
var hitTop = document.getElementById("hit-top");
var hitBetween = document.getElementById("hit-between");
var spItem = document.getElementById("sp-item");
var spBody = document.getElementById("sp-body");
var thumb = document.querySelector(".progress-thumb");
var progressingItem = (scrollTopCurr) => {
  const progress = scrollProgressItem({
    element: spItem,
    scrollTopCurr
  });
  thumb.style.width = `${progress}%`;
}
var progressingBody = (scrollTopCurr) => {
  const progress = scrollProgressBody({
    scrollTopCurr
  });
  spBody.innerText = `${progress}%`;
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
    scrollDirection.innerHTML = "&#8607;";
  },
  down: () => {
    scrollDirection.innerHTML = "&#8609;";
  },
  top: () => {
    hitTop.innerHTML = "&#10003;";
  },
  between: (scrollTopCurr) => {
    hitBottom.innerHTML = "&#10007;";
    hitTop.innerHTML = "&#10007;";
    hitBetween.innerText = `${scrollTopCurr}`;

    progressingItem(scrollTopCurr);
    progressingBody(scrollTopCurr);
    setFixie();
  },
  bottom: () => {
    hitBottom.innerHTML = "&#10003;";
  },
  throtteRate: 1,
});
onWindowResize({ resize: updateViewport, throtteRate: 75 });

// init
updateCookie();
updateViewport();
inView({
  elements: document.querySelectorAll('[data-inview]')
});
progressingItem(document.body.scrollTop || document.documentElement.scrollTop);
progressingBody(document.body.scrollTop || document.documentElement.scrollTop);