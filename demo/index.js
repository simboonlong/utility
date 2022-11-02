/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const pug = require("pug");
const data = require("./data.json");

const options = {
  basedir: `${__dirname}/`,
  pretty: true,
};

const html = pug.renderFile(`${__dirname}/index.pug`, {
  ...options,
  ...data,
});

fs.writeFile(path.join(__dirname, "../public/index.html"), html, (err) => {
  if (err) {
    console.error(err);
  }
});
