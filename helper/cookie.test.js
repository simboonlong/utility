import { getCookie, setCookie } from './cookie.js'

test('cookie should be set and unset correctly', () => {
  expect(getCookie('tracker')).toBe(undefined)
  setCookie('tracker', 'abc123', 0.125)
  expect(getCookie('tracker')).toBe('abc123')
  setCookie('tracker', 'abc123', 0)
  expect(getCookie('tracker')).toBe(undefined)
})
