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

        const imageBitmap = await createImageBitmap(img);

        return imageBitmap;
}

async function loadTexture(url:string):Promise<Texture>
{
    
        const imageBitmap = await loadImage(url);

       return new Texture({
            source: new ImageSource({
                resource:imageBitmap,
            }),
            layout:{
                frame:new Rectangle(0,0,0.5,1),
            }
        })
  
}

export async function textureScene(renderer:WebGPURenderer) {


    const root = new Container();

   

    const imageBitmap = await loadImage('assets/pic-sensei-po2.jpg');
    
    const imageBitmap2 = await loadImage('assets/bunny.png');
    const imageBitmap3 = await loadImage('assets/profile-marshall.jpg');

    const bunnySource = new ImageSource({
        resource:imageBitmap2
    })


    const size = 512;

    const buffer = new Uint8Array(4 * size * size);

    const alpha = 1// 0.1

    for (let i = 0; i < buffer.length; i += 4) {


        const x = ((i / (512/5))|0) %2
        
        if(  x)// && )
        {
            
            buffer[i] = 0;
            buffer[i + 1] = 255 * alpha
            buffer[i + 2] = 0;
            buffer[i + 3] = 255 * alpha * alpha
        }
        else
        {

            buffer[i] = 0;
            buffer[i + 1] = 0
            buffer[i + 2] = 255  * alpha;
            buffer[i + 3] = 255 * alpha * alpha// 255/2;
        }
    }

    const bufferImageSource = new BufferImageSource({
        resource:buffer,
        width:size,
        height:size,
    });
    
    // create canvas with red circle
    const canvas = document.createElement('canvas');

    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

   
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, Math.PI * 2);
    ctx.fill();
    

    const canvasSource = new ImageSource({
        resource:canvas
    })

    const senseiImageSource = new ImageSource({
        resource:imageBitmap
    })

    const jagImageSource = new ImageSource({
        resource:imageBitmap3
    })

    
    const texture = new Texture({
        source: senseiImageSource,
        layout:{
            frame:new Rectangle(0,0,0.5,1),
        }
    })

    const sprite = new Sprite(texture);
    
    sprite.scale.set(0.5);
    sprite.x = 300
    sprite.y = 300
    sprite.anchor.set(0.5);
    
    root.addChild(sprite)


    const texture2 = new Texture({
        source: senseiImageSource,
        style:{
            scaleMode:'linear',
        },
        layout:{
            frame:new Rectangle(0,0,1,1),
        }
    })

  

    // make atexture to render too..

    const otherWidth = 100
    const otherHeight = 100 
    const renderTexture = new Texture({
        source: new TextureSource({
            width: otherWidth,
            height: otherHeight,
            // sampleCount:1,
            format: 'bgra8unorm',
        }),
        style:{
            scaleMode:'linear',
        },
        layout:{
            frame:new Rectangle(0,0,1,1),
        }
    })

    // const renderDepthTexture = new Texture({
    //     source: new TextureSource({
    //         width: otherWidth,
    //         height: otherHeight,
    //         format: 'stencil8',
    //     })
    // })

    // const renderTarget = {
    //     colorAttachments:[
    //         renderTexture
    //     ],
    //     depthStencilAttachment:renderDepthTexture
    // }
    // other scene..
    const otherScene = new Container();
    const otherSprite = new Sprite(new Texture({
        source: jagImageSource,
    }))

    otherScene.addChild(otherSprite)
    otherSprite.scale.set(2)
    otherSprite.anchor.set(0.5);
    otherSprite.x = otherWidth/2
    otherSprite.y = otherHeight/2

    const otherStage = new Stage(otherScene);

   renderer.render(otherStage, renderTexture);

    const sprite2 = new Sprite(renderTexture);
    
    sprite2.scale.set(1);
    sprite2.x = 300 + 200
    sprite2.y = 300
    sprite2.anchor.set(0.5);
    
    root.addChild(sprite2)

    const stage = new Stage(root);

    let tick = 0;

    function renderUpdate() {
       
        sprite.rotation += 0.01// = (Math.sin(tick)+1)/2;
        otherSprite.rotation += 0.01// = (Math.sin(tick)+1)/2;
        sprite2.rotation -= 0.01// = (Math.sin(tick)+1)/2;

        tick += 0.01;

        // sprite.rotation  += 0.1
      

        renderer.render(stage);
        renderer.render(otherStage, renderTexture);
       
        requestAnimationFrame(renderUpdate) 
    }
  
    renderUpdate()


    renderer.view.element.addEventListener('mousedown', ()=>{
    
        renderer.render(otherStage, renderTexture);
        // ctx.fillStyle = 'red';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = 'green';
        // ctx.beginPath();
        // ctx.arc(50, 50, 50, 0, Math.PI * 2);
        // ctx.fill();
        // sprite2.texture.source.resize(200,200)
       
        // canvasSource.update();
       // sprite2.texture = renderTexture;
        texture.style.scaleMode = 'linear';
        // texture.layout.frame.width = 0.5;
       // texture.layout.frame.height = 0.5;
      //  texture.layout.frame.x = 0.25;
        texture.layout.update();
        texture.style.update();
//       texture.source = bunnySource;
    })
  
}






