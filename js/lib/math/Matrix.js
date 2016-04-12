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
    _numeric = Symbol('numeric');

export default class Matrix {
    constructor(m, n, options) {
        if (arguments.length <= 2
            && (m instanceof Object)
            && ((n instanceof Object)
            || !n)) {
            this[_numeric] = n ? n.numeric : true;
            this.createMatrixFromDataObj(m);
            return;
        }

        let filler = options ? options.filler : null;
        this[_numeric] = options ? options.numeric : true;

        if (!m || !n) {
            this.setBasicMatrixParams(m, n, filler);
            return;
        }

        this.crateEmptyMatrix(m, n, filler);
    }

    getOptionsObj() {
        return {
            filler: this.filler,
            numeric: this.numeric
        }
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
        this[_filler] = filler ? filler : this.defaultFiller;
        this[_data] = null;
    }

    crateEmptyMatrix(m, n, filler) {
        this.beforeCreate();
        this.setBasicMatrixParams(m, n, filler);

        this[_data] = new Array(m);
        for (var i = 0; i < m; i++) {
            this[_data][i] = new Array(n);
            for (var j = 0; j < n; j++) {
                this.setEl(i, j, this[_filler]);
            }
        }
    }

    createMatrixFromDataObj(dataObj, filler) {
        this.beforeCreate();

        let m = dataObj.m,
            n = dataObj.n,
            rowBase = 'r_',
            colBase = 'c_',
            dataObjSingleEl = null;

        this.setBasicMatrixParams(m, n, filler);

        this[_data] = new Array(m);
        for (var i = 0; i < m; i++) {
            this[_data][i] = new Array(n);
            for (var j = 0; j < n; j++) {
                dataObjSingleEl = dataObj[rowBase + (i + 1)][colBase + (j + 1)];
                this.setEl(i, j, dataObjSingleEl);
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
                this.setEl(i, j, oldMatrixData[j][i]);
            }
        }

        return this;
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

    get numeric() {
        return this[_numeric];
    }

    get filler() {
        return this[_filler];
    }

    set filler(newFiller) {
        this[_filler] = this.numeric ? parseInt(newFiller) : newFiller;
    }

    get defaultFiller() {
        return this.numeric ? 0 : null;
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

        this[_data][m][n] = this[_numeric] ? parseInt(newValue) : newValue;
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

    transformRowByRow(baseRow, targetRow, transformFn, baseMatrix) {
        if (!baseMatrix) {
            baseMatrix = this;
        }
        baseMatrix.transformRow(baseRow, (baseRowEl, baseM, baseN) => {
            let targetRowEl = this.getEl(targetRow, baseN),
                targetRowElNewValue =
                    transformFn.call(transformFn, baseRowEl, targetRowEl, baseN);

            this.setEl(targetRow, baseN, targetRowElNewValue);

            return baseRowEl;
        });
    }

    transformColByCol(baseCol, targetCol, transformFn, baseMatrix) {
        if (!baseMatrix) {
            baseMatrix = this;
        }
        baseMatrix.transformCol(baseCol, (baseColEl, baseM, baseN) => {
            let targetColEl = this.getEl(baseM, targetCol),
                targetColElNewValue =
                    transformFn.call(transformFn, baseColEl, targetColEl, baseM);

            this.setEl(baseM, targetCol, targetColElNewValue);

            return baseColEl;
        });
    }

    deleteRow(rowNo) {
        this.checkBoundary(rowNo, null, true);

        this[_data].splice(rowNo, 1);
        --this[_m];
    }

    deleteCol(colNo) {
        this.checkBoundary(null, colNo, true);

        for (let rowNo = 0; rowNo < this.m; ++rowNo) {
            this[_data][rowNo].splice(colNo, 1);
        }
        --this[_n];
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
    }

    getRowAsMatrix(rowNo) {
        let rowMatrix = new Matrix(1, this.n, this.getOptionsObj());

        this.forEachColInRow(rowNo, (el, colNo) => {
            rowMatrix.setEl(0, colNo, el);
        });

        return rowMatrix;
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
