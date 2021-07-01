"use strict";

const fs = require(`fs`).promises;
const {FILE_NAME, HTTP_CODE} = require(`../../utils/constants`);

const NOT_FOUND_MESSAGE_TEXT = `Not found`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const generatePaths = (res) => {
  const paths = new Map();

  paths.set(`/`, async () => {
    try {
      const fileContent = await fs.readFile(FILE_NAME);
      const mocks = JSON.parse(fileContent);
      const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
      sendResponse(res, HTTP_CODE.OK, `<ul>${message}</ul>`);
    } catch (err) {
      sendResponse(res, HTTP_CODE.NOT_FOUND, NOT_FOUND_MESSAGE_TEXT);
    }
  });

  return paths;
};

const onClientConnect = async (req, res) => {
  const {url} = req;

  const paths = generatePaths(res);

  if (!paths.has(url)) {
    sendResponse(res, HTTP_CODE.NOT_FOUND, NOT_FOUND_MESSAGE_TEXT);
  }

  const path = paths.get(url);
  path();
};

module.exports = {
  onClientConnect,
};
