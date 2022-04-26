import {
    AppConfig,
    Application as AstroApp,
    gameResize,
    Orientation,
    OrientationPlugin,
    PreloadPlugin,
    ResizePlugin,
    ResourcePlugin,
    ScreensPlugin,
    StagePlugin,
    StatsPlugin,
    VisibilityPlugin,
} from '@goodboydigital/astro';

import { Game } from '../game/Game';
import manifest from '../manifest.json';
import { Controller } from './Controller';
import { GameScreen } from './screens/GameScreen';
import { TitleScreen } from './screens/TitleScreen';

// NOTE: add this if you want to load spine files
// addLoaderPlugins(loadSpine);

export class Application extends AstroApp
{
    readonly width = 1664;
    readonly height = 768;

    stats: StatsPlugin;
    stage: StagePlugin;
    resources: ResourcePlugin;
    resize: ResizePlugin;
    visibility: VisibilityPlugin;
    screens: ScreensPlugin;
    preloader: PreloadPlugin;
    controller: Controller;
    orientation: OrientationPlugin;

    constructor(config: AppConfig)
    {
        super(config);
    }

    public async run(): Promise<void>
    {
        this.resources = this.add(ResourcePlugin, { name: 'resource', manifest });
        this.stage = this.add(StagePlugin, { name: 'stage' });
        this.stats = this.add(StatsPlugin, { name: 'stats' });
        this.visibility = this.add(VisibilityPlugin);
        this.resize = this.add(ResizePlugin, { resizeFunction: gameResize(1024, 768) });
        this.orientation = this.add(OrientationPlugin, {
            imageUrl: 'assets/device/phone-turn.png',
            backgroundColor: '#F5F0D1',
            orientation: Orientation.LANDSCAPE,
        });
        this.screens = this.add(ScreensPlugin, { name: 'screens' });
        this.preloader = this.add(PreloadPlugin, { name: 'preload' });
        this.controller = this.add(Controller);

        this._addScreens();
        this.init();
    }

    private _addScreens(): void
    {
        this.screens.add(TitleScreen, {}, 'title');
        this.screens.add(GameScreen, { game: Game }, 'game');
    }

    // stage position helpers
    get stageLeft(): number
    {
        return -this.resize.width * 0.5;
    }

    get stageRight(): number
    {
        return this.resize.width * 0.5;
    }

    get stageTop(): number
    {
        return -this.resize.height * 0.5;
    }

    get stageBottom(): number
    {
        return this.resize.height * 0.5;
    }
}
