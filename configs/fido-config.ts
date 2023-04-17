import type { FidoConfig } from '@play-co/fido-build';

const config: FidoConfig = {
    mode: 'development',
    clean: false,
    codeConfig: {
        modern: true,
        analyse: true,
        webpackConfig:{
            optimization:
            {
                splitChunks: {
                   // minSize: 0,
                }
            }
        }
      //  analyse:true,
        // webpackConfig: {
        //     resolve: {
        //         alias: {
        //           'pixi.js': 'pixi.js-legacy',
               
        //         },
        //       },
        // }
    },
    assetsConfig: {
        imageResolutions: {
            prefixTemplate: '@%%x',
            resolutions: { default:1, low:0.5, high:2 },
            fixedResolution: 'default',
            maximumTextureSize: 4096,
        },
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
        localhost: true,
    },
};

export { config };
