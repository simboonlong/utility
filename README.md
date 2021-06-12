![CI](https://github.com/simboonlong/utility/workflows/CI/badge.svg?branch=master&event=push) [![Netlify Status](https://api.netlify.com/api/v1/badges/13e83d25-b833-48e5-bc73-bac4e8e32958/deploy-status)](https://app.netlify.com/sites/lucid-ardinghelli-84074a/deploys) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Utility

Some web utility functions to use.

## Why?

There are often similar recurring user experience expectations. Sometimes I wish that some utilities were easier to use / customizable to my needs. Hence, the code abstraction.

## Demo

[http://utility.simboonlong.com](http://utility.simboonlong.com)

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

Sets `[data-inview="true"]` when element is scrolled into view. Customize any transition via css animation in child `.in-view`.

Example:

```
<div data-inview>
  <div class="in-view">
    ...
  </div>
</div>
```

```
[data-inview] .in-view {
  transition: opacity 0.3s ease-out, transform 0.7s ease-in-out;
  transform: translateY(24px);
  opacity: 0;
}

[data-inview="true"] .in-view {
  transform: translateY(0);
  opacity: 1;
}
```

```
import { inView } from "@simboonlong/utility"

inView({
  elements: document.querySelectorAll('[data-inview]'),
  root: null, // optional, default is null
  trigger: "CENTER", // optional, default is `FULL`
  triggerY: 15, // optional, note that defining this will overwrite `trigger` option!
  thresholdSteps: 30, // optional, default is 20
  isOnce: true // optional, default is false
});
```

```
Options:

elements         ---   Elements selector
root             ---   Root element in which `[data-inview]` elements will based their callbacks on.
                       Defaults to the browser viewport.
trigger          ---   "FULL" | "PARTIAL" | "CENTER".
                       `FULL` sets `[data-inview="true"]` once it's fully in view.
                       `PARTIAL` sets `[data-inview="true"]` as soon as it is within view.
                       `CENTER` sets `[data-inview="true"]` only when its top hits root element's center.
triggerY         ---   Percentage value of root element in determining when should set `[data-inview="true"]`.
thresholdSteps   ---   Determines how granular the callbacks are.
isOnce           ---   Determines if to reset back to `[data-inview]` after elements exited.
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

Author © [Sim Boon Long](http://simboonlong.com/).
