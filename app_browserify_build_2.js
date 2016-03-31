(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Matrix = require('./libs/math/Matrix');

var logAll = function logAll(first) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
    }

    console.log('asdfas ' + first + ' asdf ' + rest + '.');
};

logAll('a', 'b', 'c');

document.onload = function () {
    var myM = new _Matrix.Matrix(1, 1, 'a');
    console.log(myM.m = 12);
};

},{"./libs/math/Matrix":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix = exports.Matrix = function () {
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

},{}]},{},[1]);
