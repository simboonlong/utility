import { throttle } from "./throttle";

interface OnWindowResize {
  resize: () => void;
  throtteRate: number;
}

export const onWindowResize = ({
  resize,
  throtteRate = 50,
}: OnWindowResize): void => {
  const throttled = throttle({ func: resize, wait: throtteRate });
  window.addEventListener("resize", throttled);
};

interface OnWindowScroll {
  up: () => void;
  down: () => void;
  top?: () => void;
  between?: (st: number) => void;
  bottom?: () => void;
  throtteRate: number;
}

export const onWindowScroll = ({
  up,
  down,
  top,
  between,
  bottom,
  throtteRate = 50,
}: OnWindowScroll): void => {
  let scrollTopPrev = 0;

  const onScroll = () => {
    const scrollTopCurr =
      document.body.scrollTop || document.documentElement.scrollTop;
    const mostBottomTop = document.body.scrollHeight - window.innerHeight;

    if (between) {
      between(scrollTopCurr);
    }

    if (top && scrollTopCurr <= 0) {
      top();
    }

    if (bottom && scrollTopCurr >= mostBottomTop) {
      bottom();
    }

    try {
      if (scrollTopCurr > scrollTopPrev) {
        down();
      } else {
        up();
      }
    } catch (error) {
      throw Error(error);
    }

    scrollTopPrev = scrollTopCurr < 0 ? 0 : scrollTopCurr;
  };

  window.addEventListener(
    "scroll",
    throttle({ func: onScroll, wait: throtteRate })
  );
};
