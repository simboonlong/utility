# utility
Some utility functions to use.

## install
`npm i @simboonlong/utility`

---

### setCookie

setCookie('`name`', `value`, `days`);

Example:

```
import { setCookie } from '@simboonlong/utility'

setCookie('isVisited', true, 0.125); // set cookie to 3 hours expiry
setCookie('isVisited', true, 0); // deletes cookie by setting expiry to 0
```

### getCookie

getCookie('`name`');

Example:

```
import { getCookie } from '@simboonlong/utility'

getCookie('isVisited'); // returns true if set
```

### getViewport

Example:

```
import { getViewport } from '@simboonlong/utility'

getViewport().w // returns current viewport width
getViewport().h // returns current viewport height
```

### throttle

throttle(`callBack`, `wait`)

Example:

```
import { getViewport, throttle } from '@simboonlong/utility'

const onWindowResize = () => {
  console.log(getViewport().w, getViewport().h); // returns current viewport dimensions at interval of 100ms
}

const throttled = throttle(onWindowResize, 100);
window.addEventListener('resize', throttled);
```