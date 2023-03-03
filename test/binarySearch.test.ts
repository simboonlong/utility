import { binarySearch } from "../src/binarySearch";

describe("binarySearch", () => {
  const arr = [0, 1, 2, 3];

  test("should return 0 correctly", () => {
    const index = binarySearch(arr, 0);
    expect(index).toBe(0);
  });

  test("should return 2 correctly", () => {
    const index = binarySearch(arr, 2);
    expect(index).toBe(2);
  });

  test("should return -1 if not found with positive target", () => {
    const index = binarySearch(arr, 7);
    expect(index).toBe(-1);
  });

  test("should return -1 if not found with negative target", () => {
    const index = binarySearch(arr, -3);
    expect(index).toBe(-1);
  });

  test("should return -1 if not found with decimal target", () => {
    const index = binarySearch(arr, 1.2);
    expect(index).toBe(-1);
  });
});
