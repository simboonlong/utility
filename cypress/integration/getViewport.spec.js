describe('getViewport', () => {
  it('should show resize values correctly', () => {
    const user = cy
    user.visit(Cypress.env('PATH'))

    user.viewport(1000, 600)
    user.wait(200)
    user.findByTestId('vp-w').should('have.text', '1000')
    user.findByTestId('vp-h').should('have.text', '600')

    user.viewport(1200, 900)
    user.wait(200)
    user.findByTestId('vp-w').should('have.text', '1200')
    user.findByTestId('vp-h').should('have.text', '900')
  })
})