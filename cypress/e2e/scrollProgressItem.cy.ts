describe("scrollProgressItem", () => {
  it("should show full scroll progress on item correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.findByTestId("progress-thumb").scrollIntoView();
    user
      .findByTestId("progress-thumb")
      .should("have.attr", "style")
      .and("include", "width: 100%"); // based on default cypress 1000x660
  });

  it("should show partial scroll progress on item correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.findByTestId("progress-thumb").scrollIntoView({
      offset: {
        top: -300,
        left: 0,
      },
    });
    user
      .findByTestId("progress-thumb")
      .should("have.attr", "style")
      .and("include", "width: 74%"); // based on default cypress 1000x660
  });
});
