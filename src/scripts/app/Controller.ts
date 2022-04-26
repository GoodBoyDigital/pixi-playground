import { Plugin, ScreensPlugin, URLParams } from '@goodboydigital/astro';

// this thing is in charge of overall state of the game
// this includes, volume, pause, start/stop game
export class Controller extends Plugin
{
    public screens: ScreensPlugin;

    init(): void
    {
        this.screens = this.app.get(ScreensPlugin);
    }

    start(): void
    {
        this.startup();
    }

    async startup(): Promise<void>
    {
        const screen = URLParams.get('screen') as string || 'title';

        this.screens.goto(screen);
    }

    async toGame(): Promise<void>
    {
        await this.screens.goto('game');
    }

    async toTitle(): Promise<void>
    {
        await this.screens.goto('title');
    }
}
