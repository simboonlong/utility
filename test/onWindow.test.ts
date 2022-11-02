import { onWindowResize, onWindowScroll } from "../src/onWindow";

const mockResize = jest.fn();
const mockUp = jest.fn();
const mockDown = jest.fn();
const mockBetween = jest.fn();
const mockTop = jest.fn();
const mockBottom = jest.fn();

describe("onWindowResize", () => {
  test("should callback on resize correctly", () => {
    onWindowResize({
      resize: mockResize,
    });

    global.dispatchEvent(new Event("resize"));
    expect(mockResize).toBeCalledTimes(1);
  });
});

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
