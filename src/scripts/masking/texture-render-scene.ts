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

export async function textureRenderScene(renderer:WebGPURenderer) {



    const fruit1 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_01.png')
    const fruit2 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_02.png');
    const fruit3 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_03.png');
    const fruit4 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_04.png');
    const fruit5 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_05.png');
    const fruit6 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_06.png');
    const fruit7 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_07.png');
    const fruit8 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_08.png');
    const sensei = await loadTexture('assets/pic-sensei-po2.jpg');


    // create two render textures... these dynamic textures will be used to draw the scene into itself
    let renderTexture = new Texture({
        source: new TextureSource({
            width: 800,
            height: 600,
        })
    });

    let renderTexture2 = new Texture({
        source: new TextureSource({
            width: 800,
            height: 600,
        })
    });

    const currentTexture = renderTexture;

    // create a new sprite that uses the render texture we created above
    const outputSprite = new Sprite(currentTexture);

    // align the sprite
    outputSprite.x = 400;
    outputSprite.y = 300;
    outputSprite.anchor.set(0.5);

    // add to stage
    const root = new Container();

    const stage = new Stage(root)

    root.addChild(outputSprite);

    const stuffContainer = new Container();

    stuffContainer.label = 'stuff container'

    stuffContainer.x = 400;
    stuffContainer.y = 300;

    root.addChild(stuffContainer);

    // create an array of image ids..
    const fruits = [
        fruit1,// 'examples/assets/rt_object_01.png',
        fruit2,
        fruit3,
        fruit4,
        fruit5,
        fruit6,
        fruit7,
        fruit8,
        
        // 'examples/assets/rt_object_02.png',
        // 'examples/assets/rt_object_03.png',
        // 'examples/assets/rt_object_04.png',
        // 'examples/assets/rt_object_05.png',
        // 'examples/assets/rt_object_06.png',
        // 'examples/assets/rt_object_07.png',
        // 'examples/assets/rt_object_08.png',
    ];

    // create an array of items
    const items:Sprite[] = [];

    // now create some items and randomly position them in the stuff container
    for (let i = 0; i < 20; i++) {
        const item = new Sprite(fruits[i % fruits.length]);

        item.label = `fruit-${  i}`;
        item.x =  Math.random() * 400 - 200;
        item.y =  Math.random() * 400 - 200;
        item.anchor.set(0.5);
        stuffContainer.addChild(item);
        items.push(item);
    }

    // used for spinning!
    let count = 0;

    // stuffContainer.x = 400
    // stuffContainer.y = 300

    
    const update = () => {
        
        for (let i = 0; i < items.length; i++) {
        // rotate each item
            const item = items[i];

           item.rotation += 0.1 * 0.5 
        }

        count += 0.01 * 0.5;

        // swap the buffers ...
        const temp = renderTexture;

        renderTexture = renderTexture2;
        renderTexture2 = temp;

        // set the new texture
        outputSprite.texture = renderTexture;

        // twist this up!
        stuffContainer.rotation -= 0.01 * 0.5;
     //   stuffContainer.x += 0.1
    //    outputSprite.scale.set(4 + Math.sin(count) * 0.2);
     //  outputSprite.rotation+=0.001
        // render the stage to the texture
        // the 'true' clears the texture before the content is rendered
        renderer.render(stage);
        
        outputSprite.scale.set(5.5)
       renderer.render(stage, renderTexture2);
        requestAnimationFrame(update);
    }

    update();
}






