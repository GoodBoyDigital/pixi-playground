import { Plugin, ScreensPlugin } from '@play-co/astro';

// this thing is in charge of overall state of the game
// this includes, volume, pause, start/stop game
export class Controller extends Plugin {
    public screens!: ScreensPlugin;

    public init(): void {
        this.screens = this.app.get(ScreensPlugin);
    }

    public start(): void {
        void this.startup();
    }

    public async startup(): Promise<void> {
        await this.toGame();
    }

    public async toGame(): Promise<void> {
        await this.screens.goto('game');
    }

    public async toTitle(): Promise<void> {
        await this.screens.overlay.goto('title');
    }
}
