
import type { WebGPURenderer } from 'blaze';
import { Matrix, MeshGeometry } from 'blaze';
import { Graphics } from 'blaze';
import {
     buildGeometry,
     Circle,Container, 
     FillGradient,
GraphicsContext,
     GraphicsPath2D,
     Mesh, 
     Rectangle, 
     Sprite,
     Texture,
      Triangle     } from 'blaze';

import { semiTigerSVG } from './semiTiger';
import { loadTexture } from './textureUtils';
import { tigerSVG } from './tiger';


export async function graphicsAdvancedScene(renderer:WebGPURenderer) {

   
    const texture = await loadTexture('https://pixijs.io/examples/examples/assets/bg_rotate.jpg');
   
   // console.log(texture)
        const container = new Container();

    const root = new Container();

    root.addChild(container);
    
   

    
    const graphics = new Graphics()

    const realPath = new Graphics();

    realPath.context
    .moveTo(0, 0)
    .lineTo(100, 200)
    .lineTo(200, 200)
    .lineTo(240, 100)
    .stroke({color:0xFFFFFF, width:2})
   

    realPath.position.x = 50;
    realPath.position.y = 50;

//    root.addChild(realPath);

    const bezier = new Graphics();

    bezier.context
    .bezierCurveTo(100, 200, 200, 200, 240, 100)
    .stroke({color:0xAA0000, width:5})

    bezier.position.x = 50;
    bezier.position.y = 50;

    root.addChild(bezier);

    // // BEZIER CURVE 2 ////
    const realPath2 = new Graphics();

    realPath2.context
    .moveTo(0, 0)
    .lineTo(0, -100)
    .lineTo(150, 150)
    .lineTo(240, 100)
    .stroke({color:0xFFFFFF, width:2})
   
    realPath2.position.x = 320;
    realPath2.position.y = 150;

    root.addChild(realPath2);

    const bezier2 = new Graphics();

    bezier2.context
    .bezierCurveTo(0, -100, 150, 150, 240, 100)
    .stroke({width:10, texture})

    bezier2.position.x = 320;
    bezier2.position.y = 150;

    root.addChild(bezier2);

    
    // // ARC ////

    const arc = new Graphics();

    arc.context
    .arc(600, 100, 50, Math.PI, 2 * Math.PI)
    .stroke({color:0xAA00BB, width:5})

    root.addChild(arc);

    // // ARC 2 ////
    const arc2 = new Graphics();

    arc2.context
    .arc(650, 270, 60, 2 * Math.PI, 3 * Math.PI / 2)
    .stroke({color:0xAA00BB, width:6})

    root.addChild(arc2);

    // // ARC 3 ////

    const arc3 = new Graphics();
    
    arc3.context
    .arc(650, 420, 60, 2 * Math.PI, 2.5 * Math.PI / 2)
    .stroke({width:20, texture})

    root.addChild(arc3);

  

    // // / Hole ////
    
    const rectAndHole = new Graphics();

    rectAndHole.context
    .rect(350, 350, 150, 150)
    .fill({color:0x00FF00})
    .stroke({width:5, color:'red'})
    .circle(375, 375, 25)
    .circle(425, 425, 25)
    .circle(475, 475, 25)
    .cut()

    root.addChild(rectAndHole);

    // // // Line Texture Style ////

    const beautifulRect = new Graphics();

    beautifulRect.context
    .rect(80, 350, 150, 150)
    .fill(0xFF0000)
    .stroke({width:20, texture})

    root.addChild(beautifulRect);


    // svg

    const tigerGraphics = new Graphics();

    tigerGraphics.context
    .scale(0.5)
    .translate(130,640  )
    .svg(tigerSVG)

    container.addChild(tigerGraphics);

      // // // Line Texture Style ////

    const gradientRect = new Graphics();

    const fillGradient = new FillGradient(0, 0, 0, 150)
    .addColorStop(0, '#FF0000')
    .addColorStop(0.5, '#00FF00')
    .addColorStop(1, '#0000FF')

    const strokeGradient = new FillGradient(0, 0, 0, 150)
    .addColorStop(0, '#FFFFFF')
    .addColorStop(1, '#333333')

    gradientRect.context
      .rect(0, 0, 150, 150)
      .fill(fillGradient)  
      .stroke({fill:strokeGradient, width:20})  

    gradientRect.x = 350;
    gradientRect.y = 600;

    root.addChild(gradientRect);

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






