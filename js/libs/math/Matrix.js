'use strict';

export class Matrix {
    constructor(m, n, filler) {
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

    get m() {
        return this._m
    }

    set m(newVal) {
        this._m = newVal
    }

    getN() {
        return this.n;
    }

    setEl(newValue, n, m) {
        this.data[m][n] = newValue;
    }

    loadFromJSON(jsonObj) {
        var rowBase = 'r_',
            colBase = 'c_',
            i = 0, j = 0;

        while (jsonObj[rowBase + i]) {
            while (jsonObj[rowBase + i][colBase + j]) {
                this.setEl(i, j, jsonObj[rowBase + i][colBase + j]);
            }
        }
    }

}
