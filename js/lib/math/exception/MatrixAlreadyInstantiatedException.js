'use strict';

import {AbstractException} from './AbstractException.js';

export class MatrixAlreadyInstantiatedException extends AbstractException {
    constructor(specialMsg) {
        super(specialMsg);
    }
}