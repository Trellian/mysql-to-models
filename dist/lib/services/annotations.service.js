"use strict";
var Annotation = require("../models/annotation.model");
var matchAnnotationsRegexp = /@([a-zA-Z][a-zA-Z0-9]*)(?:\(((?:(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")\s*,\s*)*(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*"))\))?/g;
var matchAnnotationPartsRegexp = /@([a-zA-Z][a-zA-Z0-9]*)(?:\(((?:(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")\s*,\s*)*(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*"))\))?/;
var matchAssignationsRegexp = /(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")/g;
var matchAssignationParts = /(\w(?:\w|\d)*)=((?:true)|(?:false)|(?:\d+(?:\.\d+)?)|"[^"\\]*(?:\\.[^"\\]*)*")/;
var AnnotationsService = /** @class */ (function () {
    function AnnotationsService(_tables, _projectConfig) {
        this._tables = _tables;
        this._projectConfig = _projectConfig;
    }
    AnnotationsService.parseAnnotations = function (str, index) {
        var annotations = str.match(matchAnnotationsRegexp) || [];
        return annotations.map(function (annotation) {
            try {
                var parts = annotation.match(matchAnnotationPartsRegexp);
                var annotationName = parts[1];
                var annotationValue_1 = null;
                if (parts[2]) {
                    annotationValue_1 = {};
                    var assignations = parts[2].match(matchAssignationsRegexp);
                    assignations.forEach(function (assignation) {
                        var assignationParts = assignation.match(matchAssignationParts);
                        annotationValue_1[assignationParts[1]] = JSON.parse(assignationParts[2]);
                    });
                }
                return new Annotation(annotationName, annotationValue_1, index++);
            }
            catch (e) {
                return null;
            }
        }).filter(function (a) { return a !== null; });
    };
    AnnotationsService.prototype.getAnnotations = function () {
        var annotations = [];
        this._tables.forEach(function (table) {
            table.annotations = AnnotationsService.parseAnnotations(table.tableComment, annotations.length);
            table.annotations.forEach(function (a) {
                a.table = table;
            });
            annotations = annotations.concat(table.annotations);
            table.columns.forEach(function (column) {
                column.annotations = AnnotationsService.parseAnnotations(column.columnComment, annotations.length);
                column.annotations.forEach(function (a) {
                    a.table = table;
                    a.column = column;
                });
                annotations = annotations.concat(column.annotations);
            });
        });
        if ('annotations' in this._projectConfig) {
            //database
            //tables
            if ('tables' in this._projectConfig.annotations) {
                var _loop_1 = function (tableName) {
                    var table = this_1._tables.find(function (t) { return t.tableName === tableName; });
                    if (!table) {
                        throw new Error("There is no table with name " + tableName + " when trying to append table annotations");
                    }
                    table.annotations = this_1._projectConfig.annotations.tables[tableName].map(function (a, index) {
                        var annotation = new Annotation(a.name, 'values' in a ? a.values : null, annotations.length + index);
                        annotation.table = table;
                        return annotation;
                    });
                    annotations = annotations.concat(table.annotations);
                };
                var this_1 = this;
                for (var tableName in this._projectConfig.annotations.tables) {
                    _loop_1(tableName);
                }
            }
            //columns
            if ('columns' in this._projectConfig.annotations) {
                var _loop_2 = function (tableName) {
                    var table = this_2._tables.find(function (t) { return t.tableName === tableName; });
                    if (!table) {
                        throw new Error("There is not table with name " + tableName + " when trying to append column annotations");
                    }
                    var _loop_3 = function (columnName) {
                        var column = table.columns.find(function (c) { return c.columnName === columnName; });
                        if (!column) {
                            throw new Error("There is not column with name " + columnName + " in table " + tableName + " when trying to append column annotations");
                        }
                        column.annotations = this_2._projectConfig.annotations.columns[tableName][columnName].map(function (a, index) {
                            var annotation = new Annotation(a.name, 'values' in a ? a.values : null, annotations.length + index);
                            annotation.table = table;
                            annotation.column = column;
                            return annotation;
                        });
                        annotations = annotations.concat(column.annotations);
                    };
                    for (var columnName in this_2._projectConfig.annotations.columns[tableName]) {
                        _loop_3(columnName);
                    }
                };
                var this_2 = this;
                for (var tableName in this._projectConfig.annotations.columns) {
                    _loop_2(tableName);
                }
            }
            //foreignKeys
        }
        return annotations;
    };
    return AnnotationsService;
}());
module.exports = AnnotationsService;
//# sourceMappingURL=annotations.service.js.map