// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/

interface inViewI {
  elements: NodeListOf<HTMLElement>;
  root?: null | HTMLElement;
  triggerY?: "FULL" | "PARTIAL" | "CENTER";
  triggerYCustom?: number; // treated as percentage
  thresholdSteps?: number; // how granular the callbacks are
  isReverse?: boolean;
}

interface inViewOptionsI {
  root: null | HTMLElement;
  rootMargin: string;
  threshold: number[];
}

export const inView = ({
  elements,
  root = null,
  triggerY = "CENTER",
  triggerYCustom = 0,
  thresholdSteps = 20,
  isReverse = true
}: inViewI): void => {
  const buildThresholds = () => {
    const thresholds = [];

    for (let i = 1; i <= thresholdSteps; i++) {
      const ratio = i / thresholdSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      // console.log(index, entry.intersectionRatio)
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        if (isReverse) {
          entry.target.classList.remove('in-view');
        }
      }
    });
  }

  elements.forEach((element) => {
    const ElementView = {
      FULL: `0px 0px -${element.getBoundingClientRect().height}px 0px`,
      PARTIAL: `0px 0px 0px 0px`,
      CENTER: `0px 0px -50% 0px`,
      CUSTOM: `0px 0px -${100 - triggerYCustom}% 0px`
    }

    const options: inViewOptionsI = {
      root,
      rootMargin: triggerYCustom ? ElementView.CUSTOM : ElementView[triggerY],
      threshold: buildThresholds()
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    observer.observe(element);
  });
}
