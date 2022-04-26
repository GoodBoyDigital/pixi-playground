/** @type {import('@goodboydigital/fido-build').FidoConfig} */
const config = require('./fido-config');
const { FidoCompiler } = require('@goodboydigital/fido-build');

const args = {};

process.argv.forEach((val) =>
{
    args[val] = true;
});

(args.production || args.qa) && (config.mode = args.production ? 'production' : 'qa');
args.design && (config.assetsConfig.imageCompression = false);
config.clean = !!args.clean;
config.codeConfig.analyse = !!args.analyse;

if (args.legacy)
{
    // eslint-disable-next-line no-console
    console.log('[build.js] using legacy settings'.yellow.bold);
    config.codeConfig.devtool = false;
    config.codeConfig.modern = false;
}

if (args.design)
{
    config.assetsConfig.imageCompression = false;
    config.output = './artist';
}

const compiler = new FidoCompiler(config);

config.mode === 'development' ? compiler.watch() : compiler.run();
