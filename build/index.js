module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fadeMillis = 400;
var percBigger = 10;
var zIndexPopup = 1500;

var ImageZoomable = function (_Component) {
  _inherits(ImageZoomable, _Component);

  function ImageZoomable(props) {
    _classCallCheck(this, ImageZoomable);

    var _this = _possibleConstructorReturn(this, (ImageZoomable.__proto__ || Object.getPrototypeOf(ImageZoomable)).call(this, props));

    _this.state = {
      fullScreen: false,
      translateX: 0,
      translateY: 0,
      hqLoaded: false,
      downloadingHq: false
    };

    _this.handlerMouseMove = function (halfScreenX, halfScreenY) {

      if (!_this.state.fullScreen) return false;

      event = event || window.event;

      // store where the mouse was at component mounted
      if (!_this.landingX) _this.landingX = event.pageX;

      if (!_this.landingY) _this.landingY = event.pageY;

      var percFromHalfScreenX = -(halfScreenX - event.pageX) / halfScreenX * 100;
      var percFromHalfScreenY = -(halfScreenY - event.pageY) / halfScreenY * 100;

      _this.setState({
        translateX: _this.newLeft * percFromHalfScreenX / 100,
        translateY: -(_this.newTop * percFromHalfScreenY * 100 / 100) / 100
      });
    };
    return _this;
  }

  _createClass(ImageZoomable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var halfScreenX = window.innerWidth / 2;
      var halfScreenY = window.innerHeight / 2;

      if ('onmousemove' in document.documentElement) document.addEventListener('mousemove', this.handlerMouseMove.bind(this, halfScreenX, halfScreenY));else document.addEventListener('touchmove', this.handlerMouseMove.bind(this, halfScreenX, halfScreenY));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if ('onmousemove' in document.documentElement) document.removeEventListener('mousemove', this.handlerMouseMove);else document.removeEventListener('touchmove', this.handlerMouseMove);
    }
  }, {
    key: 'render',
    value: function render() {

      if (!this.state.fullScreen) {

        var style = {
          display: 'inline-block',
          position: 'relative'
        };

        return _react2.default.createElement(
          'div',
          { style: style, className: 'image-zoomable' },
          this.renderNormal()
        );
      } else {

        var fullScreenContainerStyle = {
          position: 'fixed',
          boxSizing: 'border-box',
          opacity: this.state.hqLoaded ? '1' : '0',
          transition: 'opacity ' + fadeMillis / 1000 + 's ease-in-out',
          zIndex: zIndexPopup,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0
        };

        return _react2.default.createElement(
          'div',
          { className: 'image-zoomable' },
          this.renderNormal(),
          _react2.default.createElement(
            'div',
            { className: 'image-zoomable--fullscreen', style: fullScreenContainerStyle },
            this.renderFullScreen()
          )
        );
      }
    }
  }, {
    key: 'renderNormal',
    value: function renderNormal() {

      var imgStyle = {
        opacity: this.state.hqLoaded ? '0' : '1',
        transition: 'opacity ' + fadeMillis / 1000 + 's ease-in-out',
        maxWidth: '100%'
      };
      return _react2.default.createElement(
        'div',
        { className: 'image-zoomable--normal' },
        _react2.default.createElement('img', { src: this.props.uri, style: imgStyle, onClick: this.toogleZoom.bind(this) })
      );
    }
  }, {
    key: 'renderFullScreen',
    value: function renderFullScreen() {

      var screeRatio = window.innerWidth / window.innerHeight;
      var imgRatio = parseInt(this.props.hqWidth) / parseInt(this.props.hqHeight);

      var newImgWidth = void 0,
          newImgHeight = void 0,
          unitIncrease = void 0;

      // rS > rI ? (iW*sW/iH,sH) : (sW,iH*sW/iW)
      if (screeRatio > imgRatio) {

        newImgWidth = parseInt(this.props.hqWidth) * window.innerHeight / parseInt(this.props.hqHeight);
        newImgHeight = window.innerHeight;
        unitIncrease = window.innerWidth / newImgWidth;
      } else {

        newImgWidth = window.innerWidth;
        newImgHeight = parseInt(this.props.hqHeight) * window.innerWidth / parseInt(this.props.hqHeight);
        unitIncrease = window.innerHeight / newImgHeight;
      }

      newImgWidth = newImgWidth * unitIncrease * (100 + percBigger) / 100;
      newImgHeight = newImgHeight * unitIncrease * (100 + percBigger) / 100;

      // for debug this ratio must be equals to initial imgRatio 
      // let newRatio = newImgWidth / newImgHeight;

      var newLeft = -(newImgWidth - window.innerWidth) / 2;
      var newTop = (newImgHeight - window.innerHeight) / 2;

      if (!this.newLeft) {
        this.newLeft = newLeft;
      }
      if (!this.newTop) {
        this.newTop = newTop;
      }

      var imgStyle = {
        top: -newTop,
        left: newLeft,
        width: newImgWidth,
        height: newImgHeight,
        transform: 'translate(' + this.state.translateX + 'px,' + this.state.translateY + 'px)',
        border: this.props.debug ? '10px solid red' : 'none',
        maxWidth: 'none',
        position: 'absolute',
        right: 0,
        zIndex: zIndexPopup,
        willChange: 'transform',
        boxSizing: 'border-box'
      };

      return _react2.default.createElement('img', { onClick: this.toogleZoom.bind(this), ref: 'imgFullScreen', style: imgStyle, src: this.props.uriHD, onLoad: this.handleImageLoaded.bind(this) });
    }
  }, {
    key: 'handleImageLoaded',
    value: function handleImageLoaded() {
      this.setState({ hqLoaded: true, downloadingHq: false });
    }
  }, {
    key: 'toogleZoom',
    value: function toogleZoom() {
      var _this2 = this;

      var tapToExit = this.state.fullScreen;

      if (!this.state.fullScreen) {
        this.setState({
          fullScreen: true,
          downloadingHq: true
        });
      } else {
        this.setState({ hqLoaded: false });
        setTimeout(function () {
          _this2.setState({ fullScreen: false });
        }, fadeMillis);
      }
    }
  }]);

  return ImageZoomable;
}(_react.Component);

exports.default = ImageZoomable;

/***/ })
/******/ ]);