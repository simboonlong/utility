// extracted from underscore.js
// https://github.com/jashkenas/underscore/blob/master/underscore.js

const now =
  Date.now ||
  function () {
    return new Date().getTime();
  };

interface Throttle {
  func: () => void;
  wait: number;
  options?: {
    leading: boolean;
    trailing: boolean;
  };
}

interface Throttled {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (): any;
  cancel: () => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const throttle = ({
  func,
  wait,
  options = {
    leading: true,
    trailing: true,
  },
}: Throttle) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any, context: null, args: any, result: void;
  let previous = 0;

  const later = () => {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = <Throttled>function () {
    const _now = now();
    if (!previous && options.leading === false) previous = _now;
    const remaining = wait - (_now - previous);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    // eslint-disable-next-line prefer-rest-params
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
};
