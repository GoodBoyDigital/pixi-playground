const path = require('path');
const pkg = require(path.join(process.cwd(), './package.json'));

/** @type {import('@goodboydigital/fido-build').FidoConfig} */
const config = {
    mode: 'development',
    clean: false,
    // NOTE: uncomment for spine
    // codeConfig: {
    //     providedVariables: {
    //         PIXI: 'pixi.js',
    //     },
    // },
    assetsConfig: {
        handlebar: {
            data: {
                TITLE: pkg.name,
            },
        },
    },
    codeConfig: {},
};

module.exports = config;
