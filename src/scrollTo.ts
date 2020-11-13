import { getViewport } from "./getViewport.js"
import { ease } from "./ease.js"

interface scrollToYI {
  endValue: number;
  duration?: number;
  easeType?: (t: number) => number;
  onComplete?: () => void;
}

export const scrollToY = ({ endValue, easeType, duration, onComplete }: scrollToYI): void => {
  const mostBottomScrollTop = document.body.scrollHeight - getViewport().h

  ease({
    startValue: window.scrollY,
    endValue: endValue >= mostBottomScrollTop ? mostBottomScrollTop : endValue,
    duration: duration,
    easeType: easeType,
    onStep: value => window.scroll(0, value),
    onComplete: onComplete
  })
}
