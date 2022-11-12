import { onWindowResize } from "../src/onWindowResize";

const mockResize = jest.fn();

describe("onWindowResize", () => {
  test("should callback on resize correctly", () => {
    onWindowResize({
      resize: mockResize,
    });

    global.dispatchEvent(new Event("resize"));
    expect(mockResize).toBeCalledTimes(1);
  });
});
