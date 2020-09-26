![CI](https://github.com/simboonlong/utility/workflows/CI/badge.svg?branch=master&event=push) [![Netlify Status](https://api.netlify.com/api/v1/badges/13e83d25-b833-48e5-bc73-bac4e8e32958/deploy-status)](https://app.netlify.com/sites/lucid-ardinghelli-84074a/deploys)

# utility
Some web utility functions to use.

## demo
[https://lucid-ardinghelli-84074a.netlify.app/](https://lucid-ardinghelli-84074a.netlify.app/)

## install
`npm i @simboonlong/utility`

---

### setCookie

setCookie(`name`, `value`, `days`);

Example:

```
import { setCookie } from '@simboonlong/utility'

setCookie('tracker', 'abc123', 0.125); // set cookie to 3 hours expiry
setCookie('tracker', 'abc123', 0); // deletes cookie by setting expiry to 0
```

### getCookie

getCookie(`name`);

Example:

```
import { getCookie } from '@simboonlong/utility'

getCookie('tracker'); // returns cookie's value if set
```

### getViewport

Example:

```
import { getViewport } from '@simboonlong/utility'

getViewport().w // returns current viewport width
getViewport().h // returns current viewport height
```

### onWindowResize

onWindowResize(`callback`, `throtteRate`)

Example:

```
import { onWindowResize } from '@simboonlong/utility'

onWindowResize(() => {
  console.log('window resize')
}, 75) // throtteRate default is 50
```

### onWindowScroll

onWindowScroll(`callback`, `throtteRate`)

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
    console.log(`hit between - handle any custom logic with scrollTop value - ${st}`)
  }, // optional
  hitBottom: () => {
    console.log('hit bottom')
  } // optional
}, 75) // throtteRate default is 50
```
