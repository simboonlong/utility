import { getViewport } from "./getViewport";

interface Option {
  onInit?: boolean;
  breakpoint: {
    [key: number]: () => void;
  };
}

interface MediaQueryWidth {
  update: () => void;
  updateAll: () => void;
}

const optionDefault = {
  onInit: false,
  breakpoint: {
    // unit test to ensure breakpoint order does not matter? should sort
    0: () => {
      console.log("xs");
    },
    640: () => {
      console.log("sm");
    },
    768: () => {
      console.log("md");
    },
    1024: () => {
      console.log("lg");
    },
    1280: () => {
      console.log("xl");
    },
    1536: () => {
      console.log("xxl");
    },
  },
};

const between = (x: number, min: number, max: number) => {
  return x >= min && x < max;
};

export const onMediaQueryWidth = (
  option: Option = optionDefault,
): MediaQueryWidth => {
  const { onInit, breakpoint } = option;
  const breakpoints = Object.keys(breakpoint).map((key) => parseInt(key));
  const callbacks = Object.values(breakpoint);

  Object.entries(breakpoint).forEach(([key, value], index) => {
    const minWidth = key as unknown as number;
    const maxWidth = breakpoints[index + 1] - 1;
    const callback = value;
    const isLast = index === breakpoints.length - 1;

    if (isLast) {
      const conditionLast = `(min-width: ${minWidth}px)`;
      window.matchMedia(conditionLast).onchange = (event) => {
        if (event.matches) {
          callback();
        }
      };
    } else {
      const condition = `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
      window.matchMedia(condition).onchange = (event) => {
        if (event.matches) {
          callback();
        }
      };
    }
  });

  const update = () => {
    const found = breakpoints.find((breakpoint, index) => {
      const x = getViewport().w;
      const min = breakpoint;
      const max =
        index === breakpoints.length - 1 ? Infinity : breakpoints[index + 1];
      return between(x, min, max);
    });
    if (found !== undefined) {
      const cb = breakpoint[found];
      cb();
    }
  };

  const updateAll = () => {
    callbacks.forEach((callback) => callback());
  };

  if (onInit) {
    update();
  }

  return { update, updateAll };
};
