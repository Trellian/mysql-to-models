"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var generate = require("./generate");
var init = require("./init");
var argv = yargs.usage('mysql-objection <command> [args]')
    .command('init', 'Init the config file', function () {
    init.run();
})
    .command('generate [config] [jsonSchemaPath]', 'Generates the models', (function (arv) {
    return yargs.options({
        config: {
            alias: 'c',
            default: 'objection-config.json'
        },
        modelPath: {
            alias: 'o',
            default: './data/objection'
        }
    });
}), (function (argv) {
    generate.run(argv);
}))
    .help()
    .argv;
//# sourceMappingURL=index.js.map