import { BaseScreen } from '@goodboydigital/astro';
import { Scene2D } from '@goodboydigital/odie';
import { Point, Sprite, Texture } from 'pixi.js';

import { Application } from '../Application';
import { Controller } from '../Controller';

export class TitleScreen extends BaseScreen
{
    app: Application;
    manifests: string[] = [];
    game: Scene2D;
    btn: Sprite;

    constructor(app: Application)
    {
        super(app);
        this.app = app;
    }

    async init(): Promise<void>
    {
        // TODO: Replace
        const btn = Sprite.from(Texture.WHITE);

        btn.width = btn.height = 200;
        btn.anchor.set(0.5);
        btn.interactive = btn.buttonMode = true;
        btn.on('pointertap', () =>
        {
            this.app.get(Controller).toGame();
        });

        this.btn = btn;
        this.view.addChild(this.btn);
        // TODO: Replace
    }

    show(): void
    {
        this.view.visible = true;
        this.resize(this.width, this.height);
    }

    hidden(): void
    {
        this.view.visible = false;
    }

    resize(w: number, h: number): void
    {
        super.resize(w, h);
        this.view.position.set(w / 2, h / 2);
    }
}
