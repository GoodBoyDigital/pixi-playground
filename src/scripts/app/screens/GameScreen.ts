import { BaseScreen } from '@play-co/astro';
import { Container } from 'pixi.js';

import type { Application } from '../Application';

export class GameScreen extends BaseScreen {
    public override app: Application;
    public override manifests: string[] = [];
    public override view: Container;
    public gameView: Container;
    public stage: Container;


    constructor(app: Application) {
        super(app);
        this.app = app;
        this.view = new Container();
        this.gameView = new Container();
        this.stage = new Container();
        
    }

    public init(): void {
       
      
        
    }

    public show(): void {
        this.resize(this.width, this.height);
    }

    public override resize(w: number, h: number): void {
        super.resize(w, h);
      
    }

    
}
