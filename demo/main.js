import { getCookie, setCookie, getViewport, onWindowResize, onWindowScroll } from '../helper/index.js'

const updateCookie = () => {
  document.getElementById('cookie').innerText = getCookie('isVisited') ?? false
}

const updateViewport = () => {
  document.getElementById('vp-w').innerText = getViewport().w
  document.getElementById('vp-h').innerText = getViewport().h
}

document.getElementById('cookie-unset').addEventListener('click', () => {
  setCookie('isVisited', true, 0)
  updateCookie()
})

document.getElementById('cookie-set').addEventListener('click', () => {
  setCookie('isVisited', true, 0.125)
  updateCookie()
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
