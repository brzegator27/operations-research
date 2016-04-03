'use strict';

var _A = Symbol('A'),
    _x = Symbol('x'),
    _b = Symbol('b'),
    _signs = Symbol('signs');

export class LinEquationsSystem {
    constructor(A, x, b, signs) {
        this[_A] = A;
        this[_x] = x;
        this[_b] = b;
        this[_signs] = signs;

        this.A.bindSide(b);
    }

    coordinateSigns(chosenSign) {
        const signToCoordinate = chosenSign ? chosenSign : this.signs.getEl(0, 0);

        this.signs.forEachRowInCol(0, (sign, rowNo) => {
            if (sign === '=' || sign === signToCoordinate) {
                return;
            }

            this.A.rowTransformByFn(rowNo, (rowEl) => {
                return -rowEl;
            });
            this.signs.setEl(rowNo, 0, signToCoordinate);
        });
    }

    get A() {
        return this[_A];
    }

    get x() {
        return this[_x];
    }

    get b() {
        return this[_b];
    }

    get signs() {
        return this[_signs];
    }
}