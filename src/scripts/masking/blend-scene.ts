import type { WebGPURenderer } from 'blaze';
import { BLEND_MODES } from 'blaze';
import { MaskFilter } from 'blaze';
import { TextureSource } from 'blaze';
import { Rectangle } from 'blaze';
import { BufferImageSource,ImageSource } from 'blaze';
import { getGlobalBounds } from 'blaze';
import { Sprite } from 'blaze';
import { Container, Stage, Texture } from 'blaze';
import { 
    BlendMode, 
    Buffer,
    ColorBurnFilter,
    ColorMatrixFilter,
    Filter,
    Geometry, 
    GlobalTestFilter,
    NoiseFilter, 
    OverlayFilter,
    Program, 
    Shader 
} from 'blaze';

import shaderCode from './coloured-triangle.wgsl';
import { loadTexture } from './textureUtils';


export async function blendScene(renderer:WebGPURenderer) {

    
    const fruit1 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_01.png')
    const avacado = await loadTexture('./assets/targetpic-02.webp')
    const eggplant = await loadTexture('./assets/targetpic-03.webp')
    const sensaiTexture = await loadTexture('https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg')
    const texture = await loadTexture('./assets/rabbitv3@2x.png');
    const tilingTest = await loadTexture('./assets/ripples.png');
   

    const container = new Container();

    const root = new Container();

    const backSprite = new Sprite(eggplant);
    const frontSprite = new Sprite(tilingTest);

//     const displacementFilter = new MaskFilter({
//       sprite:frontSprite,
//       scale:100,
//       //  texture:tilingTest,
// //        texture:Texture.EMPTY,
//         // blendRequired:true,
//         // antialias:true,
//     })

//    backSprite.scale.set(1.3);
    
     frontSprite.x = 350
     frontSprite.y = 350

     frontSprite.anchor.set(0.5);
     frontSprite.scale.set(0.5);

   // backSprite.blendMode = BLEND_MODES.SCREEN
   frontSprite.blendMode = BLEND_MODES.COLOR_BURN;
//     frontSprite.width = 200// frontSprite.width;
     
    // frontSprite.rotation = 0.5
   //  frontSprite.alpha = 0.001
    //  frontSprite.scale.set(3);// = 0.5
  
    
    backSprite.x = 200;
    backSprite.y = 200;

   // backSprite.width = 100// frontSprite.width;
   // backSprite.height = 100// frontSprite.height;
   // backSprite.width = 800;
     // backSprite.height = 600;

     container.addChild(backSprite);
    container.addChild(frontSprite);
    root.addChild(container);
   

    // const testFilter = new GlobalTestFilter({
    //     texture:avacado,
    //     sprite:frontSprite,
    // })    
    
    
  //   backSprite.filters = [testFilter];

    const bunnies = [];

   for (let i = 0; i < 2; i++) {
       const bunny = new Sprite(texture);
       
       bunny.x =  Math.random() * 200;
       bunny.y = Math.random() * 200;
      // bunny.rotation = Math.random() * (Math.PI * 2);
       bunny.scale.set(5)
       container.addChild(bunny);
       
     //  bunny.filters = [noiseFilater];
       bunnies.push(bunny);
    }
    
     // container.addChild(frontSprite2);
    // backSprite.filters = [displacementFilter]
    

   

    const update = () => {
        
        
        bunnies.forEach((bunny) => {
            bunny.rotation += 0.007;
        });
        // the 'true' clears the texture before the content is rendered
    //    renderer.render(container, rt);   
        renderer.render(root);
     //   renderer.render(root);
       // displacementFilter.scale.set( 100);
    //    container.rotation += 0.01;
       // renderer.render(container, rt);
         // renderer.render(root);
        // renderer.render(root);
        frontSprite.rotation+=0.01
    //
    
requestAnimationFrame(update);
    }

    update();
}






