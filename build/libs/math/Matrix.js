'use strict';

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