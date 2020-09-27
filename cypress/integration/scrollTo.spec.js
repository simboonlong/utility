describe('scrollTo', () => {
  it('should scroll to y correctly', () => {
    const user = cy
    user.visit('/')

    user.findByTestId('scroll-to-y')
      .click()
    user.findByTestId('hit-between').should('have.text', '1400')
  })

  it('should scroll to most bottom, when endValue is greater than document scroll height', () => {
    const user = cy
    user.visit('/')

    let docScrollHeight
    user.findByTestId('scroll-to-y-infinity')
      .click()
      .wait(1000) // scrollToY duration

    user.document().then((doc) => {
      docScrollHeight = doc.body.scrollHeight
    })

    user.window()
      .then((window) => {
        console.log(window.scrollY, docScrollHeight - window.innerHeight)
        expect(window.scrollY).equal(docScrollHeight - window.innerHeight)
      })
  })
})