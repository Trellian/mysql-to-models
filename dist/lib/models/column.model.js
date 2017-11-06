"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _ = require("lodash");
var xserializer_1 = require("xserializer");
var Column = /** @class */ (function () {
    function Column(_a, index) {
        var TABLE_NAME = _a.TABLE_NAME, COLUMN_NAME = _a.COLUMN_NAME, ORDINAL_POSITION = _a.ORDINAL_POSITION, COLUMN_DEFAULT = _a.COLUMN_DEFAULT, IS_NULLABLE = _a.IS_NULLABLE, DATA_TYPE = _a.DATA_TYPE, CHARACTER_MAXIMUM_LENGTH = _a.CHARACTER_MAXIMUM_LENGTH, COLUMN_TYPE = _a.COLUMN_TYPE, COLUMN_KEY = _a.COLUMN_KEY, EXTRA = _a.EXTRA, COLUMN_COMMENT = _a.COLUMN_COMMENT;
        this._index = index;
        this._tableName = TABLE_NAME;
        this._columnName = COLUMN_NAME;
        this._ordinalPosition = ORDINAL_POSITION;
        this._columnDefault = COLUMN_DEFAULT;
        this._isNullable = IS_NULLABLE;
        this._dataType = DATA_TYPE;
        this._characterMaximumLength = CHARACTER_MAXIMUM_LENGTH;
        this._columnType = COLUMN_TYPE;
        this._columnKey = COLUMN_KEY;
        this._extra = EXTRA;
        this._columnComment = COLUMN_COMMENT;
    }
    Column_1 = Column;
    Object.defineProperty(Column.prototype, "tableName", {
        get: function () {
            return this._tableName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "table", {
        get: function () {
            return this._table;
        },
        set: function (table) {
            this._table = table;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "columnName", {
        get: function () {
            return this._columnName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "pascalName", {
        get: function () {
            return _.upperFirst(this.camelName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "camelName", {
        get: function () {
            return _.camelCase(this.columnName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "phpName", {
        get: function () {
            return this.camelName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "ordinalPosition", {
        get: function () {
            return this._ordinalPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "columnDefault", {
        get: function () {
            return this._columnDefault;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isNullable", {
        get: function () {
            return this._isNullable !== 'NO';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "hasDefaultValue", {
        get: function () {
            return this._columnDefault !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isRequired", {
        get: function () {
            return !this.isNullable && !this.hasDefaultValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isAutoIncrement", {
        get: function () {
            return this._extra.lastIndexOf('auto_increment') > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "dataType", {
        get: function () {
            return this._dataType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "characterMaximumLength", {
        get: function () {
            return this._characterMaximumLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "columnType", {
        get: function () {
            return this._columnType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "columnKey", {
        get: function () {
            return this._columnKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "extra", {
        get: function () {
            return this._extra;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "foreignkey", {
        get: function () {
            return this._foreignKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "foreignKey", {
        set: function (fk) {
            this._foreignKey = fk;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "referencedColumn", {
        get: function () {
            return this._foreignKey.referencedColumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "referencedTable", {
        get: function () {
            return this._foreignKey.referencedTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "columnComment", {
        get: function () {
            return this._columnComment;
        },
        enumerable: true,
        configurable: true
    });
    Column.getPhpDataType = function (type) {
        switch (type) {
            case 'int':
            case 'tinyint':
                return 'int';
            case 'float':
            case 'double':
            case 'decimal':
                return 'float';
            case 'bool':
                return 'boolean';
            case 'date':
            case 'datetime':
            case 'timestamp':
                return 'date'; //¿?
            default:
                return 'string';
        }
    };
    Column.getJsonDataType = function (type) {
        switch (type) {
            case 'int':
            case 'tinyint':
                return 'integer';
            case 'float':
            case 'double':
            case 'decimal':
                return 'number';
            case 'bool':
                return 'boolean';
            case 'date':
            case 'datetime':
            case 'timestamp':
                return 'string'; //¿?
            default:
                return 'string';
        }
    };
    Object.defineProperty(Column.prototype, "phpDataType", {
        get: function () {
            if (!this._phpDataType) {
                return Column_1.getPhpDataType(this.dataType);
            }
            return this._phpDataType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "jsonDataType", {
        get: function () {
            if (!this._jsonDataType) {
                return Column_1.getJsonDataType(this.dataType);
            }
            return this._jsonDataType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isPrimaryKey", {
        get: function () {
            return this.columnKey === 'PRI';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isForeignKey", {
        get: function () {
            return !!this.foreignkey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isEditable", {
        get: function () {
            return !this.isAutoIncrement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isUniqueType", {
        get: function () {
            return this.columnKey === 'UNI';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isUnique", {
        get: function () {
            return this.isUniqueType || this.isPrimaryKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "annotations", {
        get: function () {
            return this._annotations;
        },
        set: function (value) {
            this._annotations = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_tableName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_columnName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_ordinalPosition", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_columnDefault", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_isNullable", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_dataType", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_characterMaximumLength", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_columnType", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_columnKey", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_extra", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_columnComment", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_table", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_foreignKey", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_phpDataType", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_jsonDataType", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_annotations", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Column.prototype, "_index", void 0);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "tableName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "table", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "columnName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "pascalName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "camelName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "phpName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "ordinalPosition", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "columnDefault", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "isNullable", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "hasDefaultValue", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "isRequired", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "isAutoIncrement", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "dataType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "characterMaximumLength", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "columnType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "columnKey", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "extra", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "foreignkey", null);
    __decorate([
        xserializer_1.Serialize(true)
    ], Column.prototype, "referencedColumn", null);
    __decorate([
        xserializer_1.Serialize(true)
    ], Column.prototype, "referencedTable", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "columnComment", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "phpDataType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "jsonDataType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "isPrimaryKey", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "isForeignKey", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "isEditable", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "isUniqueType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "isUnique", null);
    __decorate([
        xserializer_1.Serialize()
    ], Column.prototype, "annotations", null);
    Column = Column_1 = __decorate([
        xserializer_1.Serializable(),
        xserializer_1.Deserializable()
    ], Column);
    return Column;
    var Column_1;
}());
module.exports = Column;
//# sourceMappingURL=column.model.js.map