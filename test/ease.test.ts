import { waitFor } from "@testing-library/dom";
import {
  ease,
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
} from "../src/ease";

describe("ease", () => {
  test("should ease values with minimal options correctly", async () => {
    let mockAttribute = 0;

    ease({
      startValue: mockAttribute,
      endValue: 100,
      onStep: (value) => {
        mockAttribute = value;
      },
    });

    await waitFor(() => expect(mockAttribute).toBe(100));
  });

  test("should ease values and callback complete with all options correctly", async () => {
    let mockAttribute = 0;
    let mockIsComplete = false;

    ease({
      startValue: mockAttribute,
      endValue: 100,
      onStep: (value) => {
        mockAttribute = value;
      },
      decimal: 2,
      duration: 200,
      easeType: easeInOutQuint,
      onComplete: () => {
        mockIsComplete = true;
      },
    });

    await waitFor(() => expect(mockAttribute).toBe(100));
    await waitFor(() => expect(mockIsComplete).toBe(true));
  });
});

describe("linear", () => {
  test("should return 5 correctly", () => {
    expect(linear(5)).toBe(5);
  });
});

describe("easeInQuad", () => {
  test("should return 5 correctly", () => {
    expect(easeInQuad(5)).toBe(25);
  });
});

describe("easeOutQuad", () => {
  test("should return 5 correctly", () => {
    expect(easeOutQuad(5)).toBe(-15);
  });
});

describe("easeInOutQuad", () => {
  test("should return -5 correctly", () => {
    expect(easeInOutQuad(-5)).toBe(50);
  });

  test("should return 5 correctly", () => {
    expect(easeInOutQuad(5)).toBe(-31);
  });
});

describe("easeInCubic", () => {
  test("should return 5 correctly", () => {
    expect(easeInCubic(5)).toBe(125);
  });
});

describe("easeOutCubic", () => {
  test("should return 5 correctly", () => {
    expect(easeOutCubic(5)).toBe(65);
  });
});

describe("easeInOutCubic", () => {
  test("should return 5 correctly", () => {
    expect(easeInOutCubic(5)).toBe(257);
  });
});

describe("easeInQuart", () => {
  test("should return 5 correctly", () => {
    expect(easeInQuart(5)).toBe(625);
  });
});

describe("easeOutQuart", () => {
  test("should return 5 correctly", () => {
    expect(easeOutQuart(5)).toBe(-255);
  });
});

describe("easeInOutQuart", () => {
  test("should return -5 correctly", () => {
    expect(easeInOutQuart(-5)).toBe(5000);
  });

  test("should return 5 correctly", () => {
    expect(easeInOutQuart(5)).toBe(-2047);
  });
});

describe("easeInQuint", () => {
  test("should return 5 correctly", () => {
    expect(easeInQuint(5)).toBe(3125);
  });
});

describe("easeOutQuint", () => {
  test("should return 5 correctly", () => {
    expect(easeOutQuint(5)).toBe(1025);
  });
});

describe("easeInOutQuint", () => {
  test("should return 5 correctly", () => {
    expect(easeInOutQuint(5)).toBe(16385);
  });
});
