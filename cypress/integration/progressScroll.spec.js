describe('progressScroll', () => {
  it('should show scroll progress on body correctly', () => {
    const user = cy
    user.visit(Cypress.env('PATH'))

    user.scrollTo('center')
    user.findByTestId('sp-body').should('have.text', '50%')
  })

  it('should show scroll progress on item correctly', () => {
    const user = cy
    user.visit(Cypress.env('PATH'))

    user.findByTestId('progress-thumb').scrollIntoView()
    user.findByTestId('progress-thumb').invoke('width').should('be.eq', 596.296875) // based on default cypress 1000x660
  })
})