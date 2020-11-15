import { waitFor } from '@testing-library/dom'
import { ease } from '../src/ease'

test('value should ease and complete correctly', async () => {
  let mockAttribute = 0
  let mockIsComplete = false

  ease({
    startValue: mockAttribute,
    endValue: 100,
    duration: 200,
    onStep: (value) => {
      mockAttribute = value
    },
    onComplete: () => {
      mockIsComplete = true
    }
  })

  await waitFor(() => expect(mockAttribute).toBe(100))
  await waitFor(() => expect(mockIsComplete).toBe(true))
})
