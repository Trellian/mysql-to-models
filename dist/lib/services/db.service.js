"use strict";
var DbService = /** @class */ (function () {
    function DbService(dbConnection, dbConfig) {
        this._dbConnection = dbConnection;
        this._dbConfig = dbConfig;
    }
    DbService.prototype.query = function (sql) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._dbConnection.query(sql, function (err, rows, fields) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    };
    return DbService;
}());
module.exports = DbService;
//# sourceMappingURL=db.service.js.map