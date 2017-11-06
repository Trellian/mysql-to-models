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
var Constraint = require("../models/constraint.model");
var ConstraintsService = /** @class */ (function (_super) {
    __extends(ConstraintsService, _super);
    function ConstraintsService(dbConnection, dbConfig) {
        return _super.call(this, dbConnection, dbConfig) || this;
    }
    ConstraintsService.prototype.getConstraints = function () {
        var sql = "SELECT *\n                FROM information_schema.table_constraints t\n                LEFT JOIN information_schema.key_column_usage k\n                USING(constraint_name, table_schema,table_name)\n                WHERE t.table_schema='" + this._dbConfig.database + "';";
        return this.query(sql)
            .then(function (rows) {
            var constraints = [];
            rows.forEach(function (row) {
                var constraint = constraints.find(function (constraint) {
                    return constraint.constraintName === row.CONSTRAINT_NAME
                        && constraint.tableName === row.TABLE_NAME;
                });
                if (!constraint) {
                    constraint = new Constraint(row, constraints.length);
                    constraints.push(constraint);
                }
                constraint.addColumnName(row.COLUMN_NAME);
            });
            return constraints;
        });
    };
    return ConstraintsService;
}(DbService));
module.exports = ConstraintsService;
//# sourceMappingURL=constraints.service.js.map