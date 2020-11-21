describe('ease', () => {
  it('should ease with decimal values', () => {
    const user = cy
    user.visit(Cypress.env('PATH'))

    user.findByTestId('opacity').should('have.text', '0')
    user.findByTestId('ease-to-opacity').click()
    user.wait(500)
    user.findByTestId('opacity').invoke('text').then(parseFloat).should('be.gt', 0.01)
    user.findByTestId('opacity').invoke('text').then(parseFloat).should('be.lt', 0.99)
    user.wait(500)
    user.findByTestId('opacity').should('have.text', '1')
  })
})