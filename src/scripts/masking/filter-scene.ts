import type { WebGPURenderer } from 'blaze';
import { DisplacementFilter } from 'blaze';
import { TextureSource } from 'blaze';
import { Rectangle } from 'blaze';
import { BufferImageSource,ImageSource } from 'blaze';
import { getGlobalBounds } from 'blaze';
import { Sprite } from 'blaze';
import { Container, Stage, Texture } from 'blaze';
import { 
    BLEND_MODES,
    BlendMode,
    Bounds,
    Buffer,
    ColorBurnFilter,
    ColorMatrixFilter,
    Filter,
    Geometry, 
    GlobalTestFilter,
    Graphics, 
    GraphicsContext,
    NoiseFilter, 
    Program, 
    Shader} from 'blaze';

import shaderCode from './coloured-triangle.wgsl';
import { loadTexture } from './textureUtils';


export async function filterScene(renderer:WebGPURenderer) {

    
     const fruit1 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_01.png')
     const avacado = await loadTexture('./assets/pic-sensei@2x.webp')
    // const eggplant = await loadTexture('./assets/targetpic-03.webp')
     const sensaiTexture = await loadTexture('https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg')
     const texture = await loadTexture('./assets/rabbitv3@2x.png');
     const tilingTest = await loadTexture('./assets/texture-test.jpeg');
   

    const container = new Container();

    const root = new Container();

    const backSprite = new Sprite(tilingTest);
    const frontSprite = new Sprite(avacado);
    const frontSprite2 = new Sprite(avacado);

  //  frontSprite2.alpha =0.1;
    
    backSprite.width = 800;
    backSprite.height = 600;

    const grap = new Graphics(
        new GraphicsContext().circle(0, 0, 100).fill(0xff0000)
      );



 //   root.addChild(backSprite);
    root.addChild(container);
    // root.addChild(grap);
   
    // const filter = new ColorMatrixFilter({
    //     resolution:1,
    //    // blendRequired:true,
    //    // antialias:true,
    // })

//     const multipassFilter = new MultiPassFilter({
//         noise:1.0,
//         texture:tilingTest,
// //        texture:Texture.EMPTY,
//         // blendRequired:true,
//         // antialias:true,
//     })

    const noiseFilter = new NoiseFilter({
        noise:1.0,//
        texture:tilingTest,
//        texture:Texture.EMPTY,
        // blendRequired:true,
        // antialias:true,
    })


    const noiseFilter2 = new NoiseFilter({
        noise:1.0,//
        texture:tilingTest,
//        texture:Texture.EMPTY,
        // blendRequired:true,
        // antialias:true,
    })

    // container.filters = [noiseFilter]// , noiseFilter]// , noiseFilter, noiseFilter];
    
    // const displacementFilter = new DisplacementFilter({
    //     sprite:backSprite,
    //     //  blendRequired:true,
    //    // noise:1,
    //    // texture:tilingTest,
    //    // antialias:true,
    // })

    // const overlayFilter = new OverlayFilter()
    // const colorBurnFilter = new ColorBurnFilter();


    // const testFilter = new GlobalTestFilter({
    //     texture:tilingTest,
    //     sprite:backSprite,
    // })    
    
    
    // colorFilter.hue(900);

  //  renderer.uniformGroup.updateUniformGroup(filter.uniforms);
    
    const bunnies = [];

   // container.attachRenderGroup();
   
 container.addChild(frontSprite);
   for (let i = 0; i < 100; i++) {
       const bunny = new Sprite(texture);
       
        bunny.x =   Math.random() * 200;
       bunny.y =  Math.random() * 200;
       bunny.rotation = Math.random() * (Math.PI * 2);
       bunny.scale.set(10)
       container.addChild(bunny);
    // bunny.blendMode = BLEND_MODES.COLOR_DODGE;
       // bunny.anchor.set(0.5);
       bunny.filters = [noiseFilter];
       bunnies.push(bunny);
    }
    
     // container.addChild(frontSprite2);
    // 0.0040, 0, 0, 0, 0.0040, 0, -1.4000, -1.4000, 1
    noiseFilter.debug = true;
    // container.filters = [noiseFilter2];
    const rt = new Texture({
        source: new TextureSource({
            width: 300,
            height: 300,
        })
    });

    
    const sprite = new Sprite(rt);

    sprite.x = 450;
    sprite.y = 40;
   
    
//  container.attachRenderGroup();
   // root.addChild(sprite);
   /*
   * All the bunnies are added to the container with the addChild method
   * when you do this, all the bunnies become children of the container, and when a container moves,
   * so do all its children.
   * This gives you a lot of flexibility and makes it easier to position elements on the screen
   */
  // container.x = 300;
  // container.y = 360;
  
  backSprite.x = 0;
  backSprite.y = 0;
  // backSprite.alpha = 0.2
  // backSprite.scale.set(4,2)
  // frontSprite.x = 400;
  // frontSprite.alpha = 0.1
 // frontSprite.anchor.set(0.5)
//  frontSprite.rotation = 0.2
  frontSprite.scale.set(1)

  frontSprite2.anchor.set(0.5)
  frontSprite2.rotation = 0.2
  frontSprite2.scale.set(1)
  
  
  const senseSprite= new Sprite(sensaiTexture);
  

const boundBox = new Graphics()

boundBox.context
    .rect(0, 0, 100, 100)
    .fill({color:0x00ff00, alpha:0.2})

//    root.addChild(boundBox);
// container.filters = [colorFilter];
 //  frontSprite.filters = [displacementFilter];
  // senseSprite.filters = [filter];
    // senseSprite.filters = [new Filter({
    //     resolution:1,
    //     blendRequired:true,
    //   //  antialias:false,
    // })];
    
    // frontSprite.addChild(senseSprite);

 //   container.filters = [noiseFilter];

    // container.scale.set(0.4)
    container.label = 'bunnyContainer'
    root.label = 'root'
    container.x =100;// 256/2// 360;
     container.y= 100;// /256/2// 320;
    const fruit  = new Sprite(fruit1);

  //  bunnies[0].addChild(fruit)
    fruit.scale.set(0.4)
   // fruit.filters = [noiseFilter];
    fruit.x = -30
    fruit.y = -30
//    uniforms
    // root.addChild(fruit);
    const update = () => {
        
        
        const bounds = getGlobalBounds(container, false, new Bounds());

        boundBox.x = bounds.x;
        boundBox.y = bounds.y;

        boundBox.width = bounds.width;
        boundBox.height = bounds.height;

    //    console.log(bounds)

        bunnies.forEach((bunny) => {
           bunny.rotation+= 0.007;
        });

   //     noiseFilter.seed = Math.random() * 2;
        // the 'true' clears the texture before the content is rendered
    //    renderer.render(container, rt);   
       
    renderer.render(root);
        
        
      //  console.log('SECOND RENDER:')
        
      //  renderer.render(root);
     //   renderer.render(root);
        
    // console.log(container.rotation * 360)
    //    colorFilter.hue((container.rotation * 360) % 360, false);
    //    container.rotation += 0.01;
       // renderer.render(container, rt);
         // renderer.render(root);
        // renderer.render(root);

      
     requestAnimationFrame(update);
    }

    update();

   // bunnies[0].scale.set(0.5)
    // update();
}






