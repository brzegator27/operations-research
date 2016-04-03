'use strict';

var _jsonDataObj = Symbol('jsonDataObj'),
    _fileUrl = Symbol('fileUrl'),
    _blob = Symbol('blob'),
    _fileName = Symbol('fileName'),
    _linkDescription = Symbol('linkDescription');

export class LocalJsonFileDownloadField {
    constructor(jsonDataObj, linkDescription, fileName) {
        this[_jsonDataObj] = jsonDataObj;
        this[_blob] = new Blob([JSON.stringify(jsonDataObj, null, 4)], {type: 'application/json'});
        this[_fileUrl] = URL.createObjectURL(this[_blob]);
        this[_fileName] = fileName;

        this.linkDescription = linkDescription;
    }

    get jsonDataObj() {
        return this[_jsonDataObj];
    }

    get fileUrl() {
        return this[_fileUrl];
    }

    get linkDescription() {
        return this[_linkDescription];
    }

    set linkDescription(newDescription) {
        this[_linkDescription] = newDescription;
    }

    get fileName() {
        return this[_fileName];
    }

    set fileName(newFileName) {
        this[_fileName] = newFileName;
    }

    render(node) {
        var link = document.createElement('A'),
            linkText = document.createTextNode(this.linkDescription);

        link.appendChild(linkText);
        link.title = this.linkDescription;
        link.href = this.fileUrl;
        link.download = this.fileName;

        node.appendChild(link);
    }

}