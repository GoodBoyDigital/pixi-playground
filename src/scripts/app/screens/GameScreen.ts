import { BaseScreen, StagePlugin } from '@goodboydigital/astro';
import { Container } from 'pixi.js';

import { Game } from '../../game/Game';
import { Application } from '../Application';

export class GameScreen extends BaseScreen
{
    app: Application;
    options: {game: typeof Game};
    manifests: string[] = [];
    view: Container;
    gameView: Container;
    stage: Container;
    game: Game;

    constructor(app: Application, options: {game: typeof Game})
    {
        super(app);
        this.app = app;
        this.view = new Container();
        this.gameView = new Container();
        this.stage = new Container();
        this.options = options;
    }

    async init(): Promise<void>
    {
        this.game = new this.options.game({
            stage: this.stage,
            renderer: this.app.get(StagePlugin).renderer,
            app: this.app,
            screen: this,
        });
        this.gameView.addChild(this.stage);
        this.view.addChild(this.gameView);

        this.game.init();
    }

    show(): void
    {
        this.game.run();
        this.resize(this.width, this.height);
    }

    resize(w: number, h: number): void
    {
        super.resize(w, h);
        this.view.position.set(w / 2, h / 2);
        this.gameView.position.set(-w / 2, -h / 2);
        this.game && this.game.resize(w, h);
    }
}
