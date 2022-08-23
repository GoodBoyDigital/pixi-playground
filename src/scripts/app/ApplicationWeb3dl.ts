import type {
    AppConfig , 
    OrientationPlugin,    ScreensPlugin, 
    SoundPlugin,
    StatsPlugin,
     VignettePlugin, 
     VisibilityPlugin} from '@play-co/astro';
import { 
     waitAFrame} from '@play-co/astro';
import {
    Application as AstroApp , 
    gameResize,
    ResizePlugin,
    ResourceManager, 
    ResourcePlugin
, 
StagePlugin} from '@play-co/astro';
import type { Texture } from 'pixi.js';
import { SCALE_MODES } from 'pixi.js';
import { Assets,Container } from 'pixi.js';
import {Text } from 'pixi.js';
import { Graphics,RenderTexture, Sprite } from 'pixi.js';

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

        this.stage = this.add(StagePlugin);

        this.resources = this.add(ResourcePlugin, {
            name: 'resource',
            manifest,
            version: 'high',
        });
        
        
        
        this.resize = this.add(ResizePlugin, {
            resizeFunction: gameResize(1024, 768),
        });
   
        await this.init();

        const baseTextureOptions =  {
            scaleMode:SCALE_MODES.NEAREST
        }


        // const texture = await Assets.add('playco-logo', './assets/preload/logo@2x.{png,webp}', baseTextureOptions, true); 

        // TODO test for:

        // Assets.add('playco-logo', [{
        //     src:'./assets/preload/logo@2x.{png,webp}'
        // }]
        // and for:
        //   Assets.add('playco-logo', ['./assets/preload/logo@2x.{png,webp}'])

        // and also for directly loading somthing...

        // texture = await Assets.load('playco-logo', [
        //     {
        //         data:{scaleMode:SCALE_MODES.NEAREST},
        //         src:'./assets/preload/logo@2x.png'
        //     },
        //     {
        //         data:{scaleMode:SCALE_MODES.LINEAR},
        //         src:'./assets/preload/logo@2x.web'
        //     }
        // ])
        // ]), {
        //     scaleMode:SCALE_MODES.NEAREST
        // })

        // Assets.add('playco-logo', './assets/preload/logo@2x.{png,webp}', {
        //         scaleMode:SCALE_MODES.NEAREST
        //     })


           // Assets.load('assets/preload/logo@2x.png')
            
            // , {
            //     scaleMode:SCALE_MODES.NEAREST
            // })
        // ]), {
        //     scaleMode:SCALE_MODES.NEAREST
        // })

       // const image =  require('../../../assets/playco-logo.png');
        
       await Assets.init({
           texturePreference:{
               resolution:2
           }
       });


     
       const loadAssets = async ():Promise<void> =>
       {
        Assets.add('bg', 'assets/crypto/bg@{0.5,1,2}x.{png,web}')
        Assets.add('tile-miss', 'assets/crypto/col4-1@{0.5,1,2}x.{png,web}')
        Assets.add('tile-empty', 'assets/crypto/col4-2@{0.5,1,2}x.{png,web}')
        Assets.add('tile-matchLetter', 'assets/crypto/col4-3@{0.5,1,2}x.{png,web}')
        Assets.add('tile-matchAll', 'assets/crypto/col4@{0.5,1,2}x.{png,web}')
        Assets.add('title', 'assets/crypto/web3dle@{0.5,1,2}x.{png,web}')
       
       await Assets.load([
        'bg',
        'tile-miss',
        'tile-empty',
        'tile-matchLetter',
        'tile-matchAll',
        'title'
       ])

       }

     

       function spriteFromTexture(id:string):Sprite
       {
            return new Sprite(Assets.get<Texture>(id) as Texture)
       }

       const validateData = (data:{score:number, cells:number[]}):boolean =>
       {
            if(data.score === undefined)
            {
                return false;
            }

            if(data.cells.length !== 5*6)
            {
                return false;
            }

            if(data.cells.find(cell => cell !== 0 && cell !== 1 && cell !== 2 && cell !== 3))
            {
                return false;
            }

            return true;

       }

       const buildWeb3dlNFT = (data:{score:number, cells:number[]}) => {

            // validate..
            if(!validateData(data))
            {
                throw new Error('Invalid data');
            }

            const width =  1440/2

            const container = new Container();

            const bg = spriteFromTexture('bg');
            const title = spriteFromTexture('title')
            const label = new Text(data.score.toString(), {
                fill:0xFFFFFF,
                fontSize:40,
            })

            label.anchor.set(0.5);

            container.addChild(bg);
            container.addChild(title);
            container.addChild(label);

            title.anchor.set(0.5, 0.5);
            title.x = width/2
            title.y = 50;

            label.x = width/2
            label.y = 110;

            const tilesContainer = new Container();
            
            const textureMap = [
                'tile-empty',
                'tile-miss',
                'tile-matchLetter',
                'tile-matchAll'
            ]

            for(let i = 0; i < 5*6; i++) 
            {
                
                const sprite = spriteFromTexture(textureMap[data.cells[i]]);
                
                tilesContainer.addChild(sprite);

                sprite.x = (i % 5) * 116
                sprite.y = ((i / 5)|0) * 116
            }

            container.addChild(tilesContainer);

            const framePadding = 30;
            const frame = new Graphics().beginFill(0x333333, 0.6)
                .drawRect(
                    -framePadding, 
                    -framePadding, 
                    tilesContainer.width+framePadding+framePadding, 
                    tilesContainer.height +framePadding+framePadding
            );

            tilesContainer.addChildAt(frame, 0);

            tilesContainer.x = width/2 - tilesContainer.width/2 + framePadding
            tilesContainer.y = 180
            
            return container;
      }
       
      const data = {score:1, cells:[
        1,1,2,1,2,
        1,3,1,1,1,
        3,3,3,3,3,
        0,0,0,0,0,
        0,0,0,0,0,
        0,0,0,0,0,
    ]}
        
    await loadAssets();
    
       const nft = buildWeb3dlNFT(data);

        this.stage.stage.addChild(nft)
    }


  

   
}
// ////