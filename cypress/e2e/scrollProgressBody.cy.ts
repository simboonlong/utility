describe("scrollProgressBody", () => {
  it("should show scroll progress on body correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.scrollTo("center");
    user.findByTestId("sp-body").should("have.text", "0.5");
  });
});
