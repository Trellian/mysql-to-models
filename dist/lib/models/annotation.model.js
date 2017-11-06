"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var xserializer_1 = require("xserializer");
var Annotation = /** @class */ (function () {
    function Annotation(_name, _values, _index) {
        Object.assign(this, { _name: _name, _values: _values, _index: _index });
    }
    Object.defineProperty(Annotation.prototype, "hasValues", {
        get: function () {
            return this._values !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "table", {
        get: function () {
            return this._table;
        },
        set: function (value) {
            this._table = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (value) {
            this._column = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "foreignKey", {
        get: function () {
            return this._foreignKey;
        },
        set: function (value) {
            this._foreignKey = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Annotation.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        xserializer_1.Deserialize()
    ], Annotation.prototype, "_table", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Annotation.prototype, "_column", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Annotation.prototype, "_foreignKey", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Annotation.prototype, "_name", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Annotation.prototype, "_values", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Annotation.prototype, "_index", void 0);
    __decorate([
        xserializer_1.Serialize()
    ], Annotation.prototype, "table", null);
    __decorate([
        xserializer_1.Serialize()
    ], Annotation.prototype, "column", null);
    __decorate([
        xserializer_1.Serialize()
    ], Annotation.prototype, "foreignKey", null);
    __decorate([
        xserializer_1.Serialize()
    ], Annotation.prototype, "name", null);
    __decorate([
        xserializer_1.Serialize()
    ], Annotation.prototype, "values", null);
    Annotation = __decorate([
        xserializer_1.Serializable(),
        xserializer_1.Deserializable()
    ], Annotation);
    return Annotation;
}());
module.exports = Annotation;
//# sourceMappingURL=annotation.model.js.map