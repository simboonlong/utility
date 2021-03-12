// w3s examples
interface GetCookie {
  cname: string;
}

export const getCookie = ({ cname }: GetCookie): string | undefined => {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
};

interface SetCookie {
  cname: string;
  cvalue: string;
  exdays: number;
}

export const setCookie = ({ cname, cvalue, exdays }: SetCookie): void => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
