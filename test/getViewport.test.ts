import { getViewport } from "../src/getViewport";

describe("viewport", () => {
  test("should get width and height values correctly", () => {
    global.innerWidth = 800;
    global.innerHeight = 600;
    expect(getViewport().w).toBe(800);
    expect(getViewport().h).toBe(600);

    global.innerWidth = 1200;
    global.innerHeight = 700;
    expect(getViewport().w).toBe(1200);
    expect(getViewport().h).toBe(700);
  });
});
