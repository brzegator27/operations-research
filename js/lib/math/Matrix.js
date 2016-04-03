'use strict';

import {MatrixFixedDimensionChangeException} from './exception/MatrixFixedDimensionChangeException.js';
import {MatrixAlreadyInstantiatedException} from './exception/MatrixAlreadyInstantiatedException.js';
import {MatrixBadDimensionsException} from './exception/MatrixBadDimensionsException.js';
import {MatrixOutOfBoundsException} from './exception/MatrixOutOfBoundsException.js';
import {BadParamException} from './exception/BadParamException.js';
import {TypeChecker} from '../util/TypeChecker.js';

var mSymbol = Symbol('m'),
    nSymbol = Symbol('n'),
    dataSymbol = Symbol('data'),
    fillerSymbol = Symbol('filler'),
    bindedSymbol = Symbol('binded'),
    bindSilentSymbol = Symbol('bindSilent');

export default class Matrix {
    constructor(m, n, filler) {
        this[bindedSymbol] = [];
        this.bindSilent = false;

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

    beforeCreate() {
        if (this[mSymbol] === null
            || this[mSymbol] === undefined) {
            return;
        }

        throw new MatrixAlreadyInstantiatedException();
    }

    setBasicMatrixParams(m, n, filler) {
        if (!m || !n) {
            throw new MatrixBadDimensionsException();
        }

        this[mSymbol] = m;
        this[nSymbol] = n;
        this[fillerSymbol] = filler ? filler : 0;
        this[dataSymbol] = null;
    }

    crateEmptyMatrix(m, n, filler) {
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

    createMatrixFromDataObj(dataObj, filler) {
        this.beforeCreate();

        let m = dataObj.m,
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

    rowTransformByFn(rowNo, fn) {
        if (rowNo < 0 || rowNo > this[mSymbol]) {
            throw new MatrixOutOfBoundsException();
        }

        if (!TypeChecker.isFunction(fn)) {
            throw new BadParamException();
        }

        this[dataSymbol][rowNo].forEach((item, idx) => {
            this[dataSymbol][rowNo][idx] = fn(item, idx);
        });
        this._manageBindedSide('rowTransformByFn', arguments);
    }

    transpose() {
        // TODO Add exception
        if (this[mSymbol] === null
            || this[mSymbol] === undefined) {
            return;
        }

        let oldM = this[mSymbol],
            oldN = this[nSymbol],
            oldMatrixData = this[dataSymbol];

        this[mSymbol] = oldN;
        this[nSymbol] = oldM;
        this[dataSymbol] = new Array(oldN);

        for (var i = 0; i < oldN; i++) {
            this[dataSymbol][i] = new Array(oldM);
            for (var j = 0; j < oldM; j++) {
                this[dataSymbol][i][j] = oldMatrixData[j][i];
            }
        }

        return this;
    }

    bindSide(anotherMatrix) {
        if (anotherMatrix.m != this.m) {
            throw new MatrixBadDimensionsException();
        }

        if (!this.isBindedSide(anotherMatrix)) {
            this[bindedSymbol].push(anotherMatrix);
            anotherMatrix.bindSide(this);
        }
    }

    isBindedSide(matrix) {
        return this[bindedSymbol].indexOf(matrix) !== -1;
    }

    _manageBindedSide(methodName, bindedMatrixMethodArgs) {
        if (this.bindSilent) {
            return;
        }

        this[bindedSymbol].forEach((bindedMatrix) => {
            bindedMatrix.bindSilent = true;
            bindedMatrix[methodName].apply(bindedMatrix, bindedMatrixMethodArgs);
            bindedMatrix.bindSilent = false;
        });
    }

    get m() {
        return this[mSymbol];
    }

    get n() {
        return this[nSymbol];
    }

    set m(newValue) {
        throw new MatrixFixedDimensionChangeException();
    }

    set n(newValue) {
        throw new MatrixFixedDimensionChangeException();
    }

    get bindSilent() {
        return this[bindSilentSymbol];
    }

    set bindSilent(silent) {
        this[bindSilentSymbol] = !!silent;
    }

    checkBoundary(m, n, throwException) {
        let inBoundary =
            ((m >= 0 && m < this.m) || m == null)
            && ((n >= 0 && n < this.n) || n == null);

        if (throwException && !inBoundary) {
            throw new MatrixOutOfBoundsException();
        }

        return inBoundary;
    }

    setEl(m, n, newValue) {
        this.checkBoundary(m, n, true);

        this[dataSymbol][m][n] = newValue;
    }

    getEl(m, n) {
        this.checkBoundary(m, n, true);

        return this[dataSymbol][m][n];
    }

    forEachRowInCol(colNo, fn) {
        this.checkBoundary(null, colNo, true);

        if (!TypeChecker.isFunction(fn)) {
            throw new BadParamException();
        }

        for (let i = 0; i < this.m; ++i) {
            fn.call(fn, this.getEl(i, colNo), i);
        }
    }

    forEachColInRow(rowNo, fn) {
        this.checkBoundary(rowNo, null, true);

        if (!TypeChecker.isFunction(fn)) {
            throw new BadParamException();
        }

        for (let i = 0; i < this.n; ++i) {
            fn.call(fn, this.getEl(rowNo, i), i);
        }
    }

    getMatrixDataObj() {
        let mDataObj = {},
            rowBase = 'r_',
            colBase = 'c_';

        mDataObj.m = this.m;
        mDataObj.n = this.n;

        for (let i = 0; i < this.m; ++i) {
            mDataObj[rowBase + i] = {};
            for (let j = 0; j < this.n; ++j) {
                mDataObj[rowBase + i][colBase + j] = this.getEl(i, j);
            }
        }

        return mDataObj;
    }
}
