![CI](https://github.com/simboonlong/utility/workflows/CI/badge.svg?branch=master&event=push) [![Netlify Status](https://api.netlify.com/api/v1/badges/13e83d25-b833-48e5-bc73-bac4e8e32958/deploy-status)](https://app.netlify.com/sites/lucid-ardinghelli-84074a/deploys) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


# utility
Some web utility functions to use.

## demo
[https://lucid-ardinghelli-84074a.netlify.app/](https://lucid-ardinghelli-84074a.netlify.app/)

## install
`npm i @simboonlong/utility`

---

### [setCookie](#setCookie)

Set browser cookie.

```
setCookie(`name`, `value`, `days`);
```

Example:

```
import { setCookie } from '@simboonlong/utility'

setCookie('tracker', 'abc123', 0.125); // set cookie to 3 hours expiry
setCookie('tracker', 'abc123', 0); // delete cookie by setting expiry to 0
```

### [getCookie](#getCookie)

Get browser cookie.

```
getCookie(`name`);
```

Example:

```
import { getCookie } from '@simboonlong/utility'

getCookie('tracker'); // if set = returns cookie's value, if unset = returns undefined
```

---

### [getViewport](#getViewport)

Get accurate viewport width or height, regardless of cross-browser scrollbar width or its presence.

Example:

```
import { getViewport } from '@simboonlong/utility'

getViewport().w // returns current viewport width
getViewport().h // returns current viewport height
```

---

### [onWindowResize](#onWindowScroll)

Throttled window resize event.

```
onWindowResize(`callback`, `throtteRate`)
```

Example:

```
import { onWindowResize } from '@simboonlong/utility'

onWindowResize(() => {
  console.log('window resize')
}, 75) // throtteRate default is 50
```

### [onWindowScroll](#onWindowScroll)

Various scrolling scenario callbacks, on window scroll event.

```
onWindowScroll(`callback`, `throtteRate`)
```

Example:

```
import { onWindowScroll } from '@simboonlong/utility'

onWindowScroll({
  scrollDown: () => {
    console.log('scroll down')
  },
  scrollUp: () => {
    console.log('scroll up')
  },
  hitTop: () => {
    console.log('hit top')
  }, // optional
  hitInBetween: (st) => {
    console.log(`hit between - ${st}`)
  }, // optional
  hitBottom: () => {
    console.log('hit bottom')
  } // optional
}, 75) // throtteRate default is 50
```

---

### [ease](#ease)

Set easing values on anything.

```
ease({`startValue`, `endValue`, `duration`, `easeType`, `onStep`, `onComplete`})
```

Example:

```
import { ease, easeOutQuart } from '@simboonlong/utility'

ease({
  startValue: 0,
  endValue: 1000,
  duration: 500, // optional, default is 1000,
  easeType: easeOutQuart, // optional, default is easeInOutCubic
  onStep: value => { document.getElementById('scrollable-x').scrollLeft = value },
  onComplete: () => {
    console.log('scroll completed')
  } // optional
})
```

### [scrollToY](#scrollToY)

`scrollToY` is built upon [`ease`](#ease) function. Mainly for vertical ease scrolling of window.

```
scrollToY({`endValue`, `duration`, `easeType`, `onComplete`})
```

Example:

```
import { scrollToY, easeOutQuart } from '@simboonlong/utility'

document.getElementById('someId').addEventListener('click', (event) => {
  event.preventDefault()

  scrollToY({
    endValue: 200,
    duration: 500, // optional, default is 1000
    easeType: easeOutQuart, // optional, default is easeInOutCubic
    onComplete: () => {
      console.log('scroll completed')
    } // optional
  })
})
```
