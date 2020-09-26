describe('cookie', () => {
  it('cookie should be set and unset correctly', () => {
    const user = cy
    user.visit('/')

    user.findByTestId('cookie-set')
      .click()
    user.findByTestId('cookie').should('have.text', 'abc123')

    user.reload()
    user.findByTestId('cookie').should('have.text', 'abc123')

    user.findByTestId('cookie-unset')
      .click()
    user.findByTestId('cookie').should('have.text', 'undefined')

    user.reload()
    user.findByTestId('cookie').should('have.text', 'undefined')
  })
})