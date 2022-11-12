describe("cookie", () => {
  it("should set correctly, after reload cookie should exist", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.findByTestId("cookie-set").click();
    user.findByTestId("cookie").should("have.text", "Some value");

    user.reload();
    user.findByTestId("cookie").should("have.text", "Some value");
  });

  it("should unset correctly, after reload cookie should not exist", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.findByTestId("cookie-unset").click();
    user.findByTestId("cookie").should("have.text", "undefined");

    user.reload();
    user.findByTestId("cookie").should("have.text", "undefined");
  });
});
