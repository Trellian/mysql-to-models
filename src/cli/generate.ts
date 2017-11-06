
import mysql = require('mysql');
import path = require('path');
import fs = require('fs');

var gulp = require('gulp');
var template = require('gulp-template');
var debug = require('gulp-debug-streams');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

import IProjectConfig = require('../lib/config/i-project-config');
import SchemaService = require('../lib/services/schema.service');
import Schema = require("../lib/models/schema.model");
import Table = require("../lib/models/table.model");
import {Serializer} from "xserializer";

export function run(argv: {config: string, jsonSchemaPath: string}) {

    if (process.argv.length < 1) {
        console.error(`Usage: mysql-objection <config>.json <jsonSchemaPath>`);
        process.exit();
    }

    let projectConfig: IProjectConfig;

    try {
        var configFileName = 'objection-config.json';
        
        if (argv.config !== null) {
            configFileName = argv.config;        
        }
        const file = path.resolve(process.cwd(), argv.config);

        console.log('*** Using config file: "' + file +'"');

        projectConfig = require(file);
    } catch (e) {
        console.error("Error opening config file", e);
        process.exit();
    }

    const modelPath: string = path.resolve(process.cwd(), projectConfig.modelPath);

    var schemaPath: string = null;
     
    if (argv.jsonSchemaPath) {
        schemaPath = path.resolve(process.cwd(), argv.jsonSchemaPath);
    }        

    const templatePath: string = path.resolve(__dirname, '../../template');
    
    console.log('Model Path: ' + modelPath);
    console.log('Schema Path: ' + schemaPath);
    console.log('Template Path: ' + templatePath);

    if (!fs.existsSync(templatePath))
        {
        console.log("*** Error opening template file");
        process.exit();
        }
    
    const dbConnection = mysql.createConnection(projectConfig.database);

    dbConnection.connect();

    const schemaService = new SchemaService(dbConnection, projectConfig.database, projectConfig);

    schemaService.getSchema().then(schema => {
        const serializer = new Serializer(schema);
        const serializedSchema = serializer.serialize();
        
        console.log('Processing Tables\n------------------------');  

        if (modelPath !== null) {
            
            schema.tables.forEach(table => {

                console.log('Table: ' + table.tableName);
    
                gulp.task(table.tableName + '_base_model', 
                    generate_base_models(
                        templatePath + '/objection/base_model.tpl', 
                        modelPath + '/base', 
                        schema, 
                        table));
                    
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
 
            gulp.task('index', 
                generate_index(
                    templatePath + '/objection/index.tpl', 
                    modelPath, 
                    schema));


            console.info(`models and schema successfully saved in "${modelPath}"`);
        }
        
    const content = JSON.stringify(serializedSchema, null, 4);

    if (schemaPath !== null) {
            fs.writeFileSync(schemaPath + '/schema.json', content);
            console.info(`models and schema successfully saved in "${schemaPath}"`);
        } else {
//            process.stdout.write(content);
        }
    });

    process.on('unhandledRejection', (reason: any) => {
        console.log('Reason: ' + reason);
        if (reason instanceof Error) {
            console.error(reason.stack);
        }
    });

    dbConnection.end();
}

function generate_base_models (templatePath: string, modelPath: string, schema: Schema, table: Table) {
    gulp.src(templatePath)
        .pipe(template({schema: schema, table: table }))
        .pipe(rename(table.pascalName + 'BaseModel.js'))  
//        .pipe(debug({ title: 'basemodel.js: '}))
        .pipe(gulp.dest(modelPath));
}

function generate_models (templatePath: string, modelPath: string, table: Table) {
   gulp.src(templatePath)
        .pipe(template({table: table }))
        .pipe(rename(table.pascalName + 'Model.js'))  
        .pipe(gulp.dest(modelPath), {overwrite : false});
}

function generate_index (templatePath: string, modelPath: string, schema: Schema) {
    debugger;
    gulp.src(templatePath)
        .pipe(template({schema: schema }))
        .pipe(rename('index.js'))  
//        .pipe(debug({ title: 'index.js: '}))
        .pipe(gulp.dest(modelPath));
}

