'use strict';

import {AbstractException} from './AbstractException.js';

export class BadParamException extends AbstractException {
    constructor(msg) {
        super(msg, 'Supplied parameters are invalid.');
    }
}