"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _ = require("lodash");
var NamesHelper = require("../helpers/names.helper");
var xserializer_1 = require("xserializer");
var Table = /** @class */ (function () {
    function Table(_a, index) {
        var TABLE_NAME = _a.TABLE_NAME, TABLE_TYPE = _a.TABLE_TYPE, TABLE_COMMENT = _a.TABLE_COMMENT;
        this._index = index;
        this._tableName = TABLE_NAME;
        this._constraints = [];
        this._tableType = TABLE_TYPE;
        this._tableComment = TABLE_COMMENT;
    }
    Object.defineProperty(Table.prototype, "tableName", {
        get: function () {
            return this._tableName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "tableType", {
        get: function () {
            return this._tableType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "tableComment", {
        get: function () {
            return this._tableComment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (columns) {
            this._columns = columns.sort(function (c1, c2) {
                var pos1 = parseInt(c1.ordinalPosition);
                var pos2 = parseInt(c2.ordinalPosition);
                if (pos1 < pos2)
                    return -1;
                else if (pos2 > pos1)
                    return 1;
                else
                    return 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortedColumns", {
        get: function () {
            return this._columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "pascalName", {
        get: function () {
            return _.upperFirst(this.camelName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "pluralPascalName", {
        get: function () {
            return NamesHelper.plural(this.pascalName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "modelName", {
        get: function () {
            return this.pascalName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "camelName", {
        get: function () {
            return _.camelCase(this.tableName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "instanceName", {
        get: function () {
            return this.camelName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "pluralCamelName", {
        get: function () {
            return NamesHelper.plural(this.camelName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "pluralTableName", {
        get: function () {
            return NamesHelper.plural(this.tableName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "pluralInstanceName", {
        get: function () {
            return this.pluralCamelName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "primaryKeyColumns", {
        get: function () {
            return this._columns.filter(function (column) { return column.isPrimaryKey; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "isEntity", {
        get: function () {
            return true;
            //return !this.columns.every(column => column.isForeignKey);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "oneToOneRelationships", {
        get: function () {
            return this._oneToOneRelationships;
        },
        set: function (relationships) {
            this._oneToOneRelationships = relationships;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "oneToManyRelationships", {
        get: function () {
            return this._oneToManyRelationships;
        },
        set: function (relationships) {
            this._oneToManyRelationships = relationships;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "oneToOneEntityRelationships", {
        get: function () {
            return this.oneToOneRelationships.filter(function (rel) { return rel.isBetweenEntities; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "oneToManyEntityRelationships", {
        get: function () {
            return this.oneToManyRelationships.filter(function (rel) { return rel.isBetweenEntities; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "manyToManyRelationships", {
        get: function () {
            return this._manyToManyRelationships;
        },
        set: function (relationships) {
            this._manyToManyRelationships = relationships;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "manyToManyEntityRelationships", {
        get: function () {
            return this.manyToManyRelationships.filter(function (rel) { return rel.isBetweenEntities; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "relatedTables", {
        get: function () {
            var _this = this;
            var relatedTables = [];
            var appendFunction = function (t) {
                if (t !== _this && relatedTables.lastIndexOf(t) === -1) {
                    relatedTables.push(t);
                }
            };
            this.oneToOneRelationships.forEach(function (rel) {
                [rel.oneSideTable, rel.anotherSideTable].forEach(appendFunction);
            });
            this.oneToManyRelationships.forEach(function (rel) {
                [rel.oneSideTable, rel.manySideTable].forEach(appendFunction);
            });
            this.manyToManyRelationships.forEach(function (rel) {
                [rel.manySide1Table, rel.manySide2Table, rel.innerTable].forEach(appendFunction);
            });
            return relatedTables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "foreignKeysRelatedTables", {
        get: function () {
            var _this = this;
            var toret = [];
            this.oneToOneRelationships.concat(this.oneToManyRelationships).forEach(function (rel) {
                if (rel.foreignKeys[0].table === _this) {
                    if (toret.lastIndexOf(rel.foreignKeys[0].referencedTable) === -1) {
                        toret.push(rel.foreignKeys[0].referencedTable);
                    }
                }
            });
            return toret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "relatedEntityTables", {
        get: function () {
            return this.relatedTables.filter(function (t) { return t.isEntity; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "constraints", {
        get: function () {
            return this._constraints;
        },
        set: function (c) {
            this._constraints = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "nonRepeatedConstraints", {
        /**
         * Get constraints removing the unique constraints that has a primary key constraint involving the same columns
         *
         * @readonly
         *
         * @memberOf Table
         */
        get: function () {
            var _this = this;
            return this.constraints.filter(function (cons) {
                return !cons.isUniqueType || !_this.primaryKeyConstraints.find(function (pkCons) { return pkCons.involvesColumns(cons.columns); });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "uniqueConstraints", {
        get: function () {
            return this._constraints.filter(function (cons) { return cons.isUniqueType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "nonRepeatedUniqueConstraints", {
        get: function () {
            return this.nonRepeatedConstraints.filter(function (cons) { return cons.isUniqueType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "uniquenessConstraints", {
        get: function () {
            return this._constraints.filter(function (cons) { return cons.isUniquenessType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "nonRepeatedUniquenessConstraints", {
        get: function () {
            return this.nonRepeatedConstraints.filter(function (cons) { return cons.isUniquenessType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "primaryKeyConstraints", {
        get: function () {
            return this._constraints.filter(function (cons) { return cons.isPrimaryKeyType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "annotations", {
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
    ], Table.prototype, "_tableName", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_columns", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_constraints", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_oneToOneRelationships", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_oneToManyRelationships", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_manyToManyRelationships", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_tableType", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_tableComment", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_annotations", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], Table.prototype, "_index", void 0);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "tableName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "tableType", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "tableComment", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "columns", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "sortedColumns", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "pascalName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "pluralPascalName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "modelName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "camelName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "instanceName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "pluralCamelName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "pluralTableName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "pluralInstanceName", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "primaryKeyColumns", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "isEntity", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "oneToOneRelationships", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "oneToManyRelationships", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "oneToOneEntityRelationships", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "oneToManyEntityRelationships", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "manyToManyRelationships", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "manyToManyEntityRelationships", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "relatedTables", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "foreignKeysRelatedTables", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "relatedEntityTables", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "constraints", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "nonRepeatedConstraints", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "uniqueConstraints", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "nonRepeatedUniqueConstraints", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "uniquenessConstraints", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "nonRepeatedUniquenessConstraints", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "primaryKeyConstraints", null);
    __decorate([
        xserializer_1.Serialize()
    ], Table.prototype, "annotations", null);
    Table = __decorate([
        xserializer_1.Serializable(),
        xserializer_1.Deserializable()
    ], Table);
    return Table;
}());
module.exports = Table;
//# sourceMappingURL=table.model.js.map