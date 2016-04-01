/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Matrix = __webpack_require__(1);

	var _Matrix2 = _interopRequireDefault(_Matrix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var logAll = function logAll(first) {
	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	    }

	    console.log('asdfas ' + first + ' asdf ' + rest + '.');
	};

	logAll('a', 'b', 'c');

	document.onload = function () {
	    var myM = new _Matrix2.default(1, 1, 'a');
	    console.log(myM.m = 12);
	};
	var myM = new _Matrix2.default(1, 1, 'a');
	console.log(myM);
	console.log('asdf');
	console.log('asdf');

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Matrix = function () {
	    function Matrix(m, n, filler) {
	        _classCallCheck(this, Matrix);

	        this._m = m;
	        this.n = n;
	        this.filler = filler;
	        this.data = [];

	        for (var i = 0; i < this.m; i++) {
	            this.data[i] = [];
	            for (var j = 0; j < this.n; j++) {
	                this.data[i][j] = this.filler;
	            }
	        }
	    }

	    _createClass(Matrix, [{
	        key: 'getN',
	        value: function getN() {
	            return this.n;
	        }
	    }, {
	        key: 'setEl',
	        value: function setEl(newValue, n, m) {
	            this.data[m][n] = newValue;
	        }
	    }, {
	        key: 'loadFromJSON',
	        value: function loadFromJSON(jsonObj) {
	            var rowBase = 'r_',
	                colBase = 'c_',
	                i = 0,
	                j = 0;

	            while (jsonObj[rowBase + i]) {
	                while (jsonObj[rowBase + i][colBase + j]) {
	                    this.setEl(i, j, jsonObj[rowBase + i][colBase + j]);
	                }
	            }
	        }
	    }, {
	        key: 'm',
	        get: function get() {
	            return this._m;
	        },
	        set: function set(newVal) {
	            this._m = newVal;
	        }
	    }]);

	    return Matrix;
	}();

	exports.default = Matrix;

/***/ }
/******/ ]);