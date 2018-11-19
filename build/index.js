"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _index = require("./ui/index");

var _configHandler = require("./configHandler");

var _log = require("./log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version('0.0.1');

_commander.default.command('set').option('-s, --subscriptions <file>', 'XML file with subscriptions').option('-p, --player <player>', 'Player to use when playing videos').action(function (_ref) {
  var subscriptions = _ref.subscriptions,
      player = _ref.player;

  if (subscriptions != null) {
    (0, _configHandler.registerSubscriptions)(subscriptions);
  }

  if (player != null) {
    (0, _configHandler.saveVideoPlayer)(player);
  }
});

_commander.default.parse(process.argv);

if (!process.argv.slice(2).length) {
  (0, _configHandler.subscriptionsExist)().then(function (exist) {
    if (exist === true) {
      (0, _index.run)();
    } else {
      _commander.default.outputHelp();
    }
  });
}