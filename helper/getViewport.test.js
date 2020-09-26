import { getViewport } from './getViewport.js'

test('viewport should get correct width and height values', () => {
  window.innerWidth = 800
  window.innerHeight = 600
  expect(getViewport().w).toBe(800)
  expect(getViewport().h).toBe(600)

  window.innerWidth = 1200
  window.innerHeight = 700
  expect(getViewport().w).toBe(1200)
  expect(getViewport().h).toBe(700)
})
