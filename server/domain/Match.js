'use strict';

class Match {

    constructor() {
        this.id = '0';
        this.type = '#';
        this.typeName = '#';
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get typeName() {
        return this._typeName;
    }

    set typeName(value) {
        this._typeName = value;
    }
}

module.exports = Match;