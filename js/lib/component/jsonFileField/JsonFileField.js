'use strict';

import {TypeChecker} from '../../util/TypeChecker.js';

var fileInputDomElSymbol = Symbol('fileInputDomEl');
var lastReadJsonObjSymbol = Symbol('lastReadJsonObj');

export class JsonFileField {
    constructor() {
        this[fileInputDomElSymbol] = null;
        this[lastReadJsonObjSymbol] = null;
    }

    get lastReadJsonObj() {
        return this[lastReadJsonObjSymbol];
    }

    render(node) {
        var fileInput = document.createElement('INPUT');
        fileInput.setAttribute('type', 'file');
        node.appendChild(fileInput);

        this[fileInputDomElSymbol] = fileInput;
    }

    getJsonObj(callback) {
        var fileInput = this[fileInputDomElSymbol],
            file = fileInput.files[0],
            fileReader = new window.FileReader();

        if (!file) {
            return null;
        }

        fileReader.onloadend = function () {
            var jsonRawData = fileReader.result,
                jsonRawDataStr = jsonRawData.toString(),
                jsonObj = JSON.parse(jsonRawDataStr);

            this[lastReadJsonObjSymbol] = jsonObj;
            console.log(jsonObj);

            if (TypeChecker.isFunction(callback)) {
                callback(jsonObj)
            }
        };

        fileReader.readAsText(file);
    }
}