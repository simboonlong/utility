import { throttle } from "./throttle"

interface onWindowResizeI {
  resize: () => void;
  throtteRate: number;
}

export const onWindowResize = ({ resize, throtteRate = 50 }: onWindowResizeI): void => {
  const throttled = throttle({ func: resize, wait: throtteRate })
  window.addEventListener("resize", throttled)
}

interface onWindowScrollI {
  up: () => void;
  down: () => void;
  top?: () => void;
  between?: (st: number) => void;
  bottom?: () => void;
  throtteRate: number;
}

export const onWindowScroll = ({ up, down, top, between, bottom, throtteRate = 50 }: onWindowScrollI ): void => {
  let lastScrollTop = 0

  const onScroll = () => {
    const st = document.body.scrollTop || document.documentElement.scrollTop
    const mostBottomTop = document.body.scrollHeight - window.innerHeight

    if (between) {
      between(st)
    }

    if (top && st <= 0) {
      top()
    }

    if (bottom && st >= mostBottomTop) {
      bottom()
    }

    try {
      if (st > lastScrollTop) {
        down()
      } else {
        up()
      }
    } catch (error) {
      throw Error(error)
    }

    lastScrollTop = st < 0 ? 0 : st
  }

  window.addEventListener("scroll", throttle({ func: onScroll, wait: throtteRate }))
}
