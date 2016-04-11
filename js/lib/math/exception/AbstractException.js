'use strict';

var _msg = Symbol('msg'),
    _description = Symbol('description');

export class AbstractException {
    constructor(msg, description) {
        this[_msg] = msg ? msg : '';
        this[_description] = description !== undefined ? description : 'Error occured';
    }

    get description() {
        return this[_msg] + ': ' + this[_description];
    }
}