'use strict';

var msgSymbol = Symbol('msg'),
    descriptionSymbol = Symbol('description');

export class AbstractException {
    constructor(specialMsg) {
        this[msgSymbol] = specialMsg ? specialMsg : '';
        this[descriptionSymbol] = 'You cannot re-instantiate matrix.';
    }

    get description() {
        return this[msgSymbol] + ' ' + this[descriptionSymbol];
    }
}