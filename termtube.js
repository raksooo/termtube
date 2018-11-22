#!/usr/bin/node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var util = require('util');
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var youtubeInfo = _interopDefault(require('youtube-info'));
var os = _interopDefault(require('os'));
var path = _interopDefault(require('path'));
var xml2js = require('xml2js');
var child_process = require('child_process');
var dateDifference = _interopDefault(require('date-difference'));
var Parser = _interopDefault(require('rss-parser'));
var blessed = _interopDefault(require('blessed'));
var reactBlessed = require('react-blessed');
var program = _interopDefault(require('commander'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var appendFileAsync = util.promisify(fs.appendFile);
var log = function log(message) {
  var messageString = message;

  if (typeof message !== 'string') {
    messageString = JSON.stringify(message);
  }

  appendFileAsync('termtube.log', "\n".concat(messageString));
};

var LoadingScreen =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoadingScreen, _React$Component);

  function LoadingScreen() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoadingScreen);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoadingScreen)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      elapsedSeconds: 0,
      finished: false,
      data: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "interval", null);

    return _this;
  }

  _createClass(LoadingScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var promise = this.props.promise;
      promise.then(function (data) {
        return _this2.setState({
          finished: true,
          data: data
        });
      }).catch(log);
      this.interval = setInterval(function () {
        _this2.setState(LoadingScreen._incrementElapsedSeconds);
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "_getLoadingText",
    value: function _getLoadingText() {
      var elapsedSeconds = this.state.elapsedSeconds;
      var maxDots = 3;
      var numberOfDots = elapsedSeconds % (maxDots + 1);
      var numberOfSpaces = maxDots - numberOfDots;
      var dots = '.'.repeat(numberOfDots);
      var spaces = ' '.repeat(numberOfSpaces);
      return "Loading".concat(dots).concat(spaces, " (").concat(elapsedSeconds, "s)");
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _this$state = this.state,
          finished = _this$state.finished,
          data = _this$state.data;

      if (finished === true) {
        return React.cloneElement(children, {
          data: data
        });
      }

      var loadingText = this._getLoadingText();

      var width = loadingText.length;
      return React.createElement("box", {
        top: "center",
        left: "center",
        width: width,
        height: "50"
      }, loadingText);
    }
  }], [{
    key: "_incrementElapsedSeconds",
    value: function _incrementElapsedSeconds(prevState) {
      return {
        elapsedSeconds: prevState.elapsedSeconds + 1
      };
    }
  }]);

  return LoadingScreen;
}(React.Component);
LoadingScreen.propTypes = {
  promise: PropTypes.object.isRequired
};

var InfoDialog =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InfoDialog, _React$Component);

  function InfoDialog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InfoDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InfoDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      info: {}
    });

    return _this;
  }

  _createClass(InfoDialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._fetchInfo();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._fetchInfo();
    }
  }, {
    key: "_fetchInfo",
    value: function _fetchInfo() {
      var _this2 = this;

      var video = this.props.video;
      var info = this.state.info;
      var id = video.id.split(':')[2];

      if (info.videoId === id) {
        return;
      }

      return youtubeInfo(id).then(function (info) {
        return _this2.setState({
          info: info
        });
      });
    }
  }, {
    key: "_createInfoRow",
    value: function _createInfoRow(_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          property = _ref2[0],
          betterName = _ref2[1],
          _ref2$ = _ref2[2],
          fn = _ref2$ === void 0 ? function (o) {
        return o;
      } : _ref2$;

      var info = this.state.info;
      var label = betterName || property;
      label = label.charAt(0).toUpperCase() + label.slice(1);

      while (label.length < 9) {
        label = ' ' + label;
      }

      var data = info[property] == null ? 'Loading...' : fn(info[property]);
      return "".concat(label, ": ").concat(data);
    }
  }, {
    key: "_formatDuration",
    value: function _formatDuration(seconds) {
      var date = new Date(null);
      date.setSeconds(seconds);
      return date.toISOString().substr(11, 8);
    }
  }, {
    key: "render",
    value: function render() {
      var rows = [['title'], ['owner', 'uploader'], ['datePublished', 'date'], ['duration', null, this._formatDuration], ['views'], ['likeCount', 'likes'], ['dislikeCount', 'dislikes'], ['url']];
      return React.createElement("box", {
        top: "center",
        left: "center",
        width: "700",
        height: "450",
        border: {
          type: 'line'
        },
        style: {
          border: {
            fg: 'blue'
          }
        }
      }, React.createElement("list", {
        items: rows.map(this._createInfoRow.bind(this))
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.info.videoId !== props.video.id.split(':')[2]) {
        return {
          info: {}
        };
      }

      return null;
    }
  }]);

  return InfoDialog;
}(React.Component);
InfoDialog.propTypes = {
  video: PropTypes.object.isRequired
};

var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);
var parseXml = util.promisify(xml2js.parseString);
var CONFIG_NAME = 'termtube';
var CONFIG_PATH = path.join(os.homedir(), '.config', CONFIG_NAME);
var CONFIG_KEY_PLAYER = "player";
var CONFIG_KEY_SUBSCRIPTIONS = "subscriptions";
var CONFIG_KEY_MOST_RECENT = "mostRecent";
var getSubscriptions = function getSubscriptions() {
  return readConfig().then(function (config) {
    return config[CONFIG_KEY_SUBSCRIPTIONS];
  });
};
var registerSubscriptions = function registerSubscriptions(filePath) {
  return readFileAsync(filePath).then(parseSubscriptions).then(saveSubscriptions);
};

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
var saveVideoPlayer = function saveVideoPlayer(player) {
  return editConfig({
    player: player
  });
};
var getVideoPlayer = function getVideoPlayer() {
  return readConfig().then(function (config) {
    return config[CONFIG_KEY_PLAYER] || 'mpv';
  });
};

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
var trySetMostRecent = function trySetMostRecent(date) {
  return getMostRecent().then(function (mostRecent) {
    return (mostRecent == null || date > mostRecent) && editConfig({
      mostRecent: date
    });
  });
};

var playerProcess;
var playVideos = function playVideos(videos) {
  var links = videos.map(function (video) {
    return video.link;
  });
  getVideoPlayer().then(function (player) {
    playerProcess = child_process.spawn(player, links);
    playerProcess.stdout.on('data', function () {});
    playerProcess.stderr.on('data', function () {});
    playerProcess.on('close', function () {
      return playerProcess = null;
    });
  });
};

var keyMappings = {
  ' ': selectVideo,
  'p': play,
  'o': playOnly,
  'n': setToNow,
  'r': reload,
  'a': toggleAllNone,
  'i': toggleInfo
};
var onKeyPress = function onKeyPress(_ref) {
  var key = _ref.key,
      args = _objectWithoutProperties(_ref, ["key"]);

  var fn = keyMappings[key];

  if (fn != null) {
    return fn(args);
  }
};

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
  playVideos(selectedVideos);
  var maxDate = selectedVideos.map(function (video) {
    return new Date(video.isoDate);
  }).reduce(function (acc, current) {
    return acc > current ? acc : current;
  });
  trySetMostRecent(maxDate).then(setSelected);
}

function playOnly(_ref4) {
  var videos = _ref4.videos,
      current = _ref4.current;
  var video = videos[current];
  playVideos([video]);
}

function setToNow(_ref5) {
  var setSelected = _ref5.setSelected;
  trySetMostRecent(new Date()).then(setSelected);
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

function toggleInfo(_ref8) {
  var showInfo = _ref8.showInfo;
  return {
    showInfo: !showInfo
  };
}

var Feed =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Feed, _React$Component);

  function Feed(props, context) {
    var _this;

    _classCallCheck(this, Feed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Feed).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      checked: [],
      current: 0,
      showInfo: false
    });

    _this._createRow = _this._createRow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onKeyPress = _this._onKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onSelectItem = _this._onSelectItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._setSelected = _this._setSelected.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Feed, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.data !== nextProps.data || this.state.checked !== nextState.checked || this.state.checked.every(function (item, index) {
        return nextState.checked[index] === item;
      }) || this.state.current !== nextState.current;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setSelected();
    }
  }, {
    key: "_createRow",
    value: function _createRow(video, index) {
      var checked = this.state.checked;
      var author = video.author,
          title = video.title,
          pubDate = video.pubDate;
      var check = checked.includes(index) ? '✔' : ' ';
      var date = dateDifference(new Date(pubDate), new Date(), {
        compact: true
      });
      var datePadding = date.length < 4 ? ' ' : '';
      return " ".concat(check, " ").concat(datePadding).concat(date, " - ").concat(author, " - ").concat(title);
    }
  }, {
    key: "_setSelected",
    value: function _setSelected() {
      var _this2 = this;

      var videos = this.props.data;
      getMostRecent().then(function (mostRecent) {
        var selected = [];
        videos.forEach(function (video, index) {
          if (new Date(video.isoDate) > mostRecent) {
            selected.push(index);
          }
        });

        _this2.setState({
          checked: selected
        });
      });
    }
  }, {
    key: "_onSelectItem",
    value: function _onSelectItem(item) {
      var index = item.index - 3;
      this.setState({
        current: index
      });
    }
  }, {
    key: "_onKeyPress",
    value: function _onKeyPress(key) {
      var _this$props = this.props,
          videos = _this$props.data,
          reload = _this$props.reload;

      var args = _objectSpread({
        videos: videos,
        key: key,
        setSelected: this._setSelected,
        reload: reload
      }, this.state);

      var newState = onKeyPress(args);
      newState != null && this.setState(newState);
    }
  }, {
    key: "render",
    value: function render() {
      var videos = this.props.data;
      var _this$state = this.state,
          checked = _this$state.checked,
          current = _this$state.current,
          showInfo = _this$state.showInfo;
      var rows = videos.map(this._createRow);
      return React.createElement("element", null, showInfo === true && React.createElement(InfoDialog, {
        video: videos[current]
      }), React.createElement("list", {
        items: rows,
        onKeypress: this._onKeyPress,
        onSelectItem: this._onSelectItem,
        style: {
          selected: {
            fg: 'green'
          }
        },
        data: "foo",
        keys: true,
        vi: true,
        focused: true
      }));
    }
  }]);

  return Feed;
}(React.Component);
Feed.propTypes = {
  data: PropTypes.array.isRequired
};

var Main =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, _getPrototypeOf(Main).apply(this, arguments));
  }

  _createClass(Main, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.subscriptionFeed !== nextProps.subscriptionFeed;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          subscriptionFeed = _this$props.subscriptionFeed,
          reload = _this$props.reload;
      return React.createElement("box", {
        top: "center",
        left: "center",
        width: "100%",
        height: "100%",
        border: {
          type: 'line'
        },
        style: {
          border: {
            fg: 'blue'
          }
        }
      }, React.createElement(LoadingScreen, {
        promise: subscriptionFeed
      }, React.createElement(Feed, {
        reload: reload
      })));
    }
  }]);

  return Main;
}(React.Component);
Main.propTypes = {
  subscriptionFeed: PropTypes.object.isRequired
};

var parser = new Parser();
var getVideos = function getVideos() {
  return getSubscriptions().then(parseAllSubscriptions).then(rssContentToVideoList).then(sortByDate); //.then(videos => videos.slice(0, 50))
};

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
  }).flat();
};

var sortByDate = function sortByDate(list) {
  return list.sort(function (a, b) {
    return new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime();
  });
};

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props, context) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      videos: getVideos()
    });

    _this.reload = _this.reload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(App, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.videos !== nextState.videos;
    }
  }, {
    key: "reload",
    value: function reload() {
      this.setState({
        videos: getVideos()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var videos = this.state.videos;
      return React.createElement(Main, {
        subscriptionFeed: videos,
        reload: this.reload
      });
    }
  }]);

  return App;
}(React.Component);

var run = function run() {
  var screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Termtube'
  });
  screen.key(['escape', 'q', 'C-c'], function () {
    return process.exit(0);
  });
  reactBlessed.render(React.createElement(App, null), screen);
};

program.version('0.0.1');
program.command('set').option('-s, --subscriptions <file>', 'XML file with subscriptions').option('-p, --player <player>', 'Player to use when playing videos').action(function (_ref) {
  var subscriptions = _ref.subscriptions,
      player = _ref.player;

  if (subscriptions != null) {
    registerSubscriptions(subscriptions);
  }

  if (player != null) {
    saveVideoPlayer(player);
  }
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  subscriptionsExist().then(function (exist) {
    if (exist === true) {
      run();
    } else {
      program.outputHelp();
    }
  });
}
