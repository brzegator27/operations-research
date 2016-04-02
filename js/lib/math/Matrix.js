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
    fillerSymbol = Symbol('filler');

export default class Matrix {
    constructor(m, n, filler) {
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
            fn(item, idx);
        })
    }

    transpose() {
        // TODO
        // Add exception
        if (this[mSymbol] === null
            || this[mSymbol] === undefined) {
            return;
        }

        let oldM = this[mSymbol],
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

    setEl(newValue, m, n) {
        this[dataSymbol][m][n] = newValue;
    }
}
