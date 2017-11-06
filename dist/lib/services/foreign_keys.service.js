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
var ForeignKey = require("../models/foreign_key.model");
var ForeignKeysService = /** @class */ (function (_super) {
    __extends(ForeignKeysService, _super);
    function ForeignKeysService(dbConnection, dbConfig) {
        return _super.call(this, dbConnection, dbConfig) || this;
    }
    ForeignKeysService.prototype.getForeignKeys = function () {
        if (!this._getTablesSql) {
            this._getTablesSql = "select\n                TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME\n                from INFORMATION_SCHEMA.KEY_COLUMN_USAGE\n                WHERE constraint_schema = '" + this._dbConfig.database + "' AND REFERENCED_TABLE_NAME IS NOT NULL;";
        }
        return this.query(this._getTablesSql)
            .then(function (rows) {
            return rows.map(function (row, index) { return new ForeignKey(row, index); });
        });
    };
    return ForeignKeysService;
}(DbService));
module.exports = ForeignKeysService;
//# sourceMappingURL=foreign_keys.service.js.map