'use strict';

import {JsonFileField} from '../jsonFileField/JsonFileField.js';

var buttonElSymbol = Symbol('buttonEl'),
    jsonFileFieldSymbol = Symbol('jsonFileField'),
    buttonOnclickCallbackSymbol = Symbol('buttonOnclickCallback');

export class DualProblemInputFileField {
    constructor(buttonOnclickCallback) {
        this[buttonElSymbol] = null;
        this[jsonFileFieldSymbol] = new JsonFileField();
        this[buttonOnclickCallbackSymbol] = buttonOnclickCallback;
    }

    get lastReadJsonObj() {
        return this[jsonFileFieldSymbol].lastReadJsonObj;
    }

    set buttonOnclickCallback(buttonOnclickCallback) {
        this[buttonOnclickCallbackSymbol] = buttonOnclickCallback;
    }

    render(node) {
        let jsonFileField = this[jsonFileFieldSymbol],
            buttonEl = document.createElement('BUTTON'),
            buttonTextEl = document.createTextNode('Solve Problem');

        buttonEl.appendChild(buttonTextEl);
        buttonEl.onclick = () => {
            jsonFileField.getJsonObj(this[buttonOnclickCallbackSymbol]);
        };

        jsonFileField.render(node);
        node.appendChild(buttonEl);

        this[buttonElSymbol] = buttonEl;
    }
}