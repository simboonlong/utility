// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/
// https://github.com/w3c/IntersectionObserver/tree/master/polyfill

interface inViewI {
  elements: NodeListOf<HTMLDataElement>;
  root?: null | HTMLElement;
  trigger?: "FULL" | "PARTIAL" | "CENTER";
  triggerY?: number; // treated as percentage
  thresholdSteps?: number; // how granular the callbacks are
  isOnce?: boolean;
}

interface inViewOptionsI {
  root: null | HTMLElement;
  rootMargin: string;
  threshold: number[];
}

export const inView = ({
  elements,
  root = null,
  trigger = "FULL",
  triggerY,
  thresholdSteps = 20,
  isOnce = false,
}: inViewI): void => {
  const buildThresholds = () => {
    const thresholds = [];

    for (let i = 1; i <= thresholdSteps; i++) {
      const ratio = i / thresholdSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  };

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      // console.log(entry.intersectionRatio)
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-inview", "true");
      } else {
        if (!isOnce) {
          entry.target.setAttribute("data-inview", "");
        }
      }
    });
  };

  elements.forEach((element) => {
    const elementView = {
      FULL: `0px 0px -${~~element.getBoundingClientRect().height}px 0px`,
      PARTIAL: `0px 0px 0px 0px`,
      CENTER: `0px 0px -50% 0px`,
    };

    const options: inViewOptionsI = {
      root,
      rootMargin: triggerY
        ? `0px 0px -${100 - triggerY}% 0px`
        : elementView[trigger],
      threshold: buildThresholds(),
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(element);
  });
};
