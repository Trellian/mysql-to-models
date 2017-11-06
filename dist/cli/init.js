"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var fs = require("fs");
var path = require("path");
function run() {
    var questions = [
        {
            name: 'configFileName',
            message: 'Enter the config file name',
            default: 'config.json'
        },
        {
            name: 'host',
            message: 'Enter the database host',
            default: 'localhost'
        },
        {
            name: 'database',
            message: 'Enter the database name'
        },
        {
            name: 'user',
            message: 'Enter the database user',
            default: 'root'
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter the user password',
            default: ''
        },
        {
            name: 'modelPath',
            message: 'Enter the output folder for the generated objection.js models and graphql schemas',
            default: 'data/objection'
        },
    ];
    inquirer.prompt(questions).then(function (_a) {
        var configFileName = _a.configFileName, host = _a.host, database = _a.database, user = _a.user, password = _a.password, modelPath = _a.modelPath;
        var config = {
            minVersion: '0.0.1',
            database: {
                host: host,
                database: database,
                user: user,
                password: password
            },
            modelPath: modelPath
        };
        var configFileDir = path.resolve(process.cwd(), configFileName);
        fs.writeFileSync(configFileDir, JSON.stringify(config));
        console.info("Config file successfully created in \"" + configFileDir + "\"");
    });
}
exports.run = run;
//# sourceMappingURL=init.js.map