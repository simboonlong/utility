/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require("fs");
const pug = require("pug");
const data = require("./demo/data.json");

const options = {
  basedir: `${__dirname}/demo/`,
  pretty: true,
};

const html = pug.renderFile(`${__dirname}/demo/index.pug`, {
  ...options,
  ...data,
});

fs.writeFile(`${__dirname}/public/index.html`, html, (err) => {
  if (err) {
    console.error(err);
  }
});
