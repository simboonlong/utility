describe("onMediaQuery", () => {
  it("should show xs correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.viewport(320, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "xs");

    user.viewport(639, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "xs");
  });

  it("should show sm correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.viewport(640, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "sm");

    user.viewport(767, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "sm");
  });

  it("should show md correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.viewport(768, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "md");

    user.viewport(1023, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "md");
  });

  it("should show lg correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.viewport(1024, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "lg");

    user.viewport(1279, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "lg");
  });

  it("should show xl correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.viewport(1280, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "xl");

    user.viewport(1535, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "xl");
  });

  it("should show xxl correctly", () => {
    const user = cy;
    user.visit(Cypress.env("PATH"));

    user.viewport(1536, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "xxl");

    user.viewport(1920, 600);
    user.wait(200);
    user.findByTestId("mq").should("contains.text", "xxl");
  });
});
