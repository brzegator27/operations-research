'use strict';

const logAll = (first, ...rest) => {
    console.log(`asdfas ${first} asdf ${rest}.`);
};

logAll('a', 'b', 'c');

import Matrix from './Matrix.js';
document.onload = function () {
    var myM = new Matrix(1, 1, 'a');
    console.log(myM.m = 12);
};
var myM = new Matrix(1, 1, 'a');
console.log(myM);
console.log('asdf');
console.log('asdf');