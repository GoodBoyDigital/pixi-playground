import { BasisParser } from '@pixi/basis';
import type {
    AppConfig , 
    OrientationPlugin,ScreensPlugin, 
    SoundPlugin,
    StatsPlugin,
     VignettePlugin, 
     VisibilityPlugin} from '@play-co/astro';
import {        ResizePlugin} from '@play-co/astro';
import { 
     waitAFrame} from '@play-co/astro';
import {
    Application as AstroApp , 
    gameResize,
    ResourceManager, 
    ResourcePlugin
, 
StagePlugin} from '@play-co/astro';
import type { Texture } from 'pixi.js';
import { SCALE_MODES } from 'pixi.js';
import { Container } from 'pixi.js';
import {Text } from 'pixi.js';
import { Graphics,RenderTexture, Sprite } from 'pixi.js';

import manifest from '../manifest.json';
import type { Controller } from './Controller';


// const pixiManifest = convertManifest(manifest);



export class Application extends AstroApp {
    public readonly width = 1664;
    public readonly height = 768;

    public stats!: StatsPlugin;
    public stage!: StagePlugin;
    public resources!: ResourcePlugin;
    public resize!: ResizePlugin;
    public visibility!: VisibilityPlugin;
    public screens!: ScreensPlugin;
    public controller!: Controller;
    public orientation!: OrientationPlugin;
    public vignette!: VignettePlugin;
    public sound!: SoundPlugin;
  
    constructor(config: AppConfig) {
        super(config);
    }

    public async run(): Promise<void> {

        this.stage = this.add(StagePlugin);
        this.resize = this.add(ResizePlugin, {gameResize});

        this.resources = this.add(ResourcePlugin, {
            name: 'resource',
            manifest,
            version: 'high',
        });

        
        await this.init();


        await  this.resources.load('default');

        const sprite = Sprite.from('pic-sensei.jpg')

        sprite.anchor.set(0.5)
        sprite.interactive = true;
        sprite.buttonMode = true;

        sprite.addListener('pointerdown', ()=>{
           
            const sprite =  Sprite.from('pic-sensei.jpg')

            sprite.x = Math.random() * window.innerWidth
            sprite.y = Math.random() * window.innerHeight
            this.stage.stage.addChild(sprite);
        });

        sprite.scale.set(0.5)

        this.stage.stage.addChild(sprite)
        
        sprite.x = window.innerWidth/2;
        sprite.y = window.innerHeight/2;
        
    }


  

   
}
// ////