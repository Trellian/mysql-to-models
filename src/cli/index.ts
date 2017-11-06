import * as yargs from 'yargs';
import * as generate from './generate';
import * as init from './init';

const argv = yargs.usage('mysql-objection <command> [args]')
    .command('init', 'Init the config file', () => {
        init.run();
    })
    .command('generate [config] [jsonSchemaPath]', 'Generates the models', <any>((arv : any) => {
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
    }), <any>((argv: {config: string, jsonSchemaPath: string}) => {
        generate.run(argv);
    }))
    .help()
    .argv;