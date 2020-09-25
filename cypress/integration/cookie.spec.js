describe('cookie', () => {
  it('cookie should be set and unset correctly', () => {
    const user = cy
    user.visit('/')

    user.findByTestId('cookie-set')
      .click()
    user.findByTestId('cookie').should('have.text', 'true')

    user.reload()
    user.findByTestId('cookie').should('have.text', 'true')

    user.findByTestId('cookie-unset')
      .click()
    user.findByTestId('cookie').should('have.text', 'false')

    user.reload()
    user.findByTestId('cookie').should('have.text', 'false')
  })
})