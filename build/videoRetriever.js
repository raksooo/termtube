"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideos = void 0;

var _rssParser = _interopRequireDefault(require("rss-parser"));

var _configHandler = require("./configHandler");

var _log = require("./log.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = new _rssParser.default();

var getVideos = function getVideos() {
  return (0, _configHandler.getSubscriptions)().then(parseAllSubscriptions).then(rssContentToVideoList).then(sortByDate); //.then(videos => videos.slice(0, 50))
};

exports.getVideos = getVideos;

var parseAllSubscriptions = function parseAllSubscriptions(subscriptions) {
  var promises = subscriptions.map(function (subscription) {
    return parser.parseURL(subscription).catch(function () {
      return null;
    });
  });
  return Promise.all(promises);
};

var rssContentToVideoList = function rssContentToVideoList(content) {
  return content.filter(function (feed) {
    return feed != null;
  }).map(function (feed) {
    return feed.items;
  }).reduce(function (accumulator, current) {
    return accumulator.concat(current);
  }, []);
};

var sortByDate = function sortByDate(list) {
  return list.sort(function (a, b) {
    return new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime();
  });
};