interface scrollProgressBodyI {
  scrollTopCurr: number;
  decimal?: number;
}

interface scrollProgressItemI extends scrollProgressBodyI {
  element: HTMLElement;
}

export const scrollProgressBody = ({ scrollTopCurr, decimal = 0 }: scrollProgressBodyI): number => {
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = (scrollTopCurr / height) * 100;
  const progress = parseFloat(percent.toFixed(decimal));
  return progress;
}

export const scrollProgressItem = ({ element, scrollTopCurr, decimal = 0 }: scrollProgressItemI): number => {
  const offsetTop = element.getBoundingClientRect().top + scrollTopCurr;
  const enterTop = scrollTopCurr + document.documentElement.clientHeight;
  const percent = ((enterTop - offsetTop) / element.scrollHeight) * 100;
  const progress = parseFloat(percent.toFixed(decimal));

  switch (true) {
    case progress < 0:
      return 0;
    case progress > 100:
      return 100;
    default:
      return progress;
  }
}
