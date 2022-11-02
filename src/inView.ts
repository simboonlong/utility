import { getViewport } from "./getViewport";

interface IntersectionObserverOptions {
  root: null | HTMLElement;
  rootMargin: string;
  threshold: number | number[];
}

enum Trigger {
  PARTIAL = "PARTIAL",
  FULL = "FULL",
  WITHIN = "WITHIN",
  CENTER = "CENTER",
}

interface InView {
  elements: NodeListOf<HTMLDataElement>;
  trigger?: Trigger;
  isOnce?: boolean;
  isGuides?: boolean;
}

/* istanbul ignore next  */
const getValue = (value: string, total: number) => {
  return value.includes("px")
    ? parseInt(value)
    : (parseInt(value) / 100) * total;
};

/* istanbul ignore next  */
const getValueInverse = (value: string, total: number) => {
  return value.includes("px")
    ? parseInt(value) > 0
      ? -Math.abs(parseInt(value))
      : Math.abs(parseInt(value))
    : (parseInt(value) / 100) * total > 0
    ? -Math.abs((parseInt(value) / 100) * total)
    : Math.abs((parseInt(value) / 100) * total);
};

/* istanbul ignore next  */
const initGuides = (index: number, rootMargin: string) => {
  const rootMarginArray = rootMargin.split(" ");
  const top = rootMarginArray[0];
  const right = rootMarginArray[1];
  const bottom = rootMarginArray[2];
  const left = rootMarginArray[3];

  const trueTop = getValueInverse(top, getViewport().h);
  const trueLeft = getValueInverse(left, getViewport().w);

  const width =
    getViewport().w +
    getValue(left, getViewport().w) +
    getValue(right, getViewport().w);

  const height =
    getViewport().h +
    getValue(top, getViewport().h) +
    getValue(bottom, getViewport().h);

  const guide = document.createElement("div");
  guide.setAttribute("data-inview-guide", `${index}`);
  guide.setAttribute(
    "style",
    `pointer-events: none; position: fixed; z-index: 100; border: dashed 2px red; top: ${trueTop}px; left: ${trueLeft}px; width: ${width}px; height: ${height}px;`,
  );
  document.body.appendChild(guide);
};

export const inView = ({
  elements,
  trigger = Trigger.FULL,
  isOnce = false,
  isGuides = false,
}: InView): void => {
  /* istanbul ignore next  */
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-inview", "true");
      } else {
        if (!isOnce) {
          entry.target.setAttribute("data-inview", "false");
        }
      }
    });
  };

  elements.forEach((element, index) => {
    element.setAttribute("data-inview", "false");

    const rootMargin = {
      PARTIAL: `0px 0px 0px 0px`,
      FULL: `${~~element.getBoundingClientRect().height}px 0px 0px 0px`,
      WITHIN: `0px 0px 0px 0px`,
      CENTER: `${~~element.getBoundingClientRect().height / 2}px 0px -50% 0px`,
    };

    const threshold = {
      PARTIAL: 0,
      FULL: 1,
      WITHIN: 1,
      CENTER: 0.5,
    };

    const options: IntersectionObserverOptions = {
      root: null,
      rootMargin: rootMargin[trigger],
      threshold: threshold[trigger],
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(element);

    /* istanbul ignore next  */
    // initGuides is an easter egg for internal use only
    if (isGuides) {
      initGuides(index, rootMargin[trigger]); // helper only works on init, not responsive
    }
  });
};
