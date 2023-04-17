
import type { WebGPURenderer } from 'blaze';
import { BLEND_MODES } from 'blaze';
import { Bounds } from 'blaze';
import { getGlobalBounds } from 'blaze';
import { getLocalBounds } from 'blaze';
import { Matrix, MeshGeometry } from 'blaze';
import { Graphics } from 'blaze';
import {
     buildGeometry,
     buildGeometryFromPath,
     Circle,Container, 
     FillGradient,
GraphicsContext,
GraphicsPath,
     Mesh, 
     Rectangle, 
     Sprite,
     Texture,
      Triangle     } from 'blaze';

import { semiTigerSVG } from './semiTiger';
import { loadTexture } from './textureUtils';
import { tigerSVG } from './tiger';


export async function graphicsDynamicScene(renderer:WebGPURenderer) {

   
    const texture = await loadTexture('https://pixijs.io/examples/examples/assets/bg_rotate.jpg');
   
    const container = new Container();

    const root = new Container();

    root.addChild(container);
    
   

    const things:Graphics[] = [];
 
    
    for(let i = 0; i < 1; i++){
    
        const thing = new Graphics()
        
         // thing.context.batchMode = 'no-batch';

        things.push(thing)
        
        container.addChild(thing);

        thing.x = Math.random() * 800;
        thing.y = Math.random() * 600;

        thing.scale.set( 0.5)
    }
    // run test.. 
    renderer.view.element.addEventListener('mousedown', ()=>{
      
    })

    const path = new GraphicsPath()
        .moveTo(100, 100)
        .lineTo(100, 200)
        .lineTo(200, 200)
        .lineTo(240, 100)
        .closePath()
    
        const textureMatrix = new Matrix();

        textureMatrix.translate(100, 100)
        textureMatrix.scale(1/texture.frameWidth, 1/texture.frameHeight)
        textureMatrix.scale(2, 2)
        
    const geometry = buildGeometryFromPath({path, textureMatrix})

    const mesh = new Mesh(geometry, texture);
  
    const boundBox = new Graphics();
    const boundBox2 = new Graphics();

    boundBox2.context.rect(0,0,100,100)
    // .path(path)
    .fill({color:0xffFFFF, alpha:0.1})
    .stroke({color:0xffFFFF, alpha:1, width:2})

    container.addChild(boundBox2);
     container.addChild(mesh);

     mesh.x = 100;
     mesh.y = 100
    // boundBox2.blendMode = BLEND_MODES.DIFFERENCE;


let tick = 0;

    const update = () => {
        
        
        
        
        
      
        for(let i = 0; i < things.length; i++)
        {
            const thing = things[i];

            // if(tick === 0)
            {
                thing.context.clear()
                // .lineStyle(10, 0xff0000, 1)
                // .beginFill(0xffFF00, 0.5)
                
                .moveTo(-120 + Math.sin(tick) * 20, -100 + Math.cos(tick) * 20)
                .lineTo(120 + Math.cos(tick) * 20, -100 + Math.sin(tick) * 20)
                .lineTo(120 + Math.sin(tick) * 20, 100 + Math.cos(tick) * 20)
                .lineTo(-120 + Math.cos(tick) * 20, 100 + Math.sin(tick) * 20)
                .lineTo(-120 + Math.sin(tick) * 20, -100 + Math.cos(tick) * 20)
                .closePath()
                .fill({color:0xff4444, alpha:0.5})
                .stroke({color:'pink', width:10, alpha:1})
                // .scale(0.2)
                // .texture(texture)
            }

       //     thing.x = 300// thing.width;
         //   thing.y = 300// thing.height;
            
        //     const bounds = getGlobalBounds(thing, false, new Bounds());

        //     // boundBox.context.clear()
        //     // boundBox.context.rect(bounds.x, bounds.y, bounds.width, bounds.height)
        //     // .stroke({color:0xffFFFF, width:2})

        //      boundBox2.x = bounds.x;
        //      boundBox2.y = bounds.y;

         
        //    //  boundBox2.scale.x = 2// width = bounds.width
        //     // boundBox2.scale.x = 0.1// bounds.width /100;
        //     boundBox2.width = bounds.width;
        //     boundBox2.height =  bounds.height;


           


            thing.rotation = tick * 0.1;
        }

        
        tick+= 0.1;

        renderer.render(root);
        
           
       requestAnimationFrame(update);
    }

    update();
}






