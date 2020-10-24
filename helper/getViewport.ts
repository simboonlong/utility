// - http://stackoverflow.com/questions/1766861/find-the-exact-height-and-width-of-the-viewport-in-a-cross-browser-way-no-proto
export const getViewport = (): { w: number, h: number } => {
  let viewPortWidth
  let viewPortHeight
  if (typeof window.innerWidth !== "undefined") {
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    viewPortWidth = window.innerWidth
    viewPortHeight = window.innerHeight
  } else if (typeof document.documentElement !== "undefined" && typeof document.documentElement.clientWidth !== "undefined" && document.documentElement.clientWidth !== 0) {
    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    viewPortWidth = document.documentElement.clientWidth
    viewPortHeight = document.documentElement.clientHeight
  } else {
    // older versions of IE
    viewPortWidth = document.getElementsByTagName("body")[0].clientWidth
    viewPortHeight = document.getElementsByTagName("body")[0].clientHeight
  }
  return { w: viewPortWidth, h: viewPortHeight }
}
