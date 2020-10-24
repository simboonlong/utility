// extracted from underscore.js
interface throttleI {
  func: () => void;
  wait: number;
  options?: {
    leading?: boolean;
    trailing?: boolean;
  }
}

export const throttle = ({ func, wait, options }: throttleI): () => void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let context: any, args: any, result: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any = null
  let previous = 0
  if (!options) options = {}
  const later = function () {
    previous = options?.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    const now = Date.now()
    if (!previous && options?.leading === false) previous = now
    const remaining = wait - (now - previous)
    context = func
    // eslint-disable-next-line prefer-rest-params
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options?.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
