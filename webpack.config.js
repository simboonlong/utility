/* eslint-disable */
const path = require("path");

module.exports = [
  {
    mode: "production",
    entry: "./dist/es6/index.js",
    output: {
      path: path.resolve(__dirname, "dist/umd"),
      filename: "utility.min.js",
      library: {
        type: "umd",
      },
    },
  },
  {
    mode: "production",
    entry: "./dist/es6/index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "utility.min.js",
      library: {
        type: "umd",
      },
    },
  },
];
