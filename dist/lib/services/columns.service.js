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
var Column = require("../models/column.model");
var ColumnsService = /** @class */ (function (_super) {
    __extends(ColumnsService, _super);
    function ColumnsService(dbConnection, dbConfig) {
        return _super.call(this, dbConnection, dbConfig) || this;
    }
    ColumnsService.prototype.getColumns = function () {
        if (!this._getColumnsSql) {
            this._getColumnsSql = "SELECT *\n                FROM INFORMATION_SCHEMA.COLUMNS\n                WHERE table_schema = '" + this._dbConfig.database + "';";
        }
        return this.query(this._getColumnsSql)
            .then(function (rows) {
            return rows.map(function (row, index) {
                return new Column(row, index);
            });
        });
    };
    return ColumnsService;
}(DbService));
module.exports = ColumnsService;
//# sourceMappingURL=columns.service.js.map