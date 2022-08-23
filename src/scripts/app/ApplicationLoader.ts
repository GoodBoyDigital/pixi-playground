import type {
    AppConfig , 
    OrientationPlugin,
    ResourcePlugin,    ScreensPlugin, 
    SoundPlugin, 
    StatsPlugin,
     VignettePlugin, 
     VisibilityPlugin } from '@play-co/astro';
import {
    Application as AstroApp , 
    gameResize,
    ResizePlugin,
    ResourceManager, 
    StagePlugin
} from '@play-co/astro';
import {Loader, Text, Texture } from 'pixi.js';
import {Assets, Graphics,RenderTexture, Sprite } from 'pixi.js';

import manifest from '../manifest.json';
import type { Controller } from './Controller';
import { convertManifest } from './convertManifest';

const pixiManifest = convertManifest(manifest);



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

        await Assets.init({
            manifest: pixiManifest,
            texturePreference:{
                resolution:2,
                // /format: ['jpg','png'],
            }
        })

        const t = performance.now();
        // await Assets.loadBundle('default');

       // for(let i = 0; i < 10000; i++)
        {

          await Assets.loadBundle('default');
       }
       
        console.log('TIMTAKEN -> ', performance.now() - t)

        // test that

        const t2 = performance.now();
        const defaultx = pixiManifest.bundles.find(b => b.name === 'default');

        for(let i = 0; i < defaultx.assets.length; i++)
        {
            
       //     console.log('>>>', defaultx.assets[i].srcs[0]?.src )

      //      Loader.shared.add(defaultx.assets[i].srcs[1]?.src ?? defaultx.assets[i].srcs[1]);
        }

        Loader.shared.load(() => {
            console.log('LOADED')

            console.log('TIMTAKEN 2 -> ', performance.now() - t2)
        })
        // Loader.shared.add()
        await Assets.load('assets/fonts/outfit.woff2');
      

        this.stage = this.add(StagePlugin, { name: 'stage' });
      
        await this.init();

        this.stage.renderer.resize(window.innerWidth, window.innerHeight);

        const bunnyTexture = Assets.getTextureSync('profile-adnan.jpg');
       
        const bunnySprite = new Sprite(bunnyTexture);

        bunnySprite.anchor.set(0.5);

        bunnySprite.x = window.innerWidth/2
        bunnySprite.y = window.innerHeight/2

        bunnySprite.scale.set(3)
        this.stage.mainContainer.addChild(bunnySprite);


        const text = new Text('Hello World', {
            fill:0xFFFFFF,
            fontFamily: 'outfit',
        })

        this.stage.mainContainer.addChild(text);


      
        return;

        // this.resources = this.add(ResourcePlugin, {
        //     name: 'resource',
        //     manifest,
        //     version: 'high',
        // });
        
        
        
        this.resize = this.add(ResizePlugin, {
            resizeFunction: gameResize(1024, 768),
        });
   
        await this.init();

        const texture = Texture.EMPTY// await ResourceManager.loadAsset<Texture>('bunny.png');

        const sprite = new Sprite(texture);

        sprite.interactive = true;
        sprite.buttonMode = true;

        sprite.addListener('pointerdown', ()=>{
            console.log('click');
        });

        console.log(sprite);

        this.stage.stage.addChild(sprite);

      //  sprite.x = 500// //this.stage.renderer.width/2;
        sprite.scale.set(30)
       // sprite.anchor.set(0.5);
      // /  sprite.y = 500// this.stage.renderer.height/2;
        
        const sprite2 = new Sprite(texture);

//        this.stage.stage.addChild(sprite2);

      //  sprite2.x = 500// //this.stage.renderer.width/2;
        sprite2.scale.set(30)
   //     sprite2.anchor.set(0.5);
        sprite2.y = 500// this.stage.renderer.height/2;
        sprite2.alpha = 0.4;

        const mask = new Graphics().beginFill(0xFF0000).drawRect(0, 0, 500, 500);

      // this.stage.stage.addChild(mask);

        const mask2 = new Graphics().beginFill(0xFFFF00, 0.2).drawRect(0, 0, 500, 500);

       // this.stage.stage.addChild(mask2);
      //  sprite.mask = mask;

        const update = ()=>{

            sprite.rotation += 0.01;
            requestAnimationFrame(update);
        }


        const renderTexture = RenderTexture.create({
            width: 250,
            height: 250,
            resolution:1,// 0.01,
        })

        this.stage.renderer.render(this.stage.stage, {
            renderTexture,
        });

        const sprite3 = new Sprite(renderTexture);

        this.stage.stage.addChild(sprite3);
        
        sprite3.scale.set(0.5);
        sprite3.x = 500;
        // requestAnimationFrame(update);
    }


  

   
}
