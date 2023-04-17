import { BasisParser } from '@pixi/basis';
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
import { Assets,Container,loadBasis } from 'pixi.js';
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
        
        await Assets.init({
            texturePreference:{
                format:['basis', 'avif', 'webp', 'png', 'jpg', 'jpeg']
            }
        })

        Assets.loader.addParser(loadBasis);
        
        BasisParser.loadTranscoder(
            'https://cdn.jsdelivr.net/npm/@pixi/basis@6.3.2/assets/basis_transcoder.js',
            'https://cdn.jsdelivr.net/npm/@pixi/basis@6.3.2/assets/basis_transcoder.wasm'
        );

        
        this.resize = this.add(ResizePlugin, {
            resizeFunction: gameResize(1024, 768),
        });
   
        await this.init();

        const baseTextureOptions =  {
            scaleMode:SCALE_MODES.NEAREST
        }

       

//        const texture3: Texture = await Assets.load(`https://pixijs.io/compressed-textures-example/images/kodim20.basis`);
            


    Assets.add('pic-sensei', 'assets/pic-sensei.{basis,jpg}')
        const texture3: Texture = await Assets.load(`pic-sensei`);
       // const texture4: Texture = await Assets.load(`assets/pic-sensei.jpg`);


        const s = new Sprite(texture3);
//        const s2 = new Sprite(texture4);// 'assetpic-sensei.jpg');

        
        this.stage.stage.addChild(s)
    //    this.stage.stage.addChild(s2)


        s2.x = 100;

        return
        
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


       Assets.addBundle('crypto', {
           bg: 'assets/crypto/bg@{0.5,1,2}x.{png,web}',
           'tile-miss': 'assets/crypto/col4-1@{0.5,1,2}x.{png,web}',
           'tile-empty': 'assets/crypto/col4-2@{0.5,1,2}x.{png,web}',
           'tile-matchLetter': 'assets/crypto/col4-3@{0.5,1,2}x.{png,web}',
           'tile-matchAll': 'assets/crypto/col4@{0.5,1,2}x.{png,web}',
           'title': 'assets/crypto/web3dle@{0.5,1,2}x.{png,web}'
       })
       
        await Assets.loadBundle('crypto');

    //     'bg',
    //     'tile-miss',
    //     'tile-empty',
    //     'tile-matchLetter',
    //     'tile-matchAll',
    //     'title'
       // ])

       function spriteFromTexture(id:string):Sprite
       {
            return  Sprite.from(id) ;// (Assets.get<Texture>(id) as Texture)
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
            const frame = new Graphics().beginFill(0xFF0000)
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
        
       const nft = buildWeb3dlNFT(data);

        this.stage.stage.addChild(nft)

        // Assets.addBundle('preloadAssets', {
        //     playcoLogo: './assets/preload/logo@2x.{png,webp}',
        //     playcoLogo2: './assets/preload/logo@2x.{png,webp}',
        // })

      
        // Assets.addBundle('mainGame', {
        //     maindude: './assets/preload/logo@2x.{png,webp}',
        //     playcoLogo2: './assets/preload/logo@2x.{png,webp}',
        // })

        // const assets = await Assets.loadBundle('preloadAssets');


        // Assets.addBundle('preloadAssets', {
        //     playcoLogo: './assets/preload/logo@2x.{png,webp}',
        //     playcoLogo2: './assets/preload/logo@2x.{png,webp}',
        // })


        // Assets.addBundle('preloadAssets', [
        //         {
        //             name:['playcoLogo','kmlklm'],
        //             src:'./assets/preload/logo@2x.{png,webp}',
        //         },
        //         {
        //             name:'playcoLogo2',
        //             src:'./assets/preload/logo@2x.{png,webp}',
        //         },
        //     ]
        // )


    //    Assets.load('playco-logo', [
    //         {
    //             data:{scaleMode:SCALE_MODES.NEAREST},
    //             src:'./assets/preload/logo@2x.png'
    //         }
    //     ])

        const texture = await Assets.load('bg');

        
        // const texture = await Assets.load({
        //     src:'assets/preload/logo@2x.png',
        //     data:{scaleMode:SCALE_MODES.NEAREST},
        // });

        // const texture = await Assets.load({
        //     src:'assets/preload/logo@2x.png',
        //     data:{scaleMode:SCALE_MODES.NEAREST},
        // });

        // Assets.add('playco-logo','./assets/preload/logo@2x.{png,webp}');
        // const texture = await Assets.load('playco-logo');
     //   const texture = await Assets.load('./assets/preload/logo@2x.{png,webp}');


       
        const container = new Container();


        const sprite = new Sprite(texture);

        
        sprite.anchor.set(0.5)
        sprite.interactive = true;
        sprite.buttonMode = true;

        sprite.addListener('pointerdown', ()=>{
           
            const sprite =  new Sprite(texture);

            sprite.x = Math.random() * window.innerWidth
            sprite.y = Math.random() * window.innerHeight
            this.stage.stage.addChild(sprite);
        });

        console.log(sprite);

        sprite.x = 300
        sprite.y = 300

        sprite.scale.set(10);
        // container.x = 400
        // container.y = 200
        
        container.addChild(sprite);
        
      //  this.stage.stage.addChild(container)
        
        
    //     console.log('container',container.stage)
    //     sprite.x = 100;
    //   ///  await waitAFrame()
        
        
    //     console.log('<><><>WAIT<><><>')
        
       // sprite.x = 0;
       // container.x = 0
       
// console.log(sprite.stage);




        


      //  sprite.x = 500// //this.stage.renderer.width/2;
      //  sprite.scale.set(30)
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

      // this.sta//ge.stage.addChild(mask);

        const mask2 = new Graphics().beginFill(0xFFFF00, 0.2).drawRect(0, 0, 500, 500);

       // this.stage.stage.addChild(mask2);
      //  sprite.mask = mask;

        const update = ()=>{

            sprite.rotation += 0.01;
            requestAnimationFrame(update);
            
        }

      //  update()
        // const renderTexture = RenderTexture.create({
        //     width: 250,
        //     height: 250,
        //     resolution:1,// 0.01,
        // })

        // this.stage.renderer.render(this.stage.stage, {
        //     renderTexture,
        // });

        // const sprite3 = new Sprite(renderTexture);

        // this.stage.stage.addChild(sprite3);
        
        // sprite3.scale.set(0.5);
        // sprite3.x = 500;
        // requestAnimationFrame(update);
    }


  

   
}
// ////