"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = void 0;

var _fs = require("fs");

var _util = require("util");

var appendFileAsync = (0, _util.promisify)(_fs.appendFile);

var log = function log(message) {
  var messageString = message;

  if (typeof message !== 'string') {
    messageString = JSON.stringify(message);
  }

  appendFileAsync('termtube.log', "\n".concat(messageString));
};

exports.log = log;