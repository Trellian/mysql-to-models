"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var xserializer_1 = require("xserializer");
var ForeignKey = /** @class */ (function () {
    function ForeignKey(_a, index) {
        var TABLE_NAME = _a.TABLE_NAME, COLUMN_NAME = _a.COLUMN_NAME, CONSTRAINT_NAME = _a.CONSTRAINT_NAME, REFERENCED_TABLE_NAME = _a.REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME = _a.REFERENCED_COLUMN_NAME;
        this._index = index;
        this._tableName = TABLE_NAME;
        this._columnName = COLUMN_NAME;
        this._constraintName = CONSTRAINT_NAME;
        this._referencedTableName = REFERENCED_TABLE_NAME;
        this._referencedColumnName = REFERENCED_COLUMN_NAME;
        //	      console.log('New Foreign Key: ' + CONSTRAINT_NAME);
        //	      console.log('  Table:            ' + TABLE_NAME)
        //	      console.log('  Referenced Table: ' + REFERENCED_TABLE_NAME + '\n');
    }
    Object.defineProperty(ForeignKey.prototype, "tableName", {
        get: function () {
            return this._tableName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForeignKey.prototype, "columnName", {
        get: function () {
            return this._columnName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForeignKey.prototype, "table", {
        get: function () {
            return this._table;
        },
        set: function (table) {
            this._table = table;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForeignKey.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (column) {
            this._column = column;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForeignKey.prototype, "constraintName", {
        get: function () {
            return this._constraintName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForeignKey.prototype, "referencedTableName", {
        get: function () {
            return this._referencedTableName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForeignKey.prototype, "referencedColumnName", {
        get: function () {
            return this._referencedColumnName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForeignKey.prototype, "referencedTable", {
        get: function () {
            return this._referencedTable;
        },
        set: function (table) {
            this._referencedTable = table;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForeignKey.prototype, "referencedColumn", {
        get: function () {
            return this._referencedColumn;
        },
        set: function (column) {
            this._referencedColumn = column;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_tableName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_columnName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_constraintName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_referencedTableName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_referencedColumnName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_table", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_column", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_referencedTable", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_referencedColumn", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ForeignKey.prototype, "_index", void 0);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "tableName", null);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "columnName", null);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "table", null);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "column", null);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "constraintName", null);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "referencedTableName", null);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "referencedColumnName", null);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "referencedTable", null);
    __decorate([
        xserializer_1.Serialize()
    ], ForeignKey.prototype, "referencedColumn", null);
    ForeignKey = __decorate([
        xserializer_1.Serializable(),
        xserializer_1.Deserializable()
    ], ForeignKey);
    return ForeignKey;
}());
module.exports = ForeignKey;
//# sourceMappingURL=foreign_key.model.js.map