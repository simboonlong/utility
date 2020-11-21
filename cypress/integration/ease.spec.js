describe('ease', () => {
  it('should ease with decimal values', () => {
    const user = cy
    user.visit(Cypress.env('PATH'))

    user.findByTestId('opacity').should('have.text', '0')
    user.findByTestId('ease-to-opacity').click()
    user.wait(300)
    user.findByTestId('opacity').invoke('text').then(parseFloat).should('be.gt', 0.1)
    user.wait(700)
    user.findByTestId('opacity').should('have.text', '1')
  })
})