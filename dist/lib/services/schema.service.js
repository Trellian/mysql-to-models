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
var DbService = require("./db.service");
var Schema = require("../models/schema.model");
var OneToXRelationship = require("../models/one_to_x_relationship.model");
var OneToOneRelationship = require("../models/one_to_one_relationship.model");
var OneToManyRelationship = require("../models/one_to_many_relationship.model");
var ManyToManyRelationship = require("../models/many_to_many_relationship.model");
var ColumnsService = require("./columns.service");
var ForeignKeysService = require("./foreign_keys.service");
var ConstraintsService = require("./constraints.service");
var TablesService = require("./tables.service");
var AnnotationsService = require("./annotations.service");
var SchemaService = /** @class */ (function (_super) {
    __extends(SchemaService, _super);
    function SchemaService(dbConnection, dbConfig, _projectConfig) {
        var _this = _super.call(this, dbConnection, dbConfig) || this;
        _this._projectConfig = _projectConfig;
        _this._columnsService = new ColumnsService(dbConnection, dbConfig);
        _this._foreignKeysService = new ForeignKeysService(dbConnection, dbConfig);
        _this._constraintsService = new ConstraintsService(dbConnection, dbConfig);
        _this._tablesService = new TablesService(dbConnection, dbConfig);
        return _this;
    }
    SchemaService.prototype.getSchema = function () {
        var _this = this;
        return Promise.all([
            this._columnsService.getColumns(),
            this._foreignKeysService.getForeignKeys(),
            this._tablesService.getTables(),
            this._constraintsService.getConstraints()
        ])
            .then(function (_a) {
            var columns = _a[0], foreignKeys = _a[1], tables = _a[2], constraints = _a[3];
            //Bind foreignKey to columns
            columns.forEach(function (col) {
                col.foreignKey = foreignKeys.find(function (fk) {
                    return fk.columnName === col.columnName &&
                        fk.tableName === col.tableName;
                });
            });
            //Bind columns to tables and table to columns
            tables.forEach(function (table) {
                table.columns = columns.filter(function (col) {
                    return table.tableName === col.tableName;
                });
                table.columns.forEach(function (column) {
                    column.table = table;
                });
            });
            //Bind table, column, referenced table and referenced column to foreign keys
            foreignKeys.forEach(function (fk) {
                fk.table = tables.find(function (table) { return table.tableName === fk.tableName; });
                //                    console.log('Foreign Key: ' + fk.constraintName + ' on table ' + fk.table.tableName + ', to referenced table: ' + fk.referencedTableName);
                fk.column = fk.table.columns.find(function (col) { return col.columnName === fk.columnName; });
                fk.referencedTable = tables.find(function (table) { return table.tableName === fk.referencedTableName; });
                fk.referencedColumn = fk.referencedTable.columns.find(function (col) { return col.columnName === fk.referencedColumnName; });
            });
            //Bind constraints to tables
            constraints.forEach(function (constraint) {
                var table = tables.find(function (table) { return table.tableName === constraint.tableName; });
                constraint.columns = constraint.columnNames.map(function (columnName) {
                    return table.columns.find(function (column) { return column.columnName === columnName; });
                });
                table.constraints.push(constraint);
            });
            var oneToManyRelationships = [];
            var oneToOneRelationships = [];
            var manyToManyRelationships = [];
            {
                var oneToXRelationships_1 = [];
                //Build one-to-x relationships
                foreignKeys.forEach(function (fk) {
                    var rel = oneToXRelationships_1.find(function (rel) { return rel.name === fk.constraintName; });
                    if (!rel) {
                        rel = new OneToXRelationship(fk.constraintName, oneToXRelationships_1.length);
                        oneToXRelationships_1.push(rel);
                    }
                    rel.addForeignKey(fk);
                });
                //Build one-to-many and one-to-one relationships based on uniqueness
                oneToXRelationships_1.forEach(function (rel) {
                    var xSideColumns = rel.foreignKeys.map(function (fk) { return fk.column; });
                    var xSideTable = xSideColumns[0].table;
                    var uniqueConstraint = constraints.find(function (constraint) {
                        return constraint.table === xSideTable
                            && constraint.constraintType === 'UNIQUE'
                            && constraint.columns.length === xSideColumns.length
                            && constraint.columns.every(function (col) { return xSideColumns.lastIndexOf(col) > -1; });
                    });
                    if (uniqueConstraint) {
                        oneToOneRelationships.push(OneToOneRelationship.createFromOneToXRelationship(rel, oneToOneRelationships.length));
                    }
                    else {
                        oneToManyRelationships.push(OneToManyRelationship.createFromOneToXRelationship(rel, oneToManyRelationships.length));
                    }
                });
            }
            //Build many-to-many relationships
            oneToManyRelationships.forEach(function (rel, relIndex) {
                var relationshipsInvolvingTable = oneToManyRelationships.filter(function (rel2, rel2Index) {
                    return rel2Index > relIndex && rel2.manySideTable === rel.manySideTable;
                });
                relationshipsInvolvingTable.forEach(function (rel2) {
                    manyToManyRelationships.push(new ManyToManyRelationship(rel, rel2, manyToManyRelationships.length));
                });
            });
            //Bind relationships to tables
            tables.forEach(function (table) {
                table.oneToManyRelationships = oneToManyRelationships.filter(function (rel) {
                    return rel.oneSideTable === table ||
                        rel.manySideTable === table;
                });
                table.oneToOneRelationships = oneToOneRelationships.filter(function (rel) {
                    return rel.oneSideTable === table ||
                        rel.anotherSideTable === table;
                });
                table.manyToManyRelationships = manyToManyRelationships.filter(function (rel) {
                    return rel.manySide1Table === table ||
                        rel.manySide2Table === table;
                });
            });
            [oneToManyRelationships, oneToOneRelationships, manyToManyRelationships].forEach(function (XToXRelationships) {
                var tempXToXRelationships = XToXRelationships.slice();
                var _loop_1 = function () {
                    var currentRelationship = tempXToXRelationships.pop();
                    var sameTablesRels = tempXToXRelationships.filter(function (rel) {
                        return rel !== currentRelationship
                            && currentRelationship.involvesSameTables(rel);
                    });
                    currentRelationship.numberOfRelationshipsWithSameTables = sameTablesRels.length + 1;
                    currentRelationship.indexInSameTablesRelationships = sameTablesRels.length;
                    sameTablesRels.forEach(function (rel, index) {
                        rel.numberOfRelationshipsWithSameTables = sameTablesRels.length + 1;
                        rel.indexInSameTablesRelationships = index;
                        tempXToXRelationships.splice(tempXToXRelationships.lastIndexOf(rel), 1);
                    });
                };
                while (tempXToXRelationships.length > 0) {
                    _loop_1();
                }
            });
            var annotationsService = new AnnotationsService(tables, _this._projectConfig);
            var annotations = annotationsService.getAnnotations();
            return new Schema({
                oneToOneRelationships: oneToOneRelationships,
                oneToManyRelationships: oneToManyRelationships,
                manyToManyRelationships: manyToManyRelationships,
                tables: tables,
                columns: columns,
                foreignKeys: foreignKeys,
                constraints: constraints,
                annotations: annotations
            });
        });
    };
    return SchemaService;
}(DbService));
module.exports = SchemaService;
//# sourceMappingURL=schema.service.js.map