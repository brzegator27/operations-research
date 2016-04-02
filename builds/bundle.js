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

	var _DualProblemInputFileField = __webpack_require__(1);

	var _OptimizationProblemReader = __webpack_require__(4);

	var _OptimizationProblem = __webpack_require__(12);

	var _Matrix = __webpack_require__(5);

	var _Matrix2 = _interopRequireDefault(_Matrix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onload = function () {
	    var dualProblemInput = new _DualProblemInputFileField.DualProblemInputFileField(function (jsonObj) {
	        console.log(jsonObj);

	        var opPrReader = new _OptimizationProblemReader.OptimizationProblemReader(),
	            dualProblem = opPrReader.getPrimeProblemFromJsonDataObj(jsonObj);
	        console.log(dualProblem);
	    }),
	        dualProblemDivContainer = document.getElementById('dual-problem-container');

	    console.log(dualProblemDivContainer);
	    dualProblemInput.render(dualProblemDivContainer);
	};
	// const logAll = (first, ...rest) => {
	//     console.log(`asdfas ${first} asdf ${rest}.`);
	// };
	//
	// logAll('a', 'b', 'c');
	//
	// import Matrix from './lib/math/Matrix.js';
	// document.onload = function () {
	//     var myM = new Matrix(1, 1, 'a');
	//     console.log(myM.m = 12);
	// };
	// var myM = new Matrix(1, 1, 'a');
	// console.log(myM);
	// console.log('asdf');
	// console.log('asdf');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DualProblemInputFileField = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _JsonFileField = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var buttonElSymbol = Symbol('buttonEl'),
	    jsonFileFieldSymbol = Symbol('jsonFileField'),
	    buttonOnclickCallbackSymbol = Symbol('buttonOnclickCallback');

	var DualProblemInputFileField = exports.DualProblemInputFileField = function () {
	    function DualProblemInputFileField(buttonOnclickCallback) {
	        _classCallCheck(this, DualProblemInputFileField);

	        this[buttonElSymbol] = null;
	        this[jsonFileFieldSymbol] = new _JsonFileField.JsonFileField();
	        this[buttonOnclickCallbackSymbol] = buttonOnclickCallback;
	    }

	    _createClass(DualProblemInputFileField, [{
	        key: 'render',
	        value: function render(node) {
	            var _this = this;

	            var jsonFileField = this[jsonFileFieldSymbol],
	                buttonEl = document.createElement('BUTTON'),
	                buttonTextEl = document.createTextNode('Solve Problem');

	            buttonEl.appendChild(buttonTextEl);
	            buttonEl.onclick = function () {
	                jsonFileField.getJsonObj(_this[buttonOnclickCallbackSymbol]);
	            };

	            jsonFileField.render(node);
	            node.appendChild(buttonEl);

	            this[buttonElSymbol] = buttonEl;
	        }
	    }, {
	        key: 'lastReadJsonObj',
	        get: function get() {
	            return this[jsonFileFieldSymbol].lastReadJsonObj;
	        }
	    }, {
	        key: 'buttonOnclickCallback',
	        set: function set(buttonOnclickCallback) {
	            this[buttonOnclickCallbackSymbol] = buttonOnclickCallback;
	        }
	    }]);

	    return DualProblemInputFileField;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.JsonFileField = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TypeChecker = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var fileInputDomElSymbol = Symbol('fileInputDomEl');
	var lastReadJsonObjSymbol = Symbol('lastReadJsonObj');

	var JsonFileField = exports.JsonFileField = function () {
	    function JsonFileField() {
	        _classCallCheck(this, JsonFileField);

	        this[fileInputDomElSymbol] = null;
	        this[lastReadJsonObjSymbol] = null;
	    }

	    _createClass(JsonFileField, [{
	        key: 'render',
	        value: function render(node) {
	            var fileInput = document.createElement('INPUT');
	            fileInput.setAttribute('type', 'file');
	            node.appendChild(fileInput);

	            this[fileInputDomElSymbol] = fileInput;
	        }
	    }, {
	        key: 'getJsonObj',
	        value: function getJsonObj(callback) {
	            var fileInput = this[fileInputDomElSymbol],
	                file = fileInput.files[0],
	                fileReader = new window.FileReader();

	            if (!file) {
	                return null;
	            }

	            fileReader.onloadend = function () {
	                var jsonRawData = fileReader.result,
	                    jsonRawDataStr = jsonRawData.toString(),
	                    jsonObj = JSON.parse(jsonRawDataStr);

	                this[lastReadJsonObjSymbol] = jsonObj;
	                console.log(jsonObj);

	                if (_TypeChecker.TypeChecker.isFunction(callback)) {
	                    callback(jsonObj);
	                }
	            };

	            fileReader.readAsText(file);
	        }
	    }, {
	        key: 'lastReadJsonObj',
	        get: function get() {
	            return this[lastReadJsonObjSymbol];
	        }
	    }]);

	    return JsonFileField;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TypeChecker = exports.TypeChecker = function () {
	    function TypeChecker() {
	        _classCallCheck(this, TypeChecker);
	    }

	    _createClass(TypeChecker, null, [{
	        key: 'isFunction',
	        value: function isFunction(functionToCheck) {
	            var getType = {};
	            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	        }
	    }]);

	    return TypeChecker;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OptimizationProblemReader = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Matrix = __webpack_require__(5);

	var _Matrix2 = _interopRequireDefault(_Matrix);

	var _OptimizationProblem = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//     "main_equation_system_left": {
	//     "main_equation_system_right": {
	//     "main_equation_system_operators": {
	//     "obj_fun": {
	//     "obj_fun_destination": "min"

	var OptimizationProblemReader = exports.OptimizationProblemReader = function () {
	    function OptimizationProblemReader() {
	        _classCallCheck(this, OptimizationProblemReader);
	    }

	    _createClass(OptimizationProblemReader, [{
	        key: 'getPrimeProblemFromJsonDataObj',
	        value: function getPrimeProblemFromJsonDataObj(jsonObj) {
	            var eqSysLeft = jsonObj.main_equation_system_left,
	                eqSysRight = jsonObj.main_equation_system_right,
	                eqSysOperators = jsonObj.main_equation_system_operators,
	                objectiveFn = jsonObj.objective_fun,
	                destination = jsonObj.obj_fun_destination,
	                eqSysLeftMatrix = new _Matrix2.default(eqSysLeft),
	                eqSysRightMatrix = new _Matrix2.default(eqSysRight),
	                eqSysOperatorsMatrix = new _Matrix2.default(eqSysOperators),
	                objectiveFnMatrix = new _Matrix2.default(objectiveFn);

	            return new _OptimizationProblem.OptimizationProblem(eqSysLeftMatrix, eqSysRightMatrix, eqSysOperatorsMatrix, objectiveFnMatrix, destination);
	        }
	    }], [{
	        key: 'getDualProblemFromJsonDataObj',
	        value: function getDualProblemFromJsonDataObj(JsonObj) {}
	    }]);

	    return OptimizationProblemReader;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _MatrixFixedDimensionChangeException = __webpack_require__(6);

	var _MatrixAlreadyInstantiatedException = __webpack_require__(8);

	var _MatrixBadDimensionsException = __webpack_require__(9);

	var _MatrixOutOfBoundsException = __webpack_require__(10);

	var _BadParamException = __webpack_require__(11);

	var _TypeChecker = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var mSymbol = Symbol('m'),
	    nSymbol = Symbol('n'),
	    dataSymbol = Symbol('data'),
	    fillerSymbol = Symbol('filler');

	var Matrix = function () {
	    function Matrix(m, n, filler) {
	        _classCallCheck(this, Matrix);

	        if (arguments.length === 1) {
	            this.createMatrixFromDataObj(m);
	            return;
	        }

	        if (!m || !n) {
	            this.setBasicMatrixParams(m, n, filler);
	            return;
	        }

	        this.crateEmptyMatrix(m, n, filler);
	    }

	    _createClass(Matrix, [{
	        key: 'beforeCreate',
	        value: function beforeCreate() {
	            if (this[mSymbol] === null || this[mSymbol] === undefined) {
	                return;
	            }

	            throw new _MatrixAlreadyInstantiatedException.MatrixAlreadyInstantiatedException();
	        }
	    }, {
	        key: 'setBasicMatrixParams',
	        value: function setBasicMatrixParams(m, n, filler) {
	            if (!m || !n) {
	                throw new _MatrixBadDimensionsException.MatrixBadDimensionsException();
	            }

	            this[mSymbol] = m;
	            this[nSymbol] = n;
	            this[fillerSymbol] = filler ? filler : 0;
	            this[dataSymbol] = null;
	        }
	    }, {
	        key: 'crateEmptyMatrix',
	        value: function crateEmptyMatrix(m, n, filler) {
	            this.beforeCreate();
	            this.setBasicMatrixParams(m, n, filler);

	            this[dataSymbol] = new Array(m);
	            for (var i = 0; i < m; i++) {
	                this[dataSymbol][i] = new Array(n);
	                for (var j = 0; j < n; j++) {
	                    this[dataSymbol][i][j] = filler;
	                }
	            }
	        }
	    }, {
	        key: 'createMatrixFromDataObj',
	        value: function createMatrixFromDataObj(dataObj, filler) {
	            this.beforeCreate();

	            var m = dataObj.m,
	                n = dataObj.n,
	                rowBase = 'r_',
	                colBase = 'c_';

	            this.setBasicMatrixParams(m, n, filler);

	            this[dataSymbol] = new Array(m);
	            for (var i = 0; i < m; i++) {
	                this[dataSymbol][i] = new Array(n);
	                for (var j = 0; j < n; j++) {
	                    this[dataSymbol][i][j] = dataObj[rowBase + (i + 1)][colBase + (j + 1)];
	                }
	            }
	        }
	    }, {
	        key: 'rowTransformByFn',
	        value: function rowTransformByFn(rowNo, fn) {
	            if (rowNo < 0 || rowNo > this[mSymbol]) {
	                throw new _MatrixOutOfBoundsException.MatrixOutOfBoundsException();
	            }

	            if (!_TypeChecker.TypeChecker.isFunction(fn)) {
	                throw new _BadParamException.BadParamException();
	            }

	            this[dataSymbol][rowNo].forEach(function (item, idx) {
	                fn(item, idx);
	            });
	        }
	    }, {
	        key: 'transpose',
	        value: function transpose() {
	            // TODO
	            // Add exception
	            if (this[mSymbol] === null || this[mSymbol] === undefined) {
	                return;
	            }

	            var oldM = this[mSymbol],
	                oldN = this[nSymbol],
	                oldMatrixData = this[dataSymbol];

	            this[mSymbol] = oldM;
	            this[nSymbol] = oldN;
	            this[dataSymbol] = new Array(oldN);

	            for (var i = 0; i < oldN; i++) {
	                this[dataSymbol][i] = new Array(oldM);
	                for (var j = 0; j < oldM; j++) {
	                    this[dataSymbol][i][j] = oldMatrixData[j][i];
	                }
	            }

	            return this;
	        }
	    }, {
	        key: 'setEl',
	        value: function setEl(newValue, m, n) {
	            this[dataSymbol][m][n] = newValue;
	        }
	    }, {
	        key: 'm',
	        get: function get() {
	            return this[mSymbol];
	        },
	        set: function set(newValue) {
	            throw new _MatrixFixedDimensionChangeException.MatrixFixedDimensionChangeException();
	        }
	    }, {
	        key: 'n',
	        get: function get() {
	            return this[nSymbol];
	        },
	        set: function set(newValue) {
	            throw new _MatrixFixedDimensionChangeException.MatrixFixedDimensionChangeException();
	        }
	    }]);

	    return Matrix;
	}();

	exports.default = Matrix;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MatrixFixedDimensionChangeException = undefined;

	var _AbstractException2 = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MatrixFixedDimensionChangeException = exports.MatrixFixedDimensionChangeException = function (_AbstractException) {
	    _inherits(MatrixFixedDimensionChangeException, _AbstractException);

	    function MatrixFixedDimensionChangeException(specialMsg) {
	        _classCallCheck(this, MatrixFixedDimensionChangeException);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatrixFixedDimensionChangeException).call(this, specialMsg));
	    }

	    return MatrixFixedDimensionChangeException;
	}(_AbstractException2.AbstractException);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var msgSymbol = Symbol('msg'),
	    descriptionSymbol = Symbol('description');

	var AbstractException = exports.AbstractException = function () {
	    function AbstractException(specialMsg) {
	        _classCallCheck(this, AbstractException);

	        this[msgSymbol] = specialMsg ? specialMsg : '';
	        this[descriptionSymbol] = 'You cannot re-instantiate matrix.';
	    }

	    _createClass(AbstractException, [{
	        key: 'description',
	        get: function get() {
	            return this[msgSymbol] + ' ' + this[descriptionSymbol];
	        }
	    }]);

	    return AbstractException;
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MatrixAlreadyInstantiatedException = undefined;

	var _AbstractException2 = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MatrixAlreadyInstantiatedException = exports.MatrixAlreadyInstantiatedException = function (_AbstractException) {
	    _inherits(MatrixAlreadyInstantiatedException, _AbstractException);

	    function MatrixAlreadyInstantiatedException(specialMsg) {
	        _classCallCheck(this, MatrixAlreadyInstantiatedException);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatrixAlreadyInstantiatedException).call(this, specialMsg));
	    }

	    return MatrixAlreadyInstantiatedException;
	}(_AbstractException2.AbstractException);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MatrixBadDimensionsException = undefined;

	var _AbstractException2 = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MatrixBadDimensionsException = exports.MatrixBadDimensionsException = function (_AbstractException) {
	    _inherits(MatrixBadDimensionsException, _AbstractException);

	    function MatrixBadDimensionsException(specialMsg) {
	        _classCallCheck(this, MatrixBadDimensionsException);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatrixBadDimensionsException).call(this, specialMsg));
	    }

	    return MatrixBadDimensionsException;
	}(_AbstractException2.AbstractException);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MatrixOutOfBoundsException = undefined;

	var _AbstractException2 = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MatrixOutOfBoundsException = exports.MatrixOutOfBoundsException = function (_AbstractException) {
	    _inherits(MatrixOutOfBoundsException, _AbstractException);

	    function MatrixOutOfBoundsException(specialMsg) {
	        _classCallCheck(this, MatrixOutOfBoundsException);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatrixOutOfBoundsException).call(this, specialMsg));
	    }

	    return MatrixOutOfBoundsException;
	}(_AbstractException2.AbstractException);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BadParamException = undefined;

	var _AbstractException2 = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BadParamException = exports.BadParamException = function (_AbstractException) {
	    _inherits(BadParamException, _AbstractException);

	    function BadParamException(specialMsg) {
	        _classCallCheck(this, BadParamException);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(BadParamException).call(this, specialMsg));
	    }

	    return BadParamException;
	}(_AbstractException2.AbstractException);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OptimizationProblem = undefined;

	var _Matrix = __webpack_require__(5);

	var _Matrix2 = _interopRequireDefault(_Matrix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var eqSysLeftSymbol = Symbol('linEquationSystemLeft'),
	    eqSysRightSymbol = Symbol('linEquationSystemRight'),
	    eqSysOperatorsSymbol = Symbol('linEquationSystemOperators'),
	    objectiveFunctionSymbol = Symbol('objectiveFunction'),
	    destinationSymbol = Symbol('destination');

	var OptimizationProblem = exports.OptimizationProblem = function OptimizationProblem(linEquationSystemLeft, linEquationSystemRight, linEquationSystemOperators, objectiveFunction, destination) {
	    _classCallCheck(this, OptimizationProblem);

	    this[eqSysLeftSymbol] = linEquationSystemLeft.transpose();
	    this[eqSysRightSymbol] = linEquationSystemRight;
	    this[eqSysOperatorsSymbol] = linEquationSystemOperators;
	    this[objectiveFunctionSymbol] = objectiveFunction;
	    this[destinationSymbol] = destination;
	};

/***/ }
/******/ ]);