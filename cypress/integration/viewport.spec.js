describe('viewport', () => {
  it('viewport resize values should be set correctly', () => {
    const user = cy
    user.visit('/')

    user.viewport(1000, 600)
    user.findByTestId('vp-w').should('have.text', '1000')
    user.findByTestId('vp-h').should('have.text', '600')

    user.viewport(1200, 900)
    user.findByTestId('vp-w').should('have.text', '1200')
    user.findByTestId('vp-h').should('have.text', '900')
  })
})