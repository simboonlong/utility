interface scrollProgressI {
  scrollTopCurr: number;
  decimal?: number;
}

interface scrollProgressItemI extends scrollProgressI {
  element: HTMLElement;
}

export const scrollProgressBody = ({ scrollTopCurr, decimal = 0 }: scrollProgressI): number => {
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = (scrollTopCurr / height) * 100;
  const progress = parseFloat(percent.toFixed(decimal));
  return progress;
}

export const scrollProgressItem = ({ element, scrollTopCurr, decimal = 0 }: scrollProgressItemI): number => {
  const height = element.offsetTop - document.documentElement.clientHeight;
  const percent = ((scrollTopCurr - height) / element.scrollHeight) * 100;
  const progress = parseFloat(percent.toFixed(decimal));

  switch (true) {
    case progress < 0:
      return 0;
    case progress > 100:
      return 100;
    default:
      return progress;
  };
}
