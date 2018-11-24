#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var util = require('util');
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var youtubeInfo = _interopDefault(require('youtube-info'));
var dateDifference = _interopDefault(require('date-difference'));
var os = _interopDefault(require('os'));
var path = _interopDefault(require('path'));
var xml2js = require('xml2js');
var child_process = require('child_process');
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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
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

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
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

var initialState = {
  elapsedSeconds: 0,
  finished: false,
  data: null
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", initialState);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "interval", null);

    return _this;
  }

  _createClass(LoadingScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._startLoading();
    }
  }, {
    key: "_startLoading",
    value: function _startLoading() {
      var _this2 = this;

      this.props.loader().then(this._finishedLoading.bind(this)).catch(function (error) {
        return log('LoadingScreen catch: ' + JSON.stringify(error));
      });
      this.interval = setInterval(function () {
        _this2.setState(LoadingScreen._incrementElapsedSeconds);
      }, 1000);
    }
  }, {
    key: "_finishedLoading",
    value: function _finishedLoading(data) {
      this.setState({
        finished: true,
        data: data
      });
      clearInterval(this.interval);
    }
  }, {
    key: "_reload",
    value: function _reload() {
      this.setState(initialState);

      this._startLoading();
    }
  }, {
    key: "_getLoadingText",
    value: function _getLoadingText() {
      var _this$props$showSecon = this.props.showSeconds,
          showSeconds = _this$props$showSecon === void 0 ? true : _this$props$showSecon;
      var elapsedSeconds = this.state.elapsedSeconds;
      var maxDots = 3;
      var numberOfDots = elapsedSeconds % (maxDots + 1);
      var numberOfSpaces = maxDots - numberOfDots;
      var dots = '.'.repeat(numberOfDots);
      var spaces = ' '.repeat(numberOfSpaces);
      var seconds = showSeconds ? " (".concat(elapsedSeconds, "s)") : '';
      return "Loading".concat(dots).concat(spaces).concat(seconds);
    }
  }, {
    key: "_showChildren",
    value: function _showChildren() {
      var children = this.props.children;
      var data = this.state.data;
      var childrenProps = {
        data: data,
        reload: this._reload.bind(this)
      };
      return React.cloneElement(children, childrenProps);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.finished === true) {
        return this._showChildren();
      }

      var loadingText = this._getLoadingText();

      var width = loadingText.length;
      return React.createElement("box", {
        top: "50%-2",
        left: "center",
        width: width,
        height: 1
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
  loader: PropTypes.func.isRequired
};

var InfoDialog =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InfoDialog, _React$Component);

  function InfoDialog(props, context) {
    var _this;

    _classCallCheck(this, InfoDialog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InfoDialog).call(this, props, context));
    _this._fetchInfo = _this._fetchInfo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(InfoDialog, [{
    key: "_fetchInfo",
    value: function _fetchInfo() {
      var id = this.props.video.id.split(':')[2];
      return youtubeInfo(id);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("box", {
        top: "center",
        left: "center",
        width: 70,
        height: _InfoDialog.infoProps.length + 2,
        border: {
          type: 'line'
        },
        style: {
          border: {
            fg: 'yellow'
          }
        }
      }, React.createElement(LoadingScreen, {
        loader: this._fetchInfo,
        showSeconds: false
      }, React.createElement(_InfoDialog, {
        video: this.props.video,
        data: {}
      })));
    }
  }]);

  return InfoDialog;
}(React.Component);
InfoDialog.propTypes = {
  video: PropTypes.object.isRequired
};

var _InfoDialog =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(_InfoDialog, _React$Component2);

  function _InfoDialog(props, context) {
    var _this2;

    _classCallCheck(this, _InfoDialog);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(_InfoDialog).call(this, props, context));
    _this2._createInfoRow = _this2._createInfoRow.bind(_assertThisInitialized(_assertThisInitialized(_this2)));
    return _this2;
  }

  _createClass(_InfoDialog, [{
    key: "_createInfoRow",
    value: function _createInfoRow(_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          property = _ref2[0],
          betterName = _ref2[1],
          _ref2$ = _ref2[2],
          fn = _ref2$ === void 0 ? function (o) {
        return o;
      } : _ref2$;

      var _this$props = this.props,
          video = _this$props.video,
          data = _this$props.data;

      var info = _objectSpread({}, video, data);

      var label = betterName || property;
      label = label.charAt(0).toUpperCase() + label.slice(1);

      while (label.length < 9) {
        label = ' ' + label;
      }

      var content = fn(info[property]);
      return "".concat(label, ": ").concat(content);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props2 = this.props,
          video = _this$props2.video,
          data = _this$props2.data,
          reload = _this$props2.reload;

      if (!video.id.includes(data.videoId)) {
        reload();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var items = _InfoDialog.infoProps.map(this._createInfoRow);

      return React.createElement("list", {
        items: items
      });
    }
  }], [{
    key: "_formatDuration",
    value: function _formatDuration(seconds) {
      var date = new Date(null);
      date.setSeconds(seconds);
      return date.toISOString().substr(11, 8);
    }
  }, {
    key: "_formatDate",
    value: function _formatDate(pubDate) {
      var date = new Date(pubDate);
      var diff = dateDifference(date, new Date(), {
        compact: true
      });
      var dateString = date.toISOString().substr(0, 19).replace('T', ' ');
      return "".concat(diff, " (").concat(dateString, ")");
    }
  }]);

  return _InfoDialog;
}(React.Component);

_defineProperty(_InfoDialog, "infoProps", [['title'], ['owner', 'uploader'], ['pubDate', 'date', _InfoDialog._formatDate], ['duration', null, _InfoDialog._formatDuration], ['views'], ['likeCount', 'likes'], ['dislikeCount', 'dislikes'], ['url']]);

_InfoDialog.propTypes = {
  video: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

var SearchDialog =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SearchDialog, _React$Component);

  function SearchDialog() {
    _classCallCheck(this, SearchDialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(SearchDialog).apply(this, arguments));
  }

  _createClass(SearchDialog, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          open = _this$props.open,
          onSearch = _this$props.onSearch,
          onCancel = _this$props.onCancel;
      var top = open ? "100%-2" : "100%";
      return React.createElement("box", {
        top: top,
        left: -1,
        width: "100%+2",
        height: 3,
        border: {
          type: 'line'
        },
        style: {
          border: {
            fg: 'green'
          }
        }
      }, "Filter:", React.createElement("textbox", {
        left: 8,
        onSubmit: onSearch,
        onCancel: onCancel,
        inputOnFocus: true,
        focused: open
      }));
    }
  }]);

  return SearchDialog;
}(React.Component);

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
  'i': toggleInfo,
  'f': toggleSearch
};
var onKeyPress = function onKeyPress(_ref) {
  var key = _ref.key,
      args = _objectWithoutProperties(_ref, ["key"]);

  var fn = keyMappings[key];

  if (fn != null) {
    return fn(args);
  } else if (key.charCodeAt(0) === 27) {
    return esc(args);
  }
};
var esc = function esc(_ref2) {
  var resetSearch = _ref2.resetSearch;
  resetSearch();
  return {
    showInfo: false,
    showSearch: false
  };
};

function selectVideo(_ref3) {
  var checked = _ref3.checked,
      current = _ref3.current;
  var newChecked;

  if (checked.indexOf(current) > -1) {
    newChecked = checked.filter(function (i) {
      return i !== current;
    });
  } else {
    newChecked = _toConsumableArray(checked).concat([current]);
  }

  return {
    checked: newChecked
  };
}

function play(_ref4) {
  var data = _ref4.data,
      checked = _ref4.checked,
      setSelected = _ref4.setSelected;
  var selectedVideos = checked.sort(function (a, b) {
    return a - b;
  }).reverse().map(function (index) {
    return data[index];
  });
  playVideos(selectedVideos);
  var maxDate = selectedVideos.map(function (video) {
    return new Date(video.isoDate);
  }).reduce(function (acc, current) {
    return acc > current ? acc : current;
  });
  trySetMostRecent(maxDate).then(setSelected);
}

function playOnly(_ref5) {
  var data = _ref5.data,
      current = _ref5.current;
  var video = data[current];
  playVideos([video]);
}

function setToNow(_ref6) {
  var setSelected = _ref6.setSelected;
  trySetMostRecent(new Date()).then(setSelected);
}

function reload(_ref7) {
  var reload = _ref7.reload;
  reload();
}

function toggleAllNone(_ref8) {
  var videos = _ref8.videos,
      checked = _ref8.checked;
  var checkedVisible = videos.filter(function (_ref9) {
    var i = _ref9.i;
    return checked.includes(i);
  }).length;

  if (checkedVisible) {
    return {
      checked: []
    };
  } else {
    var newChecked = videos.map(function (_ref10) {
      var i = _ref10.i;
      return i;
    }).concat(checked);
    return {
      checked: newChecked
    };
  }
}

function toggleInfo(_ref11) {
  var showInfo = _ref11.showInfo;
  return {
    showInfo: !showInfo
  };
}

function toggleSearch(_ref12) {
  var showSearch = _ref12.showSearch;
  return {
    showSearch: !showSearch
  };
}

var Feed =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Feed, _React$PureComponent);

  function Feed(props, context) {
    var _this;

    _classCallCheck(this, Feed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Feed).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      videos: [],
      checked: [],
      current: 0,
      showInfo: false,
      showSearch: false
    });

    _this._createRow = _this._createRow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onKeyPress = _this._onKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onSelectItem = _this._onSelectItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._setSelected = _this._setSelected.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onSearch = _this._onSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onSearchCancel = _this._onSearchCancel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._resetVideos = _this._resetVideos.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Feed, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._resetVideos();

      this._setSelected();
    }
  }, {
    key: "_getAllVideos",
    value: function _getAllVideos() {
      return this.props.data.map(function (video, i) {
        return {
          i: i,
          video: video
        };
      });
    }
  }, {
    key: "_resetVideos",
    value: function _resetVideos() {
      this.setState({
        videos: this._getAllVideos()
      });
    }
  }, {
    key: "_setSelected",
    value: function _setSelected() {
      var _this2 = this;

      getMostRecent().then(function (mostRecent) {
        _this2.setState(function (state) {
          var checked = state.videos.filter(function (_ref) {
            var video = _ref.video;
            return new Date(video.isoDate) > mostRecent;
          }).map(function (_ref2) {
            var i = _ref2.i;
            return i;
          });
          return {
            checked: checked
          };
        });
      });
    }
  }, {
    key: "_onSelectItem",
    value: function _onSelectItem(item) {
      var index = item.index - 2;
      var videoIndex = this.state.videos[index].i;
      this.setState({
        current: videoIndex
      });
    }
  }, {
    key: "_onKeyPress",
    value: function _onKeyPress(key) {
      var args = _objectSpread({
        key: key,
        setSelected: this._setSelected,
        resetSearch: this._resetVideos
      }, this.props, this.state);

      var newState = onKeyPress(args);
      newState != null && this.setState(newState);
    }
  }, {
    key: "_onSearch",
    value: function _onSearch(query) {
      var _this3 = this;

      var videos = this._getAllVideos().filter(function (_ref3) {
        var video = _ref3.video;
        return _this3._searchMatch(query, video);
      });

      this.setState({
        videos: videos,
        showSearch: false
      });
    }
  }, {
    key: "_searchMatch",
    value: function _searchMatch(query, video) {
      return JSON.stringify(video).toLowerCase().includes(query.toLowerCase());
    }
  }, {
    key: "_onSearchCancel",
    value: function _onSearchCancel() {
      // Order of these calls is important to prevent infinite recursion.
      this.setState({
        showSearch: false
      });

      this._resetVideos();
    }
  }, {
    key: "_createRow",
    value: function _createRow(_ref4) {
      var video = _ref4.video,
          i = _ref4.i;
      var author = video.author,
          title = video.title;
      var check = this.state.checked.includes(i) ? '✔' : ' ';
      return " ".concat(check, " ").concat(author, " - ").concat(title);
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.props.data;
      var _this$state = this.state,
          current = _this$state.current,
          showInfo = _this$state.showInfo,
          showSearch = _this$state.showSearch,
          videos = _this$state.videos;
      var rows = videos.map(this._createRow);
      return React.createElement("element", null, showInfo === true && React.createElement(InfoDialog, {
        video: data[current]
      }), React.createElement("list", {
        items: rows,
        onKeypress: this._onKeyPress,
        onSelectItem: this._onSelectItem,
        style: {
          selected: {
            fg: 'green'
          }
        },
        keys: true,
        vi: true,
        focused: !showSearch
      }), React.createElement(SearchDialog, {
        open: showSearch,
        onSearch: this._onSearch,
        onCancel: this._onSearchCancel
      }));
    }
  }]);

  return Feed;
}(React.PureComponent);
Feed.propTypes = {
  data: PropTypes.array.isRequired
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

var App = function App() {
  return React.createElement(LoadingScreen, {
    loader: getVideos
  }, React.createElement(Feed, {
    data: []
  }));
};

var options = {
  title: 'Termtube',
  autoPadding: true,
  smartCSR: true
};
var run = function run() {
  var screen = blessed.screen(options);
  screen.key(['q', 'C-c'], function () {
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
