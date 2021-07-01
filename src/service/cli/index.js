"use strict";

const generate = require(`./generate`);
const help = require(`./help`);
const server = require(`./server`);
const version = require(`./version`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
};

module.exports = {
  Cli,
};
