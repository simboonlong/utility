![CI](https://github.com/simboonlong/utility/workflows/CI/badge.svg?branch=master&event=push) [![Netlify Status](https://api.netlify.com/api/v1/badges/13e83d25-b833-48e5-bc73-bac4e8e32958/deploy-status)](https://app.netlify.com/sites/lucid-ardinghelli-84074a/deploys) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# utility

Some web utility functions to use.

## why

There are often similar recurring user experience expectations. Sometimes I wish that some utilities were easier to use / customizable to my needs. Hence, the code abstraction.

## demo

[http://utility.simboonlong.com](http://utility.simboonlong.com)

## install

`npm i @simboonlong/utility`

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
