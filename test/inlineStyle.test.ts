import { inlineStyle } from "../src/inlineStyle";

describe("inlineStyle", () => {
  test("should stringify style object to inline correctly", async () => {
    const styles = {
      width: "200px",
      height: "100px",
      color: "red",
      "font-size": "12px",
    };
    const inlineStyles = inlineStyle(styles);
    const div = `<div style="${inlineStyles}">dummy</div>`;
    expect(div).toBe(
      `<div style="width: 200px; height: 100px; color: red; font-size: 12px;">dummy</div>`,
    );
  });
});
