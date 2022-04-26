import {
    LoaderScreen,
    PreloadOptions,
    ScreenPluginOptions,
    StageOptions,
} from '@goodboydigital/astro';

interface ConfigSettings
{
    stage: StageOptions
    screens: ScreenPluginOptions
    preload: PreloadOptions
}

const Config = {
    screens: {
        main: {
            loaderScreenClass: LoaderScreen,
        },
        overlay: {
            loaderScreenClass: LoaderScreen,
        },
    },
    preload: {
        loaderScreenClass: LoaderScreen,
    },
    stage: {
        alwaysOnAccessibility: false,
        accessibilityDebug: false,
        backgroundColor: 0x0,
        clearBeforeRender: true,
        resolution: 1,
        antialias: true,
    },
    resource: {
        basis: {
            js: './basis/basis-transcoder.js',
            wasm: './basis/basis-transcoder.wasm',
        },
    }
} as ConfigSettings;

export { Config };

