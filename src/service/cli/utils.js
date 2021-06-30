"use strict";
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {DATE_BOUNDARIES, FILE_NAME} = require(`../utils/constants`);
const {getRandomInt, shuffle} = require(`../utils/utils`);

const getFullText = (sentences) => {
  const min = getRandomInt(0, sentences.length - 1);

  return shuffle(sentences).slice(min, getRandomInt(min, sentences.length - 1));
};

const getAnnounce = (sentences) => getFullText(sentences).slice(0, 4).join(` `);
const getCategory = (categories) => [
  categories[getRandomInt(0, categories.length - 1)],
];
const getDate = () =>
  new Date(
    getRandomInt(DATE_BOUNDARIES.min, DATE_BOUNDARIES.max)
  ).toLocaleDateString();
const getTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const generatePublication = (sentences, titles, categories) => ({
  announce: getAnnounce(sentences),
  category: getCategory(categories),
  createdDate: getDate(),
  fullText: getFullText(sentences).join(` `),
  title: getTitle(titles),
});

const generatePublications = (count, sentences, titles, categories) =>
  Array(count)
    .fill({})
    .map(() => generatePublication(sentences, titles, categories));

const writeIntoFile = async (content) => {
  try {
    await fs.writeFile(FILE_NAME, JSON.stringify(content));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    throw err;
  }
};

module.exports = {
  writeIntoFile,
  generatePublications,
};
