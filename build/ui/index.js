"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

var _react = _interopRequireDefault(require("react"));

var _blessed = _interopRequireDefault(require("blessed"));

var _reactBlessed = require("react-blessed");

var _main = require("./main");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react.default.createElement(_main.Main, null);
};

var run = function run() {
  var screen = _blessed.default.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Termtube'
  });

  screen.key(['escape', 'q', 'C-c'], function () {
    return process.exit(0);
  });
  (0, _reactBlessed.render)(_react.default.createElement(App, null), screen);
};

exports.run = run;