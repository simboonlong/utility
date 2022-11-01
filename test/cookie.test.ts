import { getCookie, setCookie } from "../src/cookie";

describe("cookie", () => {
  test("should set and unset correctly", () => {
    expect(getCookie({ cname: "tracker" })).toBe(undefined);
    setCookie({ cname: "tracker", cvalue: "abc", exdays: 0.125 });
    expect(getCookie({ cname: "tracker" })).toBe("abc");
    setCookie({ cname: "tracker", cvalue: "abc", exdays: 0 });
    expect(getCookie({ cname: "tracker" })).toBe(undefined);
  });

  test("should set blank correctly", () => {
    setCookie({ cname: "tracker1", cvalue: "abc", exdays: 0.125 });
    setCookie({ cname: "tracker2", cvalue: "xyz", exdays: 0.125 });
    setCookie({ cname: "tracker3", cvalue: "", exdays: 0.125 });
    expect(getCookie({ cname: "tracker3" })).toBe("");
  });
});
