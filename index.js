'use strict';

const { getCookie, setCookie } = require('./cookie');
const { getViewport } = require('./getViewport');
const { throttle } = require('./throttle');

module.exports = {
  getCookie,
  setCookie,
  getViewport,
  throttle
}
