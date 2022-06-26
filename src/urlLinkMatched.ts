interface UrlLinkMatched {
  links: NodeListOf<HTMLAnchorElement>;
  callback: (link: HTMLAnchorElement) => void;
}

export const urlLinkMatched = ({ links, callback }: UrlLinkMatched): void => {
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) throw new Error("href attribute not defined on anchor element");

    const linkHref = new URL(href, document.baseURI).href;
    if (location.href === linkHref) {
      callback(link);
    }
  });
};
