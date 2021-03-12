import { getViewport } from "./getViewport";
import { ease } from "./ease";

interface ScrollToY {
  endValue: number;
  duration?: number;
  easeType?: (t: number) => number;
  onComplete?: () => void;
}

export const scrollToY = ({
  endValue,
  easeType,
  duration,
  onComplete,
}: ScrollToY): void => {
  const mostBottomScrollTop = document.body.scrollHeight - getViewport().h;

  ease({
    startValue: document.body.scrollTop || document.documentElement.scrollTop,
    endValue: endValue >= mostBottomScrollTop ? mostBottomScrollTop : endValue,
    duration,
    easeType,
    onStep: (value) => window.scroll(0, value),
    onComplete,
  });
};
