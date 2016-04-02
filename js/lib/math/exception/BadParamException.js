'use strict';

import {AbstractException} from './AbstractException.js';

export class BadParamException extends AbstractException {
    constructor(specialMsg) {
        super(specialMsg);
    }
}