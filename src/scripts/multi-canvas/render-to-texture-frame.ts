import type { WebGPURenderer } from 'blaze';
import { Rectangle } from 'blaze';
import { ImageSource } from 'blaze';
import { Texture } from 'blaze';
import { Sprite } from 'blaze';
import { Container } from 'blaze';
import { CanvasSource } from 'blaze';

import { loadTexture } from '../masking/textureUtils';


export async function renderToTextureFrameScene(renderer:WebGPURenderer) {

    
    const fruit1 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_01.png')
    const avacado = await loadTexture('./assets/targetpic-02.webp')
    const eggplant = await loadTexture('./assets/targetpic-03.webp')
    const sensaiTexture = await loadTexture('https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg')
    const texture = await loadTexture('./assets/rabbitv3@2x.png');
   

    const root = new Container();
    const root2 = new Container();
    
    const sprite = new Sprite(sensaiTexture);

    sprite.width = 300;
    sprite.height = 300;

    root2.addChild(sprite);
    
    const source  =new ImageSource({
        width: 300,
        height: 300,
        resolution:1
    })

    const rt = new Texture({
        source,
        layout:{
            frame:new Rectangle(0,0,1,1),
        }
    })

    const rt2 = new Texture({
        source,
        layout:{
            frame:new Rectangle(0,0,0.5,0.5),
        }
    })

    const rt3 = new Texture({
        source,
        layout:{
            frame:new Rectangle(0,0.5,1,0.5),
        }
    })


     const rtSprite = new Sprite(rt);

    // // sprite.width = 300;
    // // sprite.height = 300;

     renderer.render(root2, rt2);
     renderer.render(root2, rt3);
    
     root.addChild(rtSprite);
    // canvasTexture.source.update();

    const update = () => {
        
        
        
        // sprite.rotation = 0.2;
        // renderer.render(root, canvasTexture);
        
        // renderer.render(root2)
        
        // sprite.rotation += 0.1;
     
       // renderer.render(root, canvasTexture);
        
     //   console.log(canvasTexture._source.context)
        
         
        
       
        // , mainCanvasTexture);
   //     renderer.render(root2);
        // now render it to the main scene..

        renderer.render(root);
        
        // requestAnimationFrame(update);
    }

    update();
}






