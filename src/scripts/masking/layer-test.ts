import type { WebGPURenderer } from 'blaze';
import { TextureSource } from 'blaze';
import { Rectangle } from 'blaze';
import { BufferImageSource,ImageSource } from 'blaze';
import { getGlobalBounds } from 'blaze';
import { Sprite } from 'blaze';
import { Container, Stage, Texture } from 'blaze';
import { BlendMode, Buffer,Geometry, Program, Shader } from 'blaze';

import shaderCode from './coloured-triangle.wgsl';

async function loadImage(url:string):Promise<ImageBitmap>
{
    
        const img = document.createElement('img');

        img.crossOrigin = 'anonymous';

        img.src = url;
        await img.decode();

        const imageBitmap = await createImageBitmap(img, {
          //  premultiplyAlpha: 'premultiply',
        });

        return imageBitmap;
}

async function loadTexture(url:string):Promise<Texture>
{
    
        const imageBitmap = await loadImage(url);

       return new Texture({
            source: new ImageSource({
                resource:imageBitmap,
                scaleMode:'linear',
            }),
            layout:{
                frame:new Rectangle(0,0,1,1),
            },
            style:{
                scaleMode:'linear',
            }
        })
  
}

export async function layerTest(renderer:WebGPURenderer) {


    const container = new Container();

    const root = new Container();

    root.label = 'root';
 

    const texture = await loadTexture('./assets/rabbitv3@2x.png');

    for (let i = 0; i < 2000; i++) {
        const bunny = new Sprite(texture);

        bunny.label = `bunny${i+1}`;
      bunny.x = (Math.random() - 0.5) * 200// (i % 5) * 30;
       bunny.y = (Math.random() - 0.5) * 200// Math.floor(i / 5) * 30;
       bunny.rotation = Math.random() * (Math.PI * 2);
        bunny.scale.set(1)
        container.addChild(bunny);
    }
 
   
    root.addChild(container);
    
    const fruit1 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_01.png')
    const fruit = new Sprite(fruit1);

    root.addChild(fruit);
    
   container.attachRenderGroup()// = true;

   
 

    /*
    * All the bunnies are added to the container with the addChild method
    * when you do this, all the bunnies become children of the container, and when a container moves,
    * so do all its children.
    * This gives you a lot of flexibility and makes it easier to position elements on the screen
    */
    container.x = 400;
    container.y = 300;

    container.alpha = 0.5
   // container.scale.set(100)
    container.label = 'bunnyContainer'
    // container.visible = false;
   // const stage = new Stage(root);

    const update = () => {
        
        
        
        // the 'true' clears the texture before the content is rendered
     // renderer.render(stage, rt, container);
     
     renderer.render(root);
        container.children[ container.children.length-1].rotation+=0.1
        container.children[ 0].rotation+=0.1
      //  console.log(container.worldTransform.tx)

        // console.log('RENDERIN G AGAIN -------')
    //    renderer.render(root);
        container.rotation += 0.01
      //  renderer.render(root);
    //  requestAnimationFrame(update);
    }

    update(); 
}






