![CI](https://github.com/simboonlong/utility/workflows/CI/badge.svg?branch=master&event=push) [![Netlify Status](https://api.netlify.com/api/v1/badges/0c993cb8-5cca-4c05-a543-a921ff62dee0/deploy-status)](https://app.netlify.com/sites/simboonlong-utility/deploys) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Utility

Some web utility functions to use.

## Why?

There are often similar recurring user experience expectations. Sometimes I wish that some utilities were easier to use / customizable to my needs. Hence, the code abstraction.

## Demo

[https://utility.simboonlong.com](https://utility.simboonlong.com)

## Install

`npm i @simboonlong/utility`

or

Get the umd minified version directly at [utility.min.js](https://utility.simboonlong.com/utility.min.js). You can save + download the script and host it within your application. Do note that this umd version utilises the global namespace, so there's a chance of name collisions if any :)

---

#### ease

Set easing values on anything.

Example:

```
import { ease, easeOutQuart } from "@simboonlong/utility"

ease({
  startValue: 0,
  endValue: 1000,
  decimal: 2, // optional, default is 0,
  duration: 500, // optional, default is 1000,
  easeType: easeOutQuart, // optional, default is easeInOutCubic
  onStep: value => { document.getElementById("scrollable-x").scrollLeft = value },
  onComplete: () => {
    console.log("scroll completed")
  } // optional
})
```

---

#### getCookie

Get browser cookie.

Example:

```
import { getCookie } from "@simboonlong/utility"

getCookie({ cname: "tracker" }); // if set = returns cookie's value, if unset = returns undefined
```

#### setCookie

Set browser cookie.

Example:

```
import { setCookie } from "@simboonlong/utility"

setCookie({ cname: "tracker", cvalue: "abc123", exdays: 0.125 }); // set cookie to 3 hours expiry
setCookie({ cname: "tracker", cvalue: "abc123", exdays: 0 }); // delete cookie by setting expiry to 0
```

---

#### getViewport

Get accurate viewport width or height, regardless of cross-browser scrollbar width or its presence.

Example:

```
import { getViewport } from "@simboonlong/utility"

getViewport().w // returns current viewport width
getViewport().h // returns current viewport height
```

---

#### inView

Sets `[data-inview="true"]` when element is scrolled into view.

Example:

```
import { inView } from "@simboonlong/utility"

inView({
  elements: document.querySelectorAll(".foo"),
  trigger: "CENTER", // optional, default is `FULL`
  isOnce: true // optional, default is false
});
```

```
Options:

elements  ---   Elements selector
trigger   ---   "PARTIAL" | "FULL" | "WITHIN" | "CENTER".
                `PARTIAL` sets `[data-inview="true"]` as soon as it is within view.
                `FULL` sets `[data-inview="true"]` once it is fully in view.
                `WITHIN` sets `[data-inview="true"]` once it is fully in view and as soon as exit view.
                `CENTER` sets `[data-inview="true"]` once it's center is in root center.
isOnce    ---   Determines if to reset back to `[data-inview]` after elements exited.
```

1 use case is to have a customised css transition when element is in view:

```
<div class="foo">
  <div class="hide">
    ...
  </div>
</div>
```

```
.hide {
  transition: opacity 0.3s ease-out, transform 0.7s ease-in-out;
  transform: translateY(24px);
  opacity: 0;
}

[data-inview="true"] .hide {
  transform: translateY(0);
  opacity: 1;
}
```

---

#### onMediaQuery

Breakpoint callbacks with matchMedia, based on min-width and max-width conditions.

Example:

```
import { onMediaQueryWidth } from "@simboonlong/utility"

const mq = onMediaQueryWidth({
  onInit: true, // optional, default is false
  breakpoint: {
    0: () => {
      console.log("xs");
    },
    640: () => {
      console.log("sm");
    },
    768: () => {
      console.log("md");
    },
    1024: () => {
      console.log("lg");
    },
    1280: () => {
      console.log("xl");
    },
    1536: () => {
      console.log("xxl");
    }
  }
});

mq.update(); // callback based on current viewport width
mq.updateAll(); // fire all callbacks
```

---

#### onWindowResize

Throttled window resize event.

Example:

```
import { onWindowResize } from "@simboonlong/utility"

onWindowResize({
  resize: () => {
    console.log('window resize')
  },
  throtteRate: 75 // throtteRate default is 50
})
```

#### onWindowScroll

Various scrolling scenario callbacks, on window scroll event.

Example:

```
import { onWindowScroll } from "@simboonlong/utility"

onWindowScroll({
  up: () => {
    console.log("scroll up")
  },
  down: () => {
    console.log("scroll down")
  },
  top: () => {
    console.log("hit top")
  }, // optional
  between: (scrollTopCurr) => {
    console.log(`hit between - ${scrollTopCurr}`)
  }, // optional
  bottom: () => {
    console.log("hit bottom")
  }, // optional
  throtteRate: 75  // throtteRate default is 50
})
```

---

#### scrollProgressBody

Returns scroll progress based on document.

Example:

```
import { scrollProgressBody } from "@simboonlong/utility"

const progress = scrollProgressBody({
  scrollTopCurr: document.body.scrollTop || document.documentElement.scrollTop,
  decimal: 1, // optional, default is 2
});

console.log(`${progress}%`);
```

#### scrollProgressItem

Returns scroll progress based on item against document.

Example:

```
import { scrollProgressItem } from "@simboonlong/utility"

const progress = scrollProgressItem({
  element: document.getElementById("tracker-example"),
  scrollTopCurr: document.body.scrollTop || document.documentElement.scrollTop,
  decimal: 1, // optional, default is 2
});

console.log(`${progress}%`);
```

---

#### scrollToY

`scrollToY` is built upon [`ease`](#ease) function. Mainly for vertical ease scrolling of window.

Example:

```
import { scrollToY, easeOutQuart } from "@simboonlong/utility"

document.getElementById('someId').addEventListener("click", (event) => {
  event.preventDefault()

  scrollToY({
    endValue: 200,
    duration: 500, // optional, default is 1000
    easeType: easeOutQuart, // optional, default is easeInOutCubic
    onComplete: () => {
      console.log("scroll completed")
    } // optional
  })
})
```

<!--
TODO: common breakpoints
TODO: window resize change to resize observer
TODO: media query event callback
TODO: history updates with urlSearchParams
-->

Author © [Sim Boon Long](https://simboonlong.com).
