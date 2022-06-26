import { getByText } from "@testing-library/dom";
import { urlLinkMatched } from "../src/urlLinkMatched";

const getExampleDOM = () => {
  const div = document.createElement("div");

  const link1 = document.createElement("a");
  link1.setAttribute("href", "./");
  link1.innerHTML = "home";

  const link2 = document.createElement("a");
  link2.setAttribute("href", "./about");
  link2.innerHTML = "about";

  div.appendChild(link1);
  div.appendChild(link2);

  return div;
};

test("urlLinkMatch should add class correctly", async () => {
  const className = "active";
  const container = getExampleDOM();
  // console.log(prettyDOM(container));

  urlLinkMatched({
    links: container.querySelectorAll("a"),
    callback: (link) => link.classList.add(className),
  });

  expect(getByText(container, "home").getAttribute("class")).toBe(className);
});
