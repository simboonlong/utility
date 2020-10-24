export const throttle = ({ func, wait, options }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let context, args, result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timeout = null;
    let previous = 0;
    if (!options)
        options = {};
    const later = function () {
        previous = (options === null || options === void 0 ? void 0 : options.leading) === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    return function () {
        const now = Date.now();
        if (!previous && (options === null || options === void 0 ? void 0 : options.leading) === false)
            previous = now;
        const remaining = wait - (now - previous);
        context = func;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        }
        else if (!timeout && (options === null || options === void 0 ? void 0 : options.trailing) !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};
