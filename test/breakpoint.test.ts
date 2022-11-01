import { breakpoint } from "../src/breakpoint";

describe("breakpoint", () => {
  test("should be following tailwind v3 screen values correctly", () => {
    expect(breakpoint.xs).toBe(0);
    expect(breakpoint.sm).toBe(640);
    expect(breakpoint.md).toBe(768);
    expect(breakpoint.lg).toBe(1024);
    expect(breakpoint.xl).toBe(1280);
    expect(breakpoint.xxl).toBe(1536);
  });
});
