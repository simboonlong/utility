// TODO: this entire feature should be deprecated to use IntersectionObserver API instead, not gonna write coverage tests for this yet

interface ScrollProgressItem {
  scrollTopCurr: number;
  decimal?: number;
  element: HTMLElement;
}

export const scrollProgressItem = ({
  element,
  scrollTopCurr,
  decimal = 2,
}: ScrollProgressItem): number => {
  const offsetTop = element.getBoundingClientRect().top + scrollTopCurr;
  const enterTop = scrollTopCurr + document.documentElement.clientHeight;
  const percent = (enterTop - offsetTop) / element.scrollHeight;
  const progress = parseFloat(percent.toFixed(decimal));

  switch (true) {
    case progress < 0:
      return 0;
    case progress > 1:
      return 1;
    default:
      return progress;
  }
};
