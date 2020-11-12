const path = require('path');

module.exports = {
   entry: "./dist/es6/index.js",
   output: {
    path: path.resolve(__dirname, "dist/umd"),
    filename: "utility.min.js",
    library: {
      type: "umd",
    },
  },
};
