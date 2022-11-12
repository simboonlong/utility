import { throttle } from "./throttle";

interface OnWindowScroll {
  up: (st?: number) => void;
  down: (st?: number) => void;
  top?: () => void;
  between?: (st: number) => void;
  bottom?: () => void;
  throtteRate?: number;
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
    const scrollTopCurr = Math.round(
      document.body.scrollTop || document.documentElement.scrollTop,
    );
    const mostBottomTop = Math.round(
      document.body.scrollHeight - window.innerHeight,
    );

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
        down(scrollTopCurr);
      } else {
        up(scrollTopCurr);
      }
    } catch (error) {
      console.error(error);
    }

    scrollTopPrev = scrollTopCurr < 0 ? 0 : scrollTopCurr;
  };

  window.addEventListener(
    "scroll",
    throttle({ func: onScroll, wait: throtteRate }),
  );
};
