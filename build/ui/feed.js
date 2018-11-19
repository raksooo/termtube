"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Feed = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _configHandler = require("../configHandler");

var _keypressHelper = require("../keypressHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      current: 0
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
    value: function _createRow(_ref, index) {
      var author = _ref.author,
          title = _ref.title;
      var checked = this.state.checked;
      return " ".concat(checked.includes(index) ? '✔' : ' ', " ").concat(author, " - ").concat(title);
    }
  }, {
    key: "_setSelected",
    value: function _setSelected() {
      var _this2 = this;

      var videos = this.props.data;
      (0, _configHandler.getMostRecent)().then(function (mostRecent) {
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
      var index = item.index - 2;
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
      var _this$state = this.state,
          checked = _this$state.checked,
          current = _this$state.current;
      var args = {
        videos: videos,
        checked: checked,
        current: current,
        key: key,
        setSelected: this._setSelected,
        reload: reload
      };
      var newState = (0, _keypressHelper.onKeyPress)(args);
      newState != null && this.setState(newState);
    }
  }, {
    key: "render",
    value: function render() {
      var videos = this.props.data;
      var _this$props2 = this.props,
          checked = _this$props2.checked,
          current = _this$props2.current;
      var rows = videos.map(this._createRow);
      return _react.default.createElement("list", {
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
      });
    }
  }]);

  return Feed;
}(_react.default.Component);

exports.Feed = Feed;
Feed.propTypes = {
  data: _propTypes.default.array.isRequired
};