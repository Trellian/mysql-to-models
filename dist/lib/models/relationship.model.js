"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var xserializer_1 = require("xserializer");
var Relationship = /** @class */ (function () {
    function Relationship(index) {
        this._index = index;
        this._numberOfRelationshipsWithSameTables = 1;
        this._indexInSameTablesRelationships = 0;
    }
    Object.defineProperty(Relationship.prototype, "numberOfRelationshipsWithSameTables", {
        /**
         * The number of relationships (of the same type) with the same tables involved
         *
         * @type {number}
         */
        get: function () {
            return this._numberOfRelationshipsWithSameTables;
        },
        set: function (num) {
            this._numberOfRelationshipsWithSameTables = num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relationship.prototype, "indexInSameTablesRelationships", {
        /**
         * The index in the same tables relationships
         *
         * @description There are another relationships that involve the same tables. Every relationship has an index.
         * @type {number}
         */
        get: function () {
            return this._indexInSameTablesRelationships;
        },
        set: function (index) {
            this._indexInSameTablesRelationships = index;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        xserializer_1.Deserialize()
    ], Relationship.prototype, "_numberOfRelationshipsWithSameTables", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Relationship.prototype, "_indexInSameTablesRelationships", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Relationship.prototype, "_index", void 0);
    __decorate([
        xserializer_1.Serialize()
    ], Relationship.prototype, "numberOfRelationshipsWithSameTables", null);
    __decorate([
        xserializer_1.Serialize()
    ], Relationship.prototype, "indexInSameTablesRelationships", null);
    return Relationship;
}());
module.exports = Relationship;
//# sourceMappingURL=relationship.model.js.map