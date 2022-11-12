// TODO: this entire feature should be deprecated to use IntersectionObserver API instead, not gonna write coverage tests for this yet

interface ScrollProgressBody {
  scrollTopCurr: number;
  decimal?: number;
}

export const scrollProgressBody = ({
  scrollTopCurr,
  decimal = 2,
}: ScrollProgressBody): number => {
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const percent = scrollTopCurr / height;
  const progress = parseFloat(percent.toFixed(decimal));
  return progress;
};
