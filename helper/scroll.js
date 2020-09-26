import { getViewport } from './getViewport.js'
import { ease, easeInOutCubic } from './ease.js'

export const scrollToY = ({ endValue, easeType = easeInOutCubic, duration = 1300, onComplete = () => {} }) => {
  const mostBottomTop = document.body.scrollHeight - getViewport().h

  ease({
    startValue: window.scrollY,
    endValue: endValue >= mostBottomTop ? mostBottomTop : endValue,
    duration: duration,
    easeType: easeType,
    onStep: value => window.scroll(0, value),
    onComplete: onComplete
  })
}
