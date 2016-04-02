'use strict';

import {AbstractException} from './AbstractException.js';

export class MatrixOutOfBoundsException extends AbstractException {
    constructor(specialMsg) {
        super(specialMsg);
    }
}