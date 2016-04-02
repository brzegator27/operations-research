'use strict';

import {AbstractException} from './AbstractException.js';

export class MatrixBadDimensionsException extends AbstractException {
    constructor(specialMsg) {
        super(specialMsg);
    }
}