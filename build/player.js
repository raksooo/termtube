"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playVideos = void 0;

var _child_process = require("child_process");

var _configHandler = require("./configHandler");

var playerProcess;

var playVideos = function playVideos(videos) {
  var links = videos.map(function (video) {
    return video.link;
  });
  (0, _configHandler.getVideoPlayer)().then(function (player) {
    playerProcess = (0, _child_process.spawn)(player, links);
    playerProcess.stdout.on('data', function () {});
    playerProcess.stderr.on('data', function () {});
    playerProcess.on('close', function () {
      return playerProcess = null;
    });
  });
};

exports.playVideos = playVideos;