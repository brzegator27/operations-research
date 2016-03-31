'use strict';

var _Matrix = require('math/Matrix');

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