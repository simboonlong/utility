import { searchParams } from "../src/searchParams";

const INITIAL_LOCATION_HREF = location.href;

describe("searchParams", () => {
  afterEach(() => {
    const SearchParams = searchParams();
    SearchParams.removeAll({ key: "foo" });
    SearchParams.removeAll({ key: "bar" });
  });

  test("should append and remove correctly", () => {
    const SearchParams = searchParams();
    SearchParams.set({ key: "foo", value: "a" });
    expect(location.href.includes("?foo=a")).toBe(true);

    SearchParams.append({ key: "foo", value: "b" });
    expect(location.href.includes("?foo=b&foo=a")).toBe(true);

    SearchParams.append({ key: "foo", value: "c" });
    expect(location.href.includes("?foo=c&foo=b&foo=a")).toBe(true);

    SearchParams.remove({ key: "foo", value: "b" });
    expect(location.href.includes("?foo=c&foo=a")).toBe(true);

    SearchParams.removeAll({ key: "foo" });
    expect(location.href).toBe(INITIAL_LOCATION_HREF);
  });

  test("should read search params correctly", () => {
    const SearchParams = searchParams();
    SearchParams.append({ key: "foo", value: "x" });
    SearchParams.append({ key: "bar", value: "y" });
    SearchParams.append({ key: "bar", value: "z" });

    expect(SearchParams.get({ key: "foo" })).toBe("x");
    expect(SearchParams.getAll({ key: "bar" })).toEqual(["z", "y"]);
    expect(SearchParams.has({ key: "foo" })).toBe(true);
  });

  test("should not set repeated search param", () => {
    const SearchParams = searchParams();
    SearchParams.set({ key: "foo", value: "a" });
    SearchParams.set({ key: "foo", value: "a" });
    expect(location.href.includes("?foo=a")).toBe(true);
    expect(location.href.includes("&foo=a")).not.toBe(true);
  });

  test("should not append repeated search param", () => {
    const SearchParams = searchParams();
    SearchParams.append({ key: "foo", value: "a" });
    SearchParams.append({ key: "foo", value: "a" });
    expect(location.href.includes("?foo=a")).toBe(true);
    expect(location.href.includes("&foo=a")).not.toBe(true);
  });

  test("should not remove if search param not exists", () => {
    const SearchParams = searchParams();
    SearchParams.remove({ key: "bar", value: "a" });
    expect(location.href).toBe(INITIAL_LOCATION_HREF);
  });
});
