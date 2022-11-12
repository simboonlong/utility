import { cookie } from "../src/cookie";
import { delay } from "../src/delay";

const Cookie = cookie();

describe("cookie", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation();
  });

  afterEach(() => {
    // remove all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/\s+/g, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  });

  test("should set and unset correctly", () => {
    expect(Cookie.get("tracker")).toBe(undefined);

    Cookie.set({ name: "tracker", value: "abc", expire: 0.125 });
    expect(Cookie.get("tracker")).toBe("abc");

    Cookie.set({ name: "tracker", value: "abc", expire: 0 });
    expect(Cookie.get("tracker")).toBe(undefined);
  });

  test("should set blank correctly", () => {
    Cookie.set({ name: "tracker1", value: "abc", expire: 0.125 });
    Cookie.set({ name: "tracker2", value: "xyz", expire: 0.125 });
    Cookie.set({ name: "tracker3", value: "", expire: 0.125 });

    expect(Cookie.get("tracker3")).toBe("");
  });

  test("should get all cookies correctly", () => {
    Cookie.set({ name: "tracker 1", value: "aaa", expire: 0.125 });
    Cookie.set({ name: "tracker2", value: "bbb", expire: 0.125 });
    Cookie.set({ name: "tracker_3", value: "ccc", expire: 0.125 });

    expect(Cookie.getAll()).toStrictEqual({
      "tracker 1": "aaa",
      tracker2: "bbb",
      tracker_3: "ccc",
    });
  });

  test("should expire after 1 second", async () => {
    // 1 day = 86400 seconds
    Cookie.set({ name: "tracker", value: "abc", expire: 0.00001157407 });
    expect(Cookie.get("tracker")).toBe("abc");
    await delay(1000);
    expect(Cookie.get("tracker")).toBe(undefined);
  });

  test("should warn if secure is set but protocol is http", async () => {
    Cookie.set({ name: "tracker", value: "abc", expire: 0.125, secure: true });
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  test("should set same site correctly", async () => {
    Cookie.set({
      name: "tracker",
      value: "abc",
      expire: 0.125,
      sameSite: "Lax",
    });
    expect(Cookie.get("tracker")).toBe("abc");
  });
});
