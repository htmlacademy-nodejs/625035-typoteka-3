"use strict";

const DEFAULT_COMMAND = `--help`;
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_ITEMS = 1000;
const USER_ARGV_INDEX = 2;

const EXIT_CODE = {
  success: 0,
  failure: 1,
};

const DATE_BOUNDARIES = {
  min: (() => {
    const now = new Date();
    now.setMonth(now.getMonth() - 3);
    return now.getTime();
  })(),
  max: new Date().getTime(),
};

const HTTP_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DATE_BOUNDARIES,
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  EXIT_CODE,
  FILE_NAME,
  HTTP_CODE,
  MAX_ITEMS,
  USER_ARGV_INDEX,
};
