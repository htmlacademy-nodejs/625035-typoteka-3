"use strict";

const chalk = require(`chalk`);
const {DEFAULT_COUNT, EXIT_CODE} = require(`../utils/constants`);
const {writeIntoFile, generatePublications} = require(`./utils`);

const run = async (count = DEFAULT_COUNT) => {
  try {
    const countPublication = Number.parseInt(count, 10);
    const publications = generatePublications(countPublication);
    await writeIntoFile(publications);

    console.info(chalk.green(`[${JSON.stringify(publications[0], null, 2)}]`));
    process.exit(EXIT_CODE.success);
  } catch (error) {
    process.exit(EXIT_CODE.failure);
  }
};

module.exports = {
  name: `--generate`,
  run,
};
