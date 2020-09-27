import { getCookie, setCookie, getViewport, onWindowResize, onWindowScroll, scrollToY } from '../index.js'

const updateCookie = () => {
  document.getElementById('cookie').innerText = getCookie('tracker') ?? undefined
}

const updateViewport = () => {
  document.getElementById('vp-w').innerText = getViewport().w
  document.getElementById('vp-h').innerText = getViewport().h
}

document.getElementById('cookie-unset').addEventListener('click', () => {
  setCookie('tracker', 'abc123', 0)
  updateCookie()
})

document.getElementById('cookie-set').addEventListener('click', () => {
  setCookie('tracker', 'abc123', 0.125)
  updateCookie()
})

document.getElementById('scroll-to-y').addEventListener('click', (event) => {
  event.preventDefault()
  scrollToY({ endValue: 1400 })
})

document.getElementById('scroll-to-y-infinity').addEventListener('click', (event) => {
  event.preventDefault()
  scrollToY({ endValue: Infinity })
})

document.getElementById('scroll-to-target').addEventListener('click', (event) => {
  event.preventDefault()
  scrollToY({ endValue: document.getElementById('target').offsetTop })
})

onWindowScroll({
  scrollDown: () => {
    document.getElementById('scroll').innerText = 'down'
  },
  scrollUp: () => {
    document.getElementById('scroll').innerText = 'up'
  },
  hitTop: () => {
    document.getElementById('hit-top').innerText = true
  },
  hitBetween: (st) => {
    document.getElementById('hit-bottom').innerText = false
    document.getElementById('hit-top').innerText = false
    document.getElementById('hit-between').innerText = st
  },
  hitBottom: () => {
    document.getElementById('hit-bottom').innerText = true
  }
}, 75)
onWindowResize(updateViewport, 75)

// init
updateCookie()
updateViewport()
