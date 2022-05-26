describe("search", () => {
  it("should set and remove search params correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.findByTestId("searchparams-set-a").click();
    cy.location().should((loc) => {
      expect(loc.search).to.equal("?foo=a");
    });

    user.findByTestId("searchparams-append-b").click();
    cy.location().should((loc) => {
      expect(loc.search).to.equal("?foo=b&foo=a");
    });

    user.findByTestId("searchparams-remove-a").click();
    cy.location().should((loc) => {
      expect(loc.search).to.equal("?foo=b");
    });

    user.findByTestId("searchparams-remove-all").click();
    cy.location().should((loc) => {
      expect(loc.search).to.equal("");
    });
  });
});
