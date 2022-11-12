interface CookieSet {
  name: string;
  value: string;
  expire: number; // compulsory expire. don't leave to "session", it seems unpredictable in devices/os
  sameSite?: "Lax" | "Strict" | "None";
  secure?: boolean;
}

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

  const set = ({ name, value, expire, sameSite, secure }: CookieSet) => {
    if (location.protocol !== "https:" && secure) {
      console.warn("Unable to set cookie due to non-https protocol detected.");
    }

    const d = new Date();
    d.setTime(d.getTime() + expire * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires};${
      sameSite ? ` SameSite=${sameSite};` : ""
    } ${secure ? " Secure;" : ""} path=/`;
  };

  return {
    getAll,
    get,
    set,
  };
};
