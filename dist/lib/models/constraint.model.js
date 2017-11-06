"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var xserializer_1 = require("xserializer");
var Constraint = /** @class */ (function () {
    function Constraint(_a, index) {
        var CONSTRAINT_NAME = _a.CONSTRAINT_NAME, TABLE_NAME = _a.TABLE_NAME, CONSTRAINT_TYPE = _a.CONSTRAINT_TYPE;
        this._index = index;
        this._constraintName = CONSTRAINT_NAME;
        this._tableName = TABLE_NAME;
        this._constraintType = CONSTRAINT_TYPE;
        this._columns = [];
        this._columnNames = [];
    }
    Object.defineProperty(Constraint.prototype, "constraintName", {
        get: function () {
            return this._constraintName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "constraintType", {
        get: function () {
            return this._constraintType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "tableName", {
        get: function () {
            return this._tableName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "columnNames", {
        get: function () {
            return this._columnNames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (cols) {
            this._columns = cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "areAllColumnsAutoIncrement", {
        get: function () {
            return this._columns.every(function (col) { return col.isAutoIncrement; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "containsPrimaryKeyColumn", {
        get: function () {
            return !!this.columns.find(function (col) { return col.isPrimaryKey; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "nonAutoIncrementColumns", {
        get: function () {
            return this._columns.filter(function (col) { return !col.isAutoIncrement; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "isUniquenessType", {
        get: function () {
            return this.isUniqueType || this.isPrimaryKeyType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "isUniqueType", {
        get: function () {
            return this._constraintType === 'UNIQUE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "isPrimaryKeyType", {
        get: function () {
            return this._constraintType === 'PRIMARY KEY';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "table", {
        get: function () {
            return this._columns[0].table;
        },
        enumerable: true,
        configurable: true
    });
    Constraint.prototype.addColumnName = function (columnName) {
        this._columnNames.push(columnName);
    };
    Constraint.prototype.involvesColumns = function (cols) {
        var _this = this;
        return this.columns.length === cols.length
            && cols.every(function (col) { return _this._columns.lastIndexOf(col) > -1; })
            && this._columns.every(function (col) { return cols.lastIndexOf(col) > -1; });
    };
    __decorate([
        xserializer_1.Deserialize()
    ], Constraint.prototype, "_constraintName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Constraint.prototype, "_tableName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Constraint.prototype, "_constraintType", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Constraint.prototype, "_columns", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Constraint.prototype, "_columnNames", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Constraint.prototype, "_index", void 0);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "constraintName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "constraintType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "tableName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "columnNames", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "columns", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "areAllColumnsAutoIncrement", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "containsPrimaryKeyColumn", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "nonAutoIncrementColumns", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "isUniquenessType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "isUniqueType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "isPrimaryKeyType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Constraint.prototype, "table", null);
    Constraint = __decorate([
        xserializer_1.Serializable(),
        xserializer_1.Deserializable()
    ], Constraint);
    return Constraint;
}());
module.exports = Constraint;
//# sourceMappingURL=constraint.model.js.map