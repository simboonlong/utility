describe("inView", () => {
  it("should transition in and out", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.findByTestId("inview").should("have.css", "opacity", "0");
    user.findByTestId("inview").scrollIntoView();
    user.findByTestId("inview").should("have.css", "opacity", "1");
    user.scrollTo(0, 0);
    user.findByTestId("inview").should("have.css", "opacity", "0");
  });
});
