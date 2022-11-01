import { screen } from "@testing-library/dom";
import { inView } from "../src/inView";

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect,
  root: null,
  thresholds: [0, 0.5, 1],
  rootMargin: "0",
  takeRecords: jest.fn(),
}));

const prepDOM = () => {
  const div = document.createElement("div");
  div.style.height = "1000px";

  const divInView = document.createElement("div");
  divInView.style.height = "100px";
  divInView.setAttribute("data-testid", "inview");
  divInView.setAttribute("data-inview", "");

  document.body.appendChild(div);
  document.body.appendChild(divInView);
};

describe("inView", () => {
  test("should scroll correctly", async () => {
    prepDOM();
    const testDiv = screen.getByTestId("inview");
    expect(testDiv.getAttribute("data-inview")).toEqual("");
    inView({
      elements: document.querySelectorAll("[data-inview]"),
    });
    expect(observe).toHaveBeenCalledTimes(1);
    expect(testDiv.getAttribute("data-inview")).toEqual("false");
  });
});
