describe('scroll', () => {
  it('scroll values should be set correctly', () => {
    const user = cy
    user.visit('/')

    user.scrollTo(0, 100)
    user.findByTestId('scroll').should('have.text', 'down')
    user.scrollTo(0, 50)
    user.findByTestId('scroll').should('have.text', 'up')

    user.scrollTo('top')
    user.findByTestId('hit-top').should('have.text', 'true')

    user.scrollTo('bottom')
    user.findByTestId('hit-bottom').should('have.text', 'true')

    user.scrollTo(0, 200)
    user.findByTestId('hit-between').should('have.text', 200)
  })
})