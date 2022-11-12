import { onWindowScroll } from "../src/onWindowScroll";

const mockUp = jest.fn();
const mockDown = jest.fn();
const mockBetween = jest.fn();
const mockTop = jest.fn();
const mockBottom = jest.fn();

describe("onWindowScroll", () => {
  beforeEach(() => {
    onWindowScroll({
      up: mockUp,
      down: mockDown,
      between: mockBetween,
      top: mockTop,
      bottom: mockBottom,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // TODO: should separate each test case
  test("should callback on scroll correctly", () => {
    global.dispatchEvent(new Event("scroll"));
    expect(mockUp).toBeCalledTimes(1);
    expect(mockBetween).toBeCalledTimes(1);
    expect(mockTop).toBeCalledTimes(1);
    expect(mockBottom).toBeCalledTimes(1);
  });
});
