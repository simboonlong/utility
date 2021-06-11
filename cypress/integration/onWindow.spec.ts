describe("onWindowScroll", () => {
  it("should show scroll direction correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.scrollTo(0, 100);
    user.findByTestId("scroll").should("have.text", "↡");
    user.scrollTo(0, 50);
    user.findByTestId("scroll").should("have.text", "↟");
  });

  it("should show scroll values, hit most top and bottom correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.scrollTo("bottom");
    user.findByTestId("hit-bottom").should("have.text", "✓");
    user.findByTestId("hit-top").should("have.text", "✗");

    user.scrollTo("top");
    user.findByTestId("hit-top").should("have.text", "✓");
    user.findByTestId("hit-bottom").should("have.text", "✗");

    user.scrollTo(0, 200);
    user.findByTestId("hit-between").should("have.text", 200);
  });
});
