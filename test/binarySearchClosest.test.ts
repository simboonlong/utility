import { binarySearchClosest } from "../src/binarySearchClosest";

describe("binarySearchClosest", () => {
  const arr = [0, 1, 2, 3];

  test("should return closest 0 correctly", () => {
    const index = binarySearchClosest(arr, 0);
    expect(index).toBe(0);
  });

  test("should return closest decimal downwards correctly", () => {
    const index = binarySearchClosest(arr, 1.5);
    expect(index).toBe(1);
  });

  test("should return closest decimal upwards correctly", () => {
    const index = binarySearchClosest(arr, 1.6);
    expect(index).toBe(2);
  });

  test("should return closest 2 correctly", () => {
    const index = binarySearchClosest(arr, 2);
    expect(index).toBe(2);
  });

  test("should return closest 7 correctly", () => {
    const index = binarySearchClosest(arr, 7);
    expect(index).toBe(3);
  });
});
