"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trySetMostRecent = exports.getMostRecent = exports.getVideoPlayer = exports.saveVideoPlayer = exports.subscriptionsExist = exports.registerSubscriptions = exports.getSubscriptions = void 0;

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

var _xml2js = require("xml2js");

var _util = require("util");

var _log = require("./log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFileAsync = (0, _util.promisify)(_fs.readFile);
var writeFileAsync = (0, _util.promisify)(_fs.writeFile);
var parseXml = (0, _util.promisify)(_xml2js.parseString);
var CONFIG_NAME = 'termtube';

var CONFIG_PATH = _path.default.join(_os.default.homedir(), '.config', CONFIG_NAME);

var CONFIG_KEY_PLAYER = "player";
var CONFIG_KEY_SUBSCRIPTIONS = "subscriptions";
var CONFIG_KEY_MOST_RECENT = "mostRecent";

var getSubscriptions = function getSubscriptions() {
  return readConfig().then(function (config) {
    return config[CONFIG_KEY_SUBSCRIPTIONS];
  });
};

exports.getSubscriptions = getSubscriptions;

var registerSubscriptions = function registerSubscriptions(filePath) {
  return readFileAsync(filePath).then(parseSubscriptions).then(saveSubscriptions);
};

exports.registerSubscriptions = registerSubscriptions;

var parseSubscriptions = function parseSubscriptions(xml) {
  return parseXml(xml).then(function (o) {
    return o.opml.body[0].outline[0].outline;
  }).then(function (list) {
    return list.map(function (item) {
      return item.$.xmlUrl;
    });
  });
};

var saveSubscriptions = function saveSubscriptions(subscriptions) {
  return editConfig({
    subscriptions: subscriptions
  });
};

var subscriptionsExist = function subscriptionsExist() {
  return readConfig().then(function (config) {
    return config[CONFIG_KEY_SUBSCRIPTIONS] != null && config[CONFIG_KEY_SUBSCRIPTIONS].length > 0;
  });
};

exports.subscriptionsExist = subscriptionsExist;

var saveVideoPlayer = function saveVideoPlayer(player) {
  return editConfig({
    player: player
  });
};

exports.saveVideoPlayer = saveVideoPlayer;

var getVideoPlayer = function getVideoPlayer() {
  return readConfig().then(function (config) {
    return config[CONFIG_KEY_PLAYER] || 'mpv';
  });
};

exports.getVideoPlayer = getVideoPlayer;

var editConfig = function editConfig(patch) {
  return readConfig().then(function (config) {
    return Object.assign(config, patch);
  }).then(function (newConfig) {
    return writeConfig(newConfig);
  });
};

var writeConfig = function writeConfig(newConfig) {
  var json = JSON.stringify(newConfig);
  return writeFileAsync(CONFIG_PATH, json);
};

var readConfig = function readConfig() {
  return readFileAsync(CONFIG_PATH).then(function (config) {
    return JSON.parse(config.toString());
  }).catch(function () {
    return {};
  });
};

var getMostRecent = function getMostRecent() {
  return readConfig().then(function (config) {
    return config[CONFIG_KEY_MOST_RECENT];
  }).then(function (mostRecent) {
    return mostRecent && new Date(mostRecent);
  });
};

exports.getMostRecent = getMostRecent;

var trySetMostRecent = function trySetMostRecent(date) {
  return getMostRecent().then(function (mostRecent) {
    return (mostRecent == null || date > mostRecent) && editConfig({
      mostRecent: date
    });
  });
};

exports.trySetMostRecent = trySetMostRecent;