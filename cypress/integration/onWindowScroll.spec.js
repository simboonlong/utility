describe('scroll', () => {
  it('should show scroll direction correctly', () => {
    const user = cy
    user.visit('/')

    user.scrollTo(0, 100)
    user.findByTestId('scroll').should('have.text', 'down')
    user.scrollTo(0, 50)
    user.findByTestId('scroll').should('have.text', 'up')
  })

  it('should show scroll values, hit most top and bottom correctly', () => {
    const user = cy
    user.visit('/')

    user.scrollTo('bottom')
    user.findByTestId('hit-bottom').should('have.text', 'true')

    user.scrollTo('top')
    user.findByTestId('hit-top').should('have.text', 'true')

    user.scrollTo(0, 200)
    user.findByTestId('hit-between').should('have.text', 200)
  })
})