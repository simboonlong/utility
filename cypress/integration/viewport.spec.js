describe('viewport', () => {
  it('should show resize values correctly', () => {
    const user = cy
    user.visit('/')

    user.viewport(1000, 660)
    user.findByTestId('vp-w').should('have.text', '1000')
    user.findByTestId('vp-h').should('have.text', '660')

    user.viewport(1200, 900)
    user.findByTestId('vp-w').should('have.text', '1200')
    user.findByTestId('vp-h').should('have.text', '900')
  })
})