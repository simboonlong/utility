import { throttle } from "./throttle.js"

interface onWindowResizeI {
  callback: () => void;
  throtteRate: number;
}

export const onWindowResize = ({ callback, throtteRate = 50 }: onWindowResizeI): void => {
  const onResize = () => {
    callback()
  }

  const throttled = throttle({ func: onResize, wait: throtteRate })
  window.addEventListener("resize", throttled)
}

interface onWindowScrollI {
  callback: {
    hitBetween: (st: number) => void;
    hitTop: () => void;
    hitBottom: () => void;
    scrollDown: () => void;
    scrollUp: () => void;
  };
  throtteRate: number;
}

export const onWindowScroll = ({ callback, throtteRate = 50 }: onWindowScrollI ): void => {
  let lastScrollTop = 0

  const onScroll = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop
    const mostBottomTop = document.body.scrollHeight - window.innerHeight

    if (callback.hitBetween) {
      callback.hitBetween(st)
    }

    if (callback.hitTop && st <= 0) {
      callback.hitTop()
    }

    if (callback.hitBottom && st >= mostBottomTop) {
      callback.hitBottom()
    }

    try {
      if (st > lastScrollTop) {
        callback.scrollDown()
      } else {
        callback.scrollUp()
      }
    } catch (error) {
      throw Error(error)
    }

    lastScrollTop = st < 0 ? 0 : st
  }

  window.addEventListener("scroll", throttle({ func: onScroll, wait: throtteRate }))
}
