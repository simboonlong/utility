export const inlineAttribute = (obj: Record<string, string>) => {
  return Object.keys(obj)
    .map((key) => `${key}="${obj[key]}"`)
    .join(" ");
};
