import type { FidoConfig } from '@play-co/fido-build';

const config: FidoConfig = {
    mode: 'development',
    clean: false,
    codeConfig: {
        modern: true,
        // webpackConfig: {
        //     resolve: {
        //         alias: {
        //           'pixi.js': 'pixi.js-legacy',
               
        //         },
        //       },
        // }
    },
    assetsConfig: {
        handlebar: {
            data: {
                TITLE: process.env.APP_NAME,
                SDK: process.env.PLATFORM_SDK,
                PIXEL_ID: process.env.FB_PIXEL_ID,
                HTML_HEAD: process.env.HTML_HEAD,
            } as any,
        },
    },
    serveConfig: {
        https: false,
        localhost: false,
    },
};

export { config };
