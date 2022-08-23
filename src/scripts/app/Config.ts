import type { ScreenPluginOptions, StageOptions } from '@play-co/astro';
import { AlphaTransition } from '@play-co/astro';

import { LoaderScreen } from './screens/LoaderScreen';

interface ConfigSettings {
    stage: StageOptions;
    screens: ScreenPluginOptions;
}

const Config = {
    screens: {
        main: {
            defaultTransitionClass: AlphaTransition,
            loaderScreenClass: LoaderScreen,
        },
        overlay: {
            defaultTransitionClass: AlphaTransition,
            loaderScreenClass: LoaderScreen,
        },
    },
    stats: {
        enabled: false,
    },
    stage: {
        alwaysOnAccessibility: false,
        accessibilityDebug: false,
        backgroundColor: 0x373737,
        clearBeforeRender: true,
        resolution: 2,
        antialias: true,
        forceCanvas: true,
    },
} as ConfigSettings;

export { Config };
