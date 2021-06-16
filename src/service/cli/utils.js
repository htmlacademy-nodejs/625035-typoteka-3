"use strict";
const fs = require(`fs`);

const {
  CATEGORIES,
  DATE_BOUNDARIES,
  EXIT_CODE,
  FILE_NAME,
  SENTENCES,
  TITLES,
} = require(`../utils/constants`);
const {getRandomInt, shuffle} = require(`../utils/utils`);

const getFullText = (sentences) => {
  const min = getRandomInt(0, sentences.length - 1);

  return shuffle(sentences).slice(min, getRandomInt(min, sentences.length - 1));
};
const getTitle = () => TITLES[getRandomInt(0, TITLES.length - 1)];
const getDate = () =>
  new Date(
    getRandomInt(DATE_BOUNDARIES.min, DATE_BOUNDARIES.max)
  ).toLocaleDateString();
const getAnnounce = () => getFullText(SENTENCES).slice(0, 4).join(` `);
const getCategory = () => [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]];

const generatePublication = () => ({
  title: getTitle(),
  createdDate: getDate(),
  announce: getAnnounce(),
  fullText: getFullText(SENTENCES).join(` `),
  category: getCategory(),
});

const generatePublications = (count) =>
  Array(count).fill({}).map(generatePublication);

const writeIntoFile = (content, onCompleted) => {
  fs.writeFile(FILE_NAME, JSON.stringify(content), (err) => {
    if (err) {
      process.exit(EXIT_CODE.failure);
    }

    onCompleted();
  });
};

module.exports = {
  writeIntoFile,
  generatePublications,
};
