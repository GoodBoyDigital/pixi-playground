import { Entity2D, Scene2D } from '@goodboydigital/odie';
import { Container, Graphics, Renderer } from 'pixi.js';

import { Application } from '../app/Application';
import { GameScreen } from '../app/screens/GameScreen';

export interface GameOptions
{
    app: Application;
    stage: Container;
    renderer: Renderer;
    screen: GameScreen;
}

export class Game extends Scene2D
{
    app: Application;
    stage: Container;
    renderer: Renderer;
    screen: GameScreen;

    constructor(options: GameOptions)
    {
        super(options.stage);

        this.app = options.app;
        this.stage = options.stage;
        this.renderer = options.renderer;
        this.screen = options.screen;
    }

    init(): void
    {
        // add systems
    }

    run(): void
    {
        const entity = new Entity2D();
        const temp = new Graphics().beginFill(0xFF0000).drawRect(-16, -16, 32, 32);

        temp.scale.set(10);
        entity.view.addChild(temp);

        this.addToScene(entity);
    }
}
