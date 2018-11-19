"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onKeyPress = void 0;

var _player = require("./player");

var _configHandler = require("./configHandler");

var _log = require("./log");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var keyMappings = {
  ' ': selectVideo,
  'p': play,
  'o': playOnly,
  'n': setToNow,
  'r': reload,
  'a': toggleAllNone
};

var onKeyPress = function onKeyPress(_ref) {
  var key = _ref.key,
      args = _objectWithoutProperties(_ref, ["key"]);

  var fn = keyMappings[key];

  if (fn != null) {
    return fn(args);
  }
};

exports.onKeyPress = onKeyPress;

function selectVideo(_ref2) {
  var checked = _ref2.checked,
      current = _ref2.current;
  var checkedIndex = checked.indexOf(current);

  if (checkedIndex > -1) {
    checked.splice(checkedIndex, 1);
  } else {
    checked.push(current);
  }

  return {
    checked: checked
  };
}

function play(_ref3) {
  var videos = _ref3.videos,
      checked = _ref3.checked,
      setSelected = _ref3.setSelected;
  var selectedVideos = checked.sort(function (a, b) {
    return a - b;
  }).reverse().map(function (index) {
    return videos[index];
  });
  (0, _player.playVideos)(selectedVideos);
  var maxDate = selectedVideos.map(function (video) {
    return new Date(video.isoDate);
  }).reduce(function (acc, current) {
    return acc > current ? acc : current;
  });
  (0, _configHandler.trySetMostRecent)(maxDate).then(setSelected);
}

function playOnly(_ref4) {
  var videos = _ref4.videos,
      current = _ref4.current;
  var video = videos[current];
  (0, _player.playVideos)([video]);
}

function setToNow(_ref5) {
  var setSelected = _ref5.setSelected;
  (0, _configHandler.trySetMostRecent)(new Date()).then(setSelected);
}

function reload(_ref6) {
  var reload = _ref6.reload;
  reload();
}

function toggleAllNone(_ref7) {
  var videos = _ref7.videos,
      checked = _ref7.checked;

  if (checked.length > 0) {
    return {
      checked: []
    };
  } else {
    var _checked = videos.map(function (_, index) {
      return index;
    });

    return {
      checked: _checked
    };
  }
}