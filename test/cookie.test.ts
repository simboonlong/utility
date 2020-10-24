import { getCookie, setCookie } from '../helper/cookie'

test('cookie should be set and unset correctly', () => {
  expect(getCookie({ cname: 'tracker' })).toBe(undefined)
  setCookie({ cname: 'tracker', cvalue: 'abc123', exdays: 0.125 })
  expect(getCookie({ cname: 'tracker' })).toBe('abc123')
  setCookie({ cname: 'tracker', cvalue: 'abc123', exdays: 0 })
  expect(getCookie({ cname: 'tracker' })).toBe(undefined)
})
