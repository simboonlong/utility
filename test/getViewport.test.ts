import { getViewport } from '../src/getViewport'

test('viewport should get correct width and height values', () => {
  global.innerWidth = 800
  global.innerHeight = 600
  expect(getViewport().w).toBe(800)
  expect(getViewport().h).toBe(600)

  global.innerWidth = 1200
  global.innerHeight = 700
  expect(getViewport().w).toBe(1200)
  expect(getViewport().h).toBe(700)
})
