import type { WebGPURenderer } from 'blaze';
import { AlphaMask,BLEND_MODES,StencilMask } from 'blaze';
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
    ConvolutionFilter,
    Filter,
    Geometry, 
    GlobalTestFilter,
    NoiseFilter, 
    OverlayFilter,
    Program, 
    Shader} from 'blaze';

import shaderCode from './coloured-triangle.wgsl';
import { loadTexture } from './textureUtils';


export async function maskFilterScene(renderer:WebGPURenderer) {

    
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

   // backSprite.visible=false;
    const cm = new ColorMatrixFilter();

      cm.greyscale(0.5, false);
//     const displacementFilter = new MaskFilter({
//       sprite:frontSprite,
//       scale:100,
//       //  texture:tilingTest,
// //        texture:Texture.EMPTY,
//         // blendRequired:true,
//         // antialias:true,
//     })

//    backSprite.scale.set(1.3);
    
     // frontSprite.x = 350
    // frontSprite.y = 350

     // frontSprite.anchor.set(0.5);
   //  frontSprite.scale.set(0.5)
//     frontSprite.width = 200// frontSprite.width;
     
//     frontSprite.rotation = 0.5
     
    frontSprite.scale.set(0.5);// = 0.5
     frontSprite.x = 250
   frontSprite.y = 200
    
    // backSprite.x = 200;
    // backSprite.y = 200;

   // backSprite.width = 100// frontSprite.width;
   // backSprite.height = 100// frontSprite.height;
   backSprite.width = 800;
     backSprite.height = 600;

    container.addChild(backSprite);
     container.addChild(frontSprite);
    root.addChild(container);
// backSprite
   // container.filters = [cm]
  //  frontSprite.blendMode = BLEND_MODES.COLOR_BURN;
   // backSprite.effects.push(new AlphaMask(frontSprite));

    // frontSprite.newIsRenderable = false;
    // frontSprite.visible = false;
    // frontSprite.visible = false;
    // frontSprite.visible = false;
    // frontSprite.visible = false;
    // frontSprite.visible = false;
  // alert(frontSprite.visible)
  //  backSprite.mask = frontSprite// frontSprite;
  // backSprite.filters = [new ConvolutionFilter({})];// = new StencilMask({mask:frontSprite});
  // frontSprite.newLocalWorldVisible = 0b10;
  frontSprite.label = 'frontSprite';
 // frontSprite.newIsRenderable = false;
 // frontSprite.newLocalWorldVisible = 0b10
 // frontSprite.visible = false;
 console.log(frontSprite.visible)
//  frontSprite.alpha = 0.9
//   backSprite.updateIsSimple()
   // backSprite.filters = [cm]
   // console.log('GLOBAL BOUNDS', getGlobalBounds(backSprite))
   // frontSprite.mask = 0b1011// frontSprite;
  // backSprite.alpha = 0.01
   // backSprite.blendMode = BLEND_MODES.COLOR_BURN
   // container.filters = [cm]

    // const testFilter = new GlobalTestFilter({
    //     texture:avacado,
    //     sprite:frontSprite,
    // })    
    
    

  //   backSprite.filters = [testFilter];

    const bunnies = [];

   for (let i = 0; i < 5; i++) {
       const bunny = new Sprite(texture);
       
       bunny.x =  Math.random() * 200;
       bunny.y = Math.random() * 200;
      // bunny.rotation = Math.random() * (Math.PI * 2);
       bunny.scale.set(5)
      frontSprite.addChild(bunny);
       
     //  bunny.filters = [noiseFilater];
       bunnies.push(bunny);
    }
    
     // container.addChild(frontSprite2);
     // backSprite.mask = frontSprite
    

    renderer.view.element.addEventListener('mousedown', ()=>{
      
      
     frontSprite.blendMode = BLEND_MODES.COLOR_BURN;

      bunnies.forEach((bunny)=>{
        bunny.blendMode = BLEND_MODES.NORMAL
   //     bunny.alpha = 0.5;
      })
  })


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
       

      //   console.log('GLOBAL BOUNDS', getGlobalBounds(backSprite))
   // requestAnimationFrame(update);
    }

 //   update();
    // update();
    update();
}






