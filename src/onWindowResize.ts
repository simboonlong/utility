import { throttle } from "./throttle";

interface OnWindowResize {
  resize: () => void;
  throtteRate?: number;
}

export const onWindowResize = ({
  resize,
  throtteRate = 50,
}: OnWindowResize): void => {
  const throttled = throttle({ func: resize, wait: throtteRate });
  window.addEventListener("resize", throttled);
};
