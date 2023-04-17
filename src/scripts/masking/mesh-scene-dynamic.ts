
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


export async function meshDynamicScene(renderer:WebGPURenderer) {

   
    const texture = await loadTexture('https://pixijs.io/examples/examples/assets/bg_rotate.jpg');
   
    const container = new Container();

    const root = new Container();

    root.addChild(container);
    
   

    const things:Graphics[] = [];
 
    
    for(let i = 0; i < 10000; i++){
    
        const thing = new Graphics()
        
     //     thing.context.batchMode = 'no-batch';

        things.push(thing)
        
        container.addChild(thing);

        thing.x = Math.random() * 800;
        thing.y = Math.random() * 600;

        thing.scale.set( 0.5)
    }
    // run test.. 
    renderer.view.element.addEventListener('mousedown', ()=>{
      
    })

    // const path = new GraphicsPath()
    //     .moveTo(100, 100)
    //     .lineTo(100, 200)
    //     .lineTo(200, 200)
    //     .lineTo(240, 100)
    //     .closePath()
    
    //     const textureMatrix = new Matrix();

    //     textureMatrix.translate(100, 100)
    //     textureMatrix.scale(1/texture.frameWidth, 1/texture.frameHeight)
    //     textureMatrix.scale(2, 2)
        
    // const out = new MeshGeometry();

    // const geometry = buildGeometryFromPath({path, textureMatrix, out})

    // // geometry.batchMode = 'no-batch';
    
    // const mesh = new Mesh(geometry, texture);
  
    // const boundBox = new Graphics();
    // const boundBox2 = new Graphics();

    // boundBox2.context.rect(0,0,100,100)
    // // .path(path)
    // .fill({color:0xffFFFF, alpha:0.1})
    // .stroke({color:0xffFFFF, alpha:1, width:2})

    // container.addChild(boundBox2);
    //  container.addChild(mesh);

    //  mesh.x = 100;
    //  mesh.y = 100
    // // boundBox2.blendMode = BLEND_MODES.DIFFERENCE;


let tick = 0;

    const update = () => {
        
        
        
        
        for(let i = 0; i < things.length; i++)
        {
            const thing = things[i];
      
       
           
               
            thing.context.clear()
                .moveTo(-120 + Math.sin(tick) * 20, -100 + Math.cos(tick) * 20)
                .lineTo(120 + Math.cos(tick) * 20, -100 + Math.sin(tick) * 20)
                .lineTo(120 + Math.sin(tick) * 20, 100 + Math.cos(tick) * 20)
                .lineTo(-120 + Math.cos(tick) * 20, 100 + Math.sin(tick) * 20)
                .lineTo(-120 + Math.sin(tick) * 20, -100 + Math.cos(tick) * 20)
                .fill({color:0xff0000, alpha:0.5})
                .stroke({color:0xffFF00, alpha:1, width:10})

                thing.rotation = tick * 0.1;
                // .closePath()
               
               // buildGeometryFromPath({path, textureMatrix, out:geometry})
        }
//                const mesh = new Mesh(geometry, texture);

     


        
        tick+= 0.1;

        renderer.render(root);
        
           
       requestAnimationFrame(update);
    }

    update();
}






