"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var path = require("path");
var fs = require("fs");
var gulp = require('gulp');
var template = require('gulp-template');
var debug = require('gulp-debug-streams');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var SchemaService = require("../lib/services/schema.service");
var xserializer_1 = require("xserializer");
// require("json-circular-stringify");
function run(argv) {
    if (process.argv.length < 1) {
        console.error("Usage: mysql-objection <config>.json <jsonSchemaPath>");
        process.exit();
    }
    var projectConfig;
    try {
        var configFileName = 'objection-config.json';
        if (argv.config !== null) {
            configFileName = argv.config;
        }
        var file = path.resolve(process.cwd(), argv.config);
        console.log('*** Using config file: "' + file + '"');
        projectConfig = require(file);
    }
    catch (e) {
        console.error("Error opening config file", e);
        process.exit();
    }
    var modelPath = path.resolve(process.cwd(), projectConfig.modelPath);
    var schemaPath = null;
    if (argv.jsonSchemaPath) {
        schemaPath = path.resolve(process.cwd(), argv.jsonSchemaPath);
    }
    var templatePath = path.resolve(__dirname, '../../template');
    console.log('Model Path: ' + modelPath);
    console.log('Schema Path: ' + schemaPath);
    console.log('Template Path: ' + templatePath);
    if (!fs.existsSync(templatePath)) {
        console.log("*** Error opening template file");
        process.exit();
    }
    var dbConnection = mysql.createConnection(projectConfig.database);
    dbConnection.connect();
    var schemaService = new SchemaService(dbConnection, projectConfig.database, projectConfig);
    schemaService.getSchema().then(function (schema) {
        var serializer = new xserializer_1.Serializer(schema);
        var serializedSchema = serializer.serialize();
        //        console.log('Serialised Schema:\n', JSON.stringify(serializedSchema, null, 2));
        //        console.log('Serialised Schema:\n', JSON.stringify(schema));
        console.log('Processing Tables\n------------------------');
        if (modelPath !== null) {
            schema.tables.forEach(function (table) {
                console.log('Table: ' + table.tableName);
                gulp.task(table.tableName + '_base_model', generate_base_models(templatePath + '/objection/base_model.tpl', modelPath + '/base', schema, table));
                /*
                                try {   // Check whether the file exists, generate it if not
                                    fs.statSync(modelPath + '/'+ table.pascalName + 'Model.js');
                                } catch (e) {
                                    
                                    gulp.task(table.tableName + '_model',
                                        generate_models(
                                                templatePath + '/objection/model.tpl',
                                                modelPath,
                                                table));
                                }
                */
            });
            //            console.log('Processing Index\n------------------------');
            gulp.task('index', generate_index(templatePath + '/objection/index.tpl', modelPath, schema));
            console.info("models and schema successfully saved in \"" + modelPath + "\"");
        }
        var content = JSON.stringify(serializedSchema, null, 4);
        if (schemaPath !== null) {
            fs.writeFileSync(schemaPath + '/schema.json', content);
            console.info("models and schema successfully saved in \"" + schemaPath + "\"");
        }
        else {
            //            process.stdout.write(content);
        }
    });
    process.on('unhandledRejection', function (reason) {
        console.log('Reason: ' + reason);
        if (reason instanceof Error) {
            console.error(reason.stack);
        }
    });
    dbConnection.end();
}
exports.run = run;
function generate_base_models(templatePath, modelPath, schema, table) {
    gulp.src(templatePath)
        .pipe(template({ schema: schema, table: table }))
        .pipe(rename(table.pascalName + 'BaseModel.js'))
        .pipe(gulp.dest(modelPath));
}
function generate_models(templatePath, modelPath, table) {
    gulp.src(templatePath)
        .pipe(template({ table: table }))
        .pipe(rename(table.pascalName + 'Model.js'))
        .pipe(gulp.dest(modelPath), { overwrite: false });
}
function generate_index(templatePath, modelPath, schema) {
    debugger;
    gulp.src(templatePath)
        .pipe(template({ schema: schema }))
        .pipe(rename('index.js'))
        .pipe(gulp.dest(modelPath));
}
//# sourceMappingURL=generate.js.map