"use strict";

const {DEFAULT_COUNT, EXIT_CODE} = require(`../utils/constants`);
const {writeIntoFile, generatePublications} = require(`./utils`);

const run = (count = DEFAULT_COUNT) => {
  const countPublication = Number.parseInt(count, 10);
  const publications = generatePublications(countPublication);

  writeIntoFile(publications, () => {
    console.info(`[${JSON.stringify(publications[0], null, 2)}]`);
    process.exit(EXIT_CODE.success);
  });
};

module.exports = {
  name: `--generate`,
  run,
};
