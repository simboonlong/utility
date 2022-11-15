import { inlineAttribute } from "../src/inlineAttribute";

describe("inlineAttribute", () => {
  test("should stringify attributes object to inline correctly", async () => {
    const attributes = {
      width: "200px",
      height: "100px",
      style: "color: red; font-size: 12px;",
      "data-custom": "custom",
    };
    const attr = inlineAttribute(attributes);
    const div = `<div ${attr}>dummy</div>`;
    expect(div).toBe(
      `<div width="200px" height="100px" style="color: red; font-size: 12px;" data-custom="custom">dummy</div>`,
    );
  });
});
