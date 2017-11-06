"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Relationship = require("./relationship.model");
var xserializer_1 = require("xserializer");
var OneToXRelationship = /** @class */ (function (_super) {
    __extends(OneToXRelationship, _super);
    function OneToXRelationship(name, index) {
        var _this = _super.call(this, index) || this;
        _this._name = name;
        _this._foreignKeys = [];
        return _this;
    }
    Object.defineProperty(OneToXRelationship.prototype, "foreignKeys", {
        get: function () {
            return this._foreignKeys;
        },
        set: function (fks) {
            this._foreignKeys = fks;
        },
        enumerable: true,
        configurable: true
    });
    OneToXRelationship.prototype.addForeignKey = function (fk) {
        this._foreignKeys.push(fk);
    };
    Object.defineProperty(OneToXRelationship.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    OneToXRelationship.prototype.involvesSameTables = function (rel) {
        throw new Error('Not implemented');
    };
    OneToXRelationship.prototype.getNameFromSide = function (tableSide) {
        throw new Error('Not implemented');
    };
    OneToXRelationship.prototype.getPluralNameFromSide = function (tableSide) {
        throw new Error('Not implemented');
    };
    OneToXRelationship.prototype.getOtherSideColumn = function (column) {
        var otherSideColumn;
        var i = 0;
        while (!otherSideColumn && i < this.foreignKeys.length) {
            if (this.foreignKeys[i].referencedColumn === column) {
                otherSideColumn = this.foreignKeys[i].column;
            }
            else if (this.foreignKeys[i].column) {
                otherSideColumn = this.foreignKeys[i].referencedColumn;
            }
            i++;
        }
        if (!otherSideColumn) {
            throw new Error("Column \"" + column.columnName + "\" not found in foreign keys of relationship \"" + this.name + "\"");
        }
        return otherSideColumn;
    };
    Object.defineProperty(OneToXRelationship.prototype, "foreignKeysContainPrimaryKey", {
        get: function () {
            return !!this.foreignKeys.find(function (fk) { return fk.column.isPrimaryKey; });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        xserializer_1.Deserialize()
    ], OneToXRelationship.prototype, "_name", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], OneToXRelationship.prototype, "_foreignKeys", void 0);
    __decorate([
        xserializer_1.Serialize()
    ], OneToXRelationship.prototype, "foreignKeys", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToXRelationship.prototype, "name", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToXRelationship.prototype, "foreignKeysContainPrimaryKey", null);
    OneToXRelationship = __decorate([
        xserializer_1.Deserializable(),
        xserializer_1.Serializable()
    ], OneToXRelationship);
    return OneToXRelationship;
}(Relationship));
module.exports = OneToXRelationship;
//# sourceMappingURL=one_to_x_relationship.model.js.map