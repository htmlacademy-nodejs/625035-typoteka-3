"use strict";

const {Cli} = require(`./cli`);

const {
  DEFAULT_COMMAND,
  EXIT_CODE,
  MAX_ITEMS,
  USER_ARGV_INDEX,
} = require(`./utils/constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, userCount] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(EXIT_CODE.failure);
}

if (userCommand === `--generate` && userCount > MAX_ITEMS) {
  console.error(`Не больше 1000 публикацмй`);
  process.exit(EXIT_CODE.failure);
}

Cli[userCommand].run(userCount);
