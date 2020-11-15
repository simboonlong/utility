![CI](https://github.com/simboonlong/utility/workflows/CI/badge.svg?branch=master&event=push) [![Netlify Status](https://api.netlify.com/api/v1/badges/13e83d25-b833-48e5-bc73-bac4e8e32958/deploy-status)](https://app.netlify.com/sites/lucid-ardinghelli-84074a/deploys) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# utility

Some web utility functions to use.

## why

There are often similar recurring user experience expectations. Sometimes I wish that some utilities were easier to use / customizable to my needs. Hence, the code abstraction.

## demo

[http://utility.simboonlong.com](http://utility.simboonlong.com)

## install

`npm i @simboonlong/utility`

or

Get the umd minified version directly at [utility.min.js](https://utility.simboonlong.com/utility.min.js). You can save + download the script and host it within your application. Do note that this umd version utilises the global namespace, so there's a chance of name collisions if any :)

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

#### onWindowScroll

Throttled window resize event.

Example:

```
import { onWindowResize } from "@simboonlong/utility"

onWindowResize({
  callback: () => {
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
  callback: {
    scrollDown: () => {
      console.log("scroll down")
    },
    scrollUp: () => {
      console.log("scroll up")
    },
    hitTop: () => {
      console.log("hit top")
    }, // optional
    hitInBetween: (st) => {
      console.log(`hit between - ${st}`)
    }, // optional
    hitBottom: () => {
      console.log("hit bottom")
    } // optional
  },
  throtteRate: 75  // throtteRate default is 50
})
```

---

#### ease

Set easing values on anything.

Example:

```
import { ease, easeOutQuart } from "@simboonlong/utility"

ease({
  startValue: 0,
  endValue: 1000,
  duration: 500, // optional, default is 1000,
  easeType: easeOutQuart, // optional, default is easeInOutCubic
  onStep: value => { document.getElementById("scrollable-x").scrollLeft = value },
  onComplete: () => {
    console.log("scroll completed")
  } // optional
})
```

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

---

#### inView

Sets `[data-inview="true"]` when element is scrolled into view. Customize any transition via css animation in `.in-view`.

Example:

```
<div data-inview>
  <div class="in-view">
    ...
  </div>
</div>
```

```
import { inView } from "@simboonlong/utility"

inView({
  elements: document.querySelectorAll('[data-inview]'),
  root: null, // optional, default is null
  trigger: "FULL", // optional, default is `CENTER`
  triggerY: 15, // optional, note that defining this will overwrite trigger option
  thresholdSteps: 30, // optional, default is 20
  isOnce: true // optional, default is false
});
```

```
Options:

elements         ---   Elements selector
root             ---   Root element in which `[data-inview]` elements will based their callbacks on.
trigger          ---   "FULL" | "PARTIAL" | "CENTER".
                        `FULL` sets `[data-inview="true"]` to element once it's fully in view.
                        `PARTIAL` sets `[data-inview="true"]` to element as soon as it is within view.
                        `CENTER` sets `[data-inview="true"]` to element only when its top hits root element's center.
triggerY         ---   percentage value of root element in determining when elements should set `[data-inview="true"]`.
thresholdSteps   ---   determines how granular the callbacks are.
isOnce           ---   determines if to reset back to `[data-inview]` after element exited.
```

Author © [Sim Boon Long](http://simboonlong.com/).
