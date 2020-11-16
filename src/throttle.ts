// extracted from underscore.js
// https://github.com/jashkenas/underscore/blob/master/underscore.js

const now = Date.now || function() {
  return new Date().getTime();
}

interface throttleI {
  func: () => void;
  wait: number;
  options?: {
    leading: boolean;
    trailing: boolean;
  }
}

interface throttledI {
  (): any;
  cancel: () => void;
}

export const throttle = ({
  func,
  wait,
  options = {
    leading: true,
    trailing: true
  }
}: throttleI) => {
  let timeout: any, context: null, args: any, result: void;
  let previous = 0;

  let later = () => {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled = <throttledI>function() {
    let _now = now();
    if (!previous && options.leading === false) previous = _now;
    let remaining = wait - (_now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = () => {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
