'use strict';

const { getCookie, setCookie } = require('./helper/cookie');
const { getViewport } = require('./helper/getViewport');
const { throttle } = require('./helper/throttle');

module.exports = {
  getCookie,
  setCookie,
  getViewport,
  throttle
}
