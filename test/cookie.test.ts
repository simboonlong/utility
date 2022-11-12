import { cookie } from "../src/cookie";
import { delay } from "../src/delay";

const Cookie = cookie();

describe("cookie", () => {
  afterEach(() => {
    Cookie.removeAll();
  });

  test("should set and unset correctly", () => {
    expect(Cookie.get("tracker")).toBe(undefined);

    Cookie.set({ name: "tracker", value: "abc", daysToExpire: 0.125 });
    expect(Cookie.get("tracker")).toBe("abc");

    Cookie.set({ name: "tracker", value: "abc", daysToExpire: 0 });
    expect(Cookie.get("tracker")).toBe(undefined);
  });

  test("should set blank correctly", () => {
    Cookie.set({ name: "tracker1", value: "abc", daysToExpire: 0.125 });
    Cookie.set({ name: "tracker2", value: "xyz", daysToExpire: 0.125 });
    Cookie.set({ name: "tracker3", value: "", daysToExpire: 0.125 });

    expect(Cookie.get("tracker3")).toBe("");
  });

  test("should get all cookies correctly", () => {
    Cookie.set({ name: "tracker 1", value: "aaa", daysToExpire: 0.125 });
    Cookie.set({ name: "tracker2", value: "bbb", daysToExpire: 0.125 });
    Cookie.set({ name: "tracker_3", value: "ccc", daysToExpire: 0.125 });

    expect(Cookie.getAll()).toStrictEqual({
      "tracker 1": "aaa",
      tracker2: "bbb",
      tracker_3: "ccc",
    });
  });

  test("should expire after 1 second", async () => {
    // 1 day = 86400 seconds
    Cookie.set({ name: "tracker", value: "abc", daysToExpire: 0.00001157407 });
    expect(Cookie.get("tracker")).toBe("abc");
    await delay(1000);
    expect(Cookie.get("tracker")).toBe(undefined);
  });
});
