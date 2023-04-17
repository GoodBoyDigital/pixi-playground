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

export async function textureRenderBasic(renderer:WebGPURenderer) {


    const container = new Container();

    const root = new Container();

   // root.addChild(container);

    const texture = await loadTexture('./assets/rabbitv3@2x.png');

    const bunnies = [];

    for (let i = 0; i < 25; i++) {
        const bunny = new Sprite(texture);

        bunny.x = (i % 5) * 30;
        bunny.y = Math.floor(i / 5) * 30;
        bunny.rotation = Math.random() * (Math.PI * 2);
        bunny.scale.set(5)
        container.addChild(bunny);

        bunnies.push(bunny);
    }

    const rt = new Texture({
        source: new TextureSource({
            width: 300,
            height: 300,
        })
    });

    const fruit1 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_01.png')
   
    
   const sprite = new Sprite(rt);

   sprite.x = 450;
   sprite.y = 0;
   
    container.attachRenderGroup();
    
    root.addChild(sprite);
    /*
    * All the bunnies are added to the container with the addChild method
    * when you do this, all the bunnies become children of the container, and when a container moves,
    * so do all its children.
    * This gives you a lot of flexibility and makes it easier to position elements on the screen
    */
   // container.x = 300;
    // container.y = 360;
    container.scale.set(0.4)
    container.label = 'bunnyContainer'
    root.label = 'root'
    
    const fruit  = new Sprite(fruit1);

    fruit.anchor.set(0.5);
    
    fruit.x = 300/2
    fruit.y = 300/2

    // const otherCanvas = document.createElement('canvas');

    // otherCanvas.width = 300;
    // otherCanvas.height = 300;

    // document.body.appendChild(otherCanvas);

    // const otherCanvas2 = document.createElement('canvas');

    // otherCanvas2.width = 300;
    // otherCanvas2.height = 300;
    // otherCanvas2.style.paddingLeft = '300px';
    // document.body.appendChild(otherCanvas2);
    
    root.addChild(fruit);

    const update = () => {
        
        fruit.rotation -= 0.01;

        bunnies.forEach((bunny) => {
            bunny.rotation += 0.007;
        });

        renderer.render(container , rt);   
        renderer.render(root)// , otherCanvas2);   
      // renderer.render(root)// , rt);   
        // the 'true' clears the texture before the content is rendered
     //   renderer.render(root);
        
        
        container.rotation += 0.01;
       // renderer.render(container, rt);
         // renderer.render(root);
        // renderer.render(root);

        requestAnimationFrame(update);
    }

    update();


//     // Get the WebGL contexts for the source and destination canvases
// const srcCanvas = document.createElement('canvas');

// srcCanvas.width = 300;
// srcCanvas.height = 300;

// const srcGL = srcCanvas.getContext('webgl');

// const dstCanvas = document.createElement('canvas');

// dstCanvas.width = 300;
// dstCanvas.height = 300;

// const dstGL = dstCanvas.getContext('webgl');

// // Create a texture to copy the pixels to
// const dstTexture = dstGL.createTexture();

// dstGL.bindTexture(dstGL.TEXTURE_2D, dstTexture);
// dstGL.texImage2D(dstGL.TEXTURE_2D, 0, dstGL.RGBA, srcCanvas.width, srcCanvas.height, 0, dstGL.RGBA, dstGL.UNSIGNED_BYTE, null);

// // Copy the pixels from the source to the destination texture
// srcGL.bindFramebuffer(srcGL.FRAMEBUFFER, null);
// srcGL.bindTexture(srcGL.TEXTURE_2D, dstTexture);
// // srcGL.copyTexImage2D(srcGL.TEXTURE_2D, 0, srcGL.RGBA, 0, 0, srcCanvas.width, srcCanvas.height, 0);

// // // Use the destination texture in the destination canvas
// // dstGL.clearColor(0, 0, 0, 1);
// // dstGL.clear(dstGL.COLOR_BUFFER_BIT | dstGL.DEPTH_BUFFER_BIT);
// // dstGL.bindTexture(dstGL.TEXTURE_2D, dstTexture);
}






