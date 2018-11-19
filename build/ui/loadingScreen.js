"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingScreen = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _log = require("../log");

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
      }).catch(_log.log);
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
        return _react.default.cloneElement(children, {
          data: data
        });
      }

      var loadingText = this._getLoadingText();

      var width = loadingText.length;
      return _react.default.createElement("box", {
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
}(_react.default.Component);

exports.LoadingScreen = LoadingScreen;
LoadingScreen.propTypes = {
  promise: _propTypes.default.object.isRequired
};