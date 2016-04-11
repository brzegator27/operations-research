'use strict';

import {MatrixFixedDimensionChangeException} from './exception/MatrixFixedDimensionChangeException.js';
import {MatrixAlreadyInstantiatedException} from './exception/MatrixAlreadyInstantiatedException.js';
import {MatrixBadDimensionsException} from './exception/MatrixBadDimensionsException.js';
import {MatrixOutOfBoundsException} from './exception/MatrixOutOfBoundsException.js';
import {BadParamException} from './exception/BadParamException.js';
import {TypeChecker} from '../util/TypeChecker.js';

var _m = Symbol('m'),
    _n = Symbol('n'),
    _data = Symbol('data'),
    _filler = Symbol('filler'),
    _bindedSide = Symbol('bindedSide'),
    _bindedBottom = Symbol('bindedBottom'),
    _bindSilent = Symbol('bindSilent');

export default class Matrix {
    constructor(m, n, filler) {
        this[_bindedSide] = [];
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
        if (this[_m] === null
            || this[_m] === undefined) {
            return;
        }

        throw new MatrixAlreadyInstantiatedException();
    }

    setBasicMatrixParams(m, n, filler) {
        if (!m || !n) {
            throw new MatrixBadDimensionsException();
        }

        this[_m] = m;
        this[_n] = n;
        this[_filler] = filler ? filler : 0;
        this[_data] = null;
    }

    crateEmptyMatrix(m, n, filler) {
        this.beforeCreate();
        this.setBasicMatrixParams(m, n, filler);

        this[_data] = new Array(m);
        for (var i = 0; i < m; i++) {
            this[_data][i] = new Array(n);
            for (var j = 0; j < n; j++) {
                this[_data][i][j] = filler;
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

        this[_data] = new Array(m);
        for (var i = 0; i < m; i++) {
            this[_data][i] = new Array(n);
            for (var j = 0; j < n; j++) {
                this[_data][i][j] = dataObj[rowBase + (i + 1)][colBase + (j + 1)];
            }
        }
    }

    transformRow(rowNo, fn) {
        if (rowNo < 0 || rowNo > this[_m]) {
            throw new MatrixOutOfBoundsException();
        }

        if (!TypeChecker.isFunction(fn)) {
            throw new BadParamException();
        }

        for (let colNo = 0; colNo < this.n; ++colNo) {
            this.transformElement(rowNo, colNo, fn);
        }
        this._manageBindedSide('transformRow', arguments);
    }

    transformCol(colNo, fn) {
        if (colNo < 0 || colNo > this[_n]) {
            throw new MatrixOutOfBoundsException();
        }

        if (!TypeChecker.isFunction(fn)) {
            throw new BadParamException();
        }

        for (let rowNo = 0; rowNo < this.m; ++rowNo) {
            this.transformElement(rowNo, colNo, fn);
        }
        this._manageBindedBottom('transformCol', arguments);
    }

    transpose() {
        // TODO Add exception
        if (this[_m] === null
            || this[_m] === undefined) {
            return;
        }

        let oldM = this[_m],
            oldN = this[_n],
            oldMatrixData = this[_data];

        this[_m] = oldN;
        this[_n] = oldM;
        this[_data] = new Array(oldN);

        for (var i = 0; i < oldN; i++) {
            this[_data][i] = new Array(oldM);
            for (var j = 0; j < oldM; j++) {
                this[_data][i][j] = oldMatrixData[j][i];
            }
        }

        return this;
    }

    bindSide(anotherMatrix) {
        if (anotherMatrix.m != this.m) {
            throw new MatrixBadDimensionsException();
        }

        if (!this.isBindedSide(anotherMatrix)) {
            this[_bindedSide].push(anotherMatrix);
            anotherMatrix.bindSide(this);
        }
    }

    bindBottom(anotherMatrix) {
        if (anotherMatrix.n != this.n) {
            throw new MatrixBadDimensionsException();
        }

        if (!this.isBindedBottom(anotherMatrix)) {
            this[_bindedBottom].push(anotherMatrix);
            anotherMatrix.bindSide(this);
        }
    }

    isBindedSide(matrix) {
        return this[_bindedSide].indexOf(matrix) !== -1;
    }

    isBindedBottom(matrix) {
        return this[_bindedBottom].indexOf(matrix) !== -1;
    }

    _manageBindedSide(methodName, bindedMatrixMethodArgs) {
        if (this.bindSilent) {
            return;
        }

        this[_bindedSide].forEach((bindedMatrix) => {
            bindedMatrix.bindSilent = true;
            bindedMatrix[methodName].apply(bindedMatrix, bindedMatrixMethodArgs);
            bindedMatrix.bindSilent = false;
        });
    }

    _manageBindedBottom(methodName, bindedMatrixMethodArgs) {
        if (this.bindSilent) {
            return;
        }

        this[_bindedBottom].forEach((bindedMatrix) => {
            bindedMatrix.bindSilent = true;
            bindedMatrix[methodName].apply(bindedMatrix, bindedMatrixMethodArgs);
            bindedMatrix.bindSilent = false;
        });
    }

    get m() {
        return this[_m];
    }

    get n() {
        return this[_n];
    }

    set m(newValue) {
        throw new MatrixFixedDimensionChangeException();
    }

    set n(newValue) {
        throw new MatrixFixedDimensionChangeException();
    }

    get bindSilent() {
        return this[_bindSilent];
    }

    set bindSilent(silent) {
        this[_bindSilent] = !!silent;
    }

    checkBoundary(m, n, throwException) {
        let inBoundary =
            ((m >= 0 && m < this.m) || m == null)
            && ((n >= 0 && n < this.n) || n == null)
            && m !== undefined && n !== undefined;

        if (throwException && !inBoundary) {
            throw new MatrixOutOfBoundsException();
        }

        return inBoundary;
    }

    setEl(m, n, newValue) {
        this.checkBoundary(m, n, true);

        this[_data][m][n] = newValue;
    }

    getEl(m, n) {
        this.checkBoundary(m, n, true);

        return this[_data][m][n];
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

        for (let colNo = 0; colNo < this.n; ++colNo) {
            let el = this.getEl(rowNo, colNo);

            fn.call(fn, el, colNo);
        }
    }

    getMatrixDataObj() {
        let mDataObj = {},
            rowBase = 'r_',
            colBase = 'c_';

        mDataObj.m = this.m;
        mDataObj.n = this.n;

        for (let i = 0; i < this.m; ++i) {
            mDataObj[rowBase + (i + 1)] = {};
            for (let j = 0; j < this.n; ++j) {
                mDataObj[rowBase + (i + 1)][colBase + (j + 1)] = this.getEl(i, j);
            }
        }

        return mDataObj;
    }

    transformElement(m, n, fn) {
        this.checkBoundary(m, n, true);

        let newElValue = fn.call(fn, this[_data][m][n], m, n);
        this.setEl(m, n, newElValue);
    }

    transformRowByRow(baseRow, targetRow, transformFn) {
        this.transformRow(baseRow, (baseRowEl, baseM, baseN) => {
            let targetRowEl = this.getEl(targetRow, baseN),
                targetRowElNewValue =
                    transformFn.call(transformFn, baseRowEl, targetRowEl, baseN);

            this.setEl(targetRow, baseN, targetRowElNewValue);

            return baseRowEl;
        });

        this._manageBindedSide('transformRowByRow', arguments);
    }

    transformColByCol(baseCol, targetCol, transformFn) {
        this.transformCol(baseCol, (baseColEl, baseM, baseN) => {
            let targetColEl = this.getEl(baseM, targetCol),
                targetColElNewValue =
                    transformFn.call(transformFn, baseColEl, targetColEl, baseM);

            this.setEl(baseM, targetCol, targetColElNewValue);

            return baseColEl;
        });

        this._manageBindedBottom('transformColByCol', arguments);
    }

    deleteRow(rowNo) {
        this.checkBoundary(rowNo, null, true);

        this[_data].splice(rowNo, 1);
        --this[_m];

        this._manageBindedSide('deleteRow', arguments);
    }

    deleteCol(colNo) {
        this.checkBoundary(null, colNo, true);

        for (let rowNo = 0; rowNo < this.m; ++rowNo) {
            this[_data][rowNo].splice(colNo, 1);
        }
        --this[_n];

        this._manageBindedBottom('deleteCol', arguments);
    }

    extendByRows(rowsCount, chosenFiller) {
        if (rowsCount <= 0) {
            throw new BadParamException('You can extend Matrix only by positive number of rows.');
        }
        let filler = chosenFiller !== undefined ? chosenFiller : this[_filler];

        while (rowsCount > 0) {
            let newRow = new Array(this.n);

            newRow.fill(filler);
            this[_data].push(newRow);
            ++this[_m];

            --rowsCount;
        }

        this._manageBindedSide('extendByRows', arguments);
    }

    extendByCols(colsCount, chosenFiller) {
        if (colsCount <= 0) {
            throw new BadParamException('You can extend Matrix only by positive number of columns.');
        }
        let filler = chosenFiller !== undefined ? chosenFiller : this[_filler];

        while (colsCount > 0) {
            for (let rowNo = 0; rowNo < this.m; ++rowNo) {
                this[_data][rowNo].push(filler);
            }
            ++this[_n];

            --colsCount;
        }

        this._manageBindedBottom('extendByCols', arguments);
    }

    rowToString(rowNo) {
        this.checkBoundary(rowNo, null, true);

        let rowAsString = '',
            gapsFiller = ', ';

        for (let colNo = 0; colNo < this.n; ++colNo) {
            rowAsString += this.getEl(rowNo, colNo).toString();
            rowAsString += colNo !== this.n - 1 ? gapsFiller : '';
        }

        return rowAsString;
    }

    toString() {
        let matrixAsString = '';

        for (let rowNo = 0; rowNo < this.m; ++rowNo) {
            matrixAsString += this.rowToString(rowNo);
            matrixAsString += rowNo !== this.m - 1 ? '\n' : '';
        }

        return matrixAsString;
    }
}
