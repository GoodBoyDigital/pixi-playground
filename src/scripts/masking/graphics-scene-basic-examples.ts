
import type { WebGPURenderer } from 'blaze';
import { Matrix, MeshGeometry } from 'blaze';
import { Graphics } from 'blaze';
import {
     buildGeometry,
     Circle,Container, 
GraphicsContext,
     GraphicsGradient,
     GraphicsPath2D,
     Mesh, 
     Rectangle, 
     Sprite,
     Texture,
      Triangle     } from 'blaze';

import { semiTigerSVG } from './semiTiger';
import { loadTexture } from './textureUtils';
import { tigerSVG } from './tiger';


export async function graphicsSVGExamplesScene(renderer:WebGPURenderer) {

    
   

    const container = new Container();

    const root = new Container();

    root.addChild(container);
    
const graphics = new Graphics()

const context = graphics.context;


context
    // Rectangle
    .rect(50, 50, 100, 100)
    .fill(0xDE3249)

    // Rectangle + line style 1
    .rect(200, 50, 100, 100)
    .fill(0x650A5A)
    .stroke({color:0xFEEB77, width:2})

    // Rectangle + line style 2
    .rect(350, 50, 100, 100)
    .fill(0xC34288)
    .stroke({color:0xFFBD01, width:10})
  
    // Rectangle 2
    .rect(530, 50, 140, 100)
    .fill(0xAA4F08)
    .stroke({color:0xFFFFFF, width:2})

    // add a circle
    .circle(100, 250, 50)
    .fill(0xDE3249)

    // Circle + line style 1
    .circle(250, 250, 50)
    .fill(0x650A5A)
    .stroke({color:0xFEEB77, width:2})

    // Circle + line style 2
    .circle(400, 250, 50)
    .fill(0xC34288)
    .stroke({color:0xFFBD01, width:10})
    
    // ellipse
    .ellipse(600, 250, 80, 50)
    .fill(0xAA4F08)
    .stroke({color:0xFFFFFF, width:2})

    // draw a shape with poly
    .poly([50, 350, 250, 350, 100, 400, 50, 350], true)
    .fill(0xFF3300)
    .stroke({color:0xffd900, width:4})
    
    // draw a rounded rectangle
    .roundRect(50, 440, 100, 100, 16)
    .fill(0x650A5A)
    .stroke({color:0xFEEB77, width:2})

    // draw polygon
    .poly([600, 370, 700, 460, 780, 420, 730, 570, 590, 520], true)
    .fill(0x3500FA)

    // draw star
    .star(360, 370, 5, 50)
    .fill(0x35CC5A)
    .stroke({color:0xFFFFFF, width:2})

    // draw star 2
    .star(280, 510, 7, 50)
    .fill(0xFFCC5A)
    .stroke({color:0xFFFFFF, width:2})

    // draw star 3
    .star(470, 450, 4, 50)
    .fill(0x55335A)
    .stroke({color:0xFFFFFF, width:4})






container.addChild(graphics);
    // run test.. 
    renderer.view.element.addEventListener('mousedown', ()=>{
        console.log('click')
         // g.visible = !g.visible
        // g.tint = Math.random() * 0xFFFFFF
//        g.renderable.clear()
        // ctx.resetTransform();
            
        // ctx.fillStyle = Math.random() * 0xFFFFFF;
        // ctx.beginPath();
        // ctx.rect(0, 0, Math.random() * 100, Math.random() * 300);
        // ctx.closePath();
        // ctx.fill()
        
       
       // g2.context = 

     //   renderer.render(root);
    })


let tick = 0;

    const update = () => {
        
        // for(let i = 0; i < tigers.length; i++)
        // {
        //     tigers[i].x += Math.sin(i +tick * 0.01) * 2;
        //     tigers[i].y += Math.cos(i+tick * 0.01) * 2;

        //     tigers[i].rotation += 0.01;

        //     tigers[i].scale.set(0.3)
        // }
//        tigerGraphic.scale.set(1 + (Math.sin(tick * 0.01)+1) * 2)
        tick++;
        
        renderer.render(root);
        
        requestAnimationFrame(update);
    }

    update();
}






