import { waitFor } from "@testing-library/dom";
import { onMediaQueryWidth } from "../src/onMediaQueryWidth";

let mockSize: string;
const mockUpdate = jest.fn((value) => {
  mockSize = value;
});
let mq: any; // eslint-disable-line

beforeAll(() => {
  // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("onMediaQueryWidth", () => {
  beforeEach(() => {
    mq = onMediaQueryWidth({
      breakpoint: {
        0: () => mockUpdate("xs"),
        640: () => mockUpdate("sm"),
        768: () => mockUpdate("md"),
        1024: () => mockUpdate("lg"),
        1280: () => mockUpdate("xl"),
        1536: () => mockUpdate("xxl"),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should callback immediately correctly", async () => {
    onMediaQueryWidth({
      onInit: true,
      breakpoint: {
        0: () => mockUpdate("xs"),
        640: () => mockUpdate("sm"),
        768: () => mockUpdate("md"),
        1024: () => mockUpdate("lg"),
        1280: () => mockUpdate("xl"),
        1536: () => mockUpdate("xxl"),
      },
    });

    await waitFor(() => {
      expect(mockSize).toBe("lg");
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  test("should callback all breakpoints correctly", async () => {
    mq.updateAll();
    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledTimes(6);
    });
  });

  test("should callback at xs correctly", async () => {
    global.innerWidth = 0;
    mq.update();
    await waitFor(() => {
      expect(mockSize).toBe("xs");
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  test("should callback at sm correctly", async () => {
    global.innerWidth = 640;
    mq.update();
    await waitFor(() => {
      expect(mockSize).toBe("sm");
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  test("should callback at md correctly", async () => {
    global.innerWidth = 768;
    mq.update();
    await waitFor(() => {
      expect(mockSize).toBe("md");
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  test("should callback at lg correctly", async () => {
    global.innerWidth = 1024;
    mq.update();
    await waitFor(() => {
      expect(mockSize).toBe("lg");
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  test("should callback at xl correctly", async () => {
    global.innerWidth = 1280;
    mq.update();
    await waitFor(() => {
      expect(mockSize).toBe("xl");
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  test("should callback at xxl correctly", async () => {
    global.innerWidth = 1536;
    mq.update();
    await waitFor(() => {
      expect(mockSize).toBe("xxl");
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });
});
