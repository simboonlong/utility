'use strict';

const { getCookie, setCookie } = require('./helper/cookie');
const { getViewport } = require('./helper/getViewport');
const { onWindowResize, onWindowScroll } = require('./helper/onWindow');
const { throttle } = require('./helper/throttle');

module.exports = {
  getCookie,
  setCookie,
  getViewport,
  onWindowResize,
  onWindowScroll,
  throttle
}
