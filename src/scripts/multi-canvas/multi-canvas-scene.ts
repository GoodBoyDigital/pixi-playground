import type { WebGPURenderer } from 'blaze';
import { ImageSource } from 'blaze';
import { Texture } from 'blaze';
import { Sprite } from 'blaze';
import { Container } from 'blaze';
import { CanvasSource } from 'blaze';

import { loadTexture } from '../masking/textureUtils';


export async function multiCanvasScene(renderer:WebGPURenderer) {

    
    const fruit1 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_01.png')
    const avacado = await loadTexture('./assets/targetpic-02.webp')
    const eggplant = await loadTexture('./assets/targetpic-03.webp')
    const sensaiTexture = await loadTexture('https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg')
    const texture = await loadTexture('./assets/rabbitv3@2x.png');
   

    const root = new Container();
    
    const sprite = new Sprite(sensaiTexture);

    sprite.width = 300;
    sprite.height = 300;

    root.addChild(sprite);
    
    // create a canvas and add it to the stage
    const canvas = document.createElement('canvas');
   // const ctx = canvas.getContext('2d');

   const canvasResolution = 0.3
   const mainCanvasResolution = 0.1;

   //  canvas.width = 300 //* canvasResolution;
    // canvas.height = 300 //* canvasResolution;

   

    const canvasTexture = new Texture({
        source: new CanvasSource({
           // resource:canvas,
             width:300,
             height:300,
            resolution:canvasResolution,
            autoDensity:true,
            antialias:true,
        }),
    })

    document.body.appendChild(canvasTexture.source.resource);

   // canvasTexture.source.resize(300,300, 2)
    // canvas.style.width = '300px';
    // canvas.style.height = '300px';

   // renderer.view.element.width = 800 * mainCanvasResolution;   
   // renderer.view.element.height = 600 * mainCanvasResolution;

    // const mainCanvasTexture = new Texture({
    //     source: new ImageSource({
    //         resource:renderer.view.element,
    //         resolution:mainCanvasResolution,
    //     }),
    // })
    
    renderer.view.element.style.width = '800px';
    renderer.view.element.style.height = '600px';

    const root2 = new Container();
    const sprite2 = new Sprite(canvasTexture);
    const spriteAvo = new Sprite(avacado);

    spriteAvo.position.set(300)
    sprite2.scale.set(1)
    spriteAvo.rotation = 0.3
    sprite.rotation = 0.3
    sprite2.rotation = 0.3
    // sprite2.width = 300;
    // sprite.height = 300;

    root2.addChild(sprite2);
    root2.addChild(spriteAvo);

    
    renderer.render(root, canvasTexture);
    // canvasTexture.source.update();

    const update = () => {
        
        
        
        // sprite.rotation = 0.2;
         // renderer.render(root, canvasTexture);
        
       //  canvasTexture.source.update();
        // renderer.render(root2)
        
         sprite.rotation += 0.3;
     
       // renderer.render(root, canvasTexture);
        
     //   console.log(canvasTexture._source.context)
        
         
        
       
        // , mainCanvasTexture);
   //     renderer.render(root2);
        // now render it to the main scene..

        renderer.render(root2);
        
     //    requestAnimationFrame(update);
    }

    update();
}






