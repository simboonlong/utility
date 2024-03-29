![CI](https://github.com/simboonlong/utility/workflows/CI/badge.svg?branch=master&event=push) [![Netlify Status](https://api.netlify.com/api/v1/badges/0c993cb8-5cca-4c05-a543-a921ff62dee0/deploy-status)](https://app.netlify.com/sites/simboonlong-utility/deploys)

![Statements](https://img.shields.io/badge/statements-97.61%25-brightgreen.svg?style=flat) ![Branches](https://img.shields.io/badge/branches-94.87%25-brightgreen.svg?style=flat) ![Functions](https://img.shields.io/badge/functions-96.55%25-brightgreen.svg?style=flat) ![Lines](https://img.shields.io/badge/lines-97.23%25-brightgreen.svg?style=flat)

# Utility

Some web utility functions to use.

## Why?

There are often similar recurring user experience expectations. Sometimes I wish that some utilities were easier to use / customizable to my needs. Hence, the code abstraction.

## Demo

[https://utility.simboonlong.com](https://utility.simboonlong.com)

## Install

`npm i @simboonlong/utility`

or

`https://unpkg.com/@simboonlong/utility@<VERSION_NUMBER>/dist/umd/utility.min.js`

> Do note that umd version utilises the global namespace, so there's a chance of name collisions if any.

## Documentation

#### cookie

Set and get browser cookie.

```
import { cookie } from "@simboonlong/utility"

const Cookie = cookie();

Cookie.set({
  name: "tracker",
  value: "abc",
  expire: 0.125
}); // set cookie to 3 hours expiry

Cookie.get("tracker"); // returns "abc"

Cookie.set({
  name: "tracker",
  value: "abc",
  expire: 0
}); // delete cookie by setting expiry to 0

Cookie.get("tracker"); // returns undefined
```

---

#### ease

Set easing values on anything.

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

#### getViewport

Get accurate viewport width or height, regardless of cross-browser scrollbar width or its presence.

```
import { getViewport } from "@simboonlong/utility"

getViewport().w // returns current viewport width
getViewport().h // returns current viewport height
```

---

#### inView

Sets `[data-inview="true"]` when element is scrolled into view.

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

#### onMediaQueryWidth

Breakpoint callbacks with matchMedia, based on min-width and max-width conditions.

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

#### searchParams

Update browser history by search params.

```
import { searchParams } from "@simboonlong/utility"

const SearchParams = searchParams();

SearchParams.set({ key: "foo", value: "a" });
// https://example.com/?foo=a

SearchParams.append({ key: "foo", value: "b" });
// https://example.com/?foo=a&foo=b

SearchParams.append({ key: "foo", value: "c" });
// https://example.com/?foo=a&foo=b&foo=c

SearchParams.remove({ key: "foo", value: "b" });
// https://example.com/?foo=a&foo=c

SearchParams.removeAll({ key: "foo" });
// https://example.com/
```

---

#### urlLinkMatched

Scan links and update, when `location.href` URL matched link's href.

```
import { urlLinkMatched } from "@simboonlong/utility"

urlLinkMatched({
  links: document.querySelectorAll("a"),
  callback: (link) => link.classList.add("active"),
});
```

## Extras

#### delay

Async / await timeout.

```
import { delay } from "@simboonlong/utility"

const foo = async () => {
  await delay(1000);
}
```

---

#### binarySearch

Binary search on array.

```
import { binarySearch } from "@simboonlong/utility"

const index = binarySearch([0, 1, 2, 3], 1);
// index returns 1, then do something with index
```

---

#### binarySearchClosest

Binary search closest value on array.

```
import { binarySearchClosest } from "@simboonlong/utility"

const index = binarySearchClosest([0, 1, 2, 3], 1.2);
// index returns 1, then do something with index
```

---

#### inlineAttribute

Apply inline attributes from object.

```
import { inlineAttribute } from "@simboonlong/utility"

const attributes = {
  width: "200px",
  height: "100px",
  style: "color: red; font-size: 12px;",
  "data-custom": "custom",
};
const div = `<div ${inlineAttribute(attributes)}>dummy</div>`;
// <div width="200px" height="100px" style="color: red; font-size: 12px;" data-custom="custom">dummy</div>
```

---

#### inlineStyle

Apply inline styles from object.

```
import { inlineStyle } from "@simboonlong/utility"

const styles = {
  width: "200px",
  height: "100px",
  color: "red",
  "font-size": "12px",
};
const div = `<div style="${inlineStyle(styles)}">dummy</div>`;
// <div style="width: 200px; height: 100px; color: red; font-size: 12px;">dummy</div>
```

Author © [Sim Boon Long](https://simboonlong.com).
