export const cookie = () => {
  const getAll = (): Record<string, string> => {
    const cookies = document.cookie.split(";");
    return cookies.reduce((accumulator, item) => {
      const keyValue = item.split("=");
      return {
        ...accumulator,
        [keyValue[0].toString().trimLeft()]: keyValue[1], // need to trim here and not on document cookie level, otherwise document cookie gets mutated
      };
    }, {});
  };

  const get = (name: string) => {
    const allCookies = getAll();
    return allCookies[name];
  };

  const set = ({
    name,
    value,
    daysToExpire,
  }: {
    name: string;
    value: string;
    daysToExpire: number;
  }) => {
    const d = new Date();
    d.setTime(d.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  const removeAll = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/\s+/g, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  };

  return {
    getAll,
    get,
    set,
    removeAll,
  };
};
