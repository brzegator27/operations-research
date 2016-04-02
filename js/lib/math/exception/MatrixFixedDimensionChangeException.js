'use strict';

import {AbstractException} from './AbstractException.js';

export class MatrixFixedDimensionChangeException extends AbstractException {
    constructor(specialMsg) {
        super(specialMsg);
    }
}