
import type { WebGPURenderer } from 'blaze';
import { Matrix, MeshGeometry } from 'blaze';
import { Graphics } from 'blaze';
import {
     buildGeometry,
     Circle,Container, 
     GraphicsGradient,
     GraphicsPath2D,
     Mesh, 
     Rectangle, 
     Sprite,
     Texture,
      Triangle 
    } from 'blaze';

import { loadTexture } from './textureUtils';


export async function graphicsAdvancedScene(renderer:WebGPURenderer) {

    
    const fruit1 = await loadTexture('https://pixijs.io/examples/examples/assets/rt_object_01.png')
    const tileDemo = await loadTexture('./assets/canvas_createpattern.png')
    const avacado = await loadTexture('./assets/targetpic-02.webp')
    const eggplant = await loadTexture('./assets/targetpic-03.webp')
    const sensaiTexture = await loadTexture('https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg')
    const texture = await loadTexture('./assets/rabbitv3@2x.png');
    const tilingTest = await loadTexture('./assets/ripples.png');
    const testTexture = await loadTexture('./assets/texture-test.jpeg');
   

    const container = new Container();

    const root = new Container();

    root.addChild(container);
    
    
    root.addChild(container);

    const graphics = new Graphics();
    const gRenderable = graphics.renderable;





// container.addChild(rectAndHole);

const testSprite = new Sprite(testTexture);

// container.addChild(testSprite);
// container.addChild(beautifulRect);




// const g1ClassicContext = g1.renderable.classicContext;

// g1ClassicContext
//  .lineStyle({width:20, color:0x00ff00, alpha:1, alignment:1})
// .beginFill({color:0x0000ff, alpha:1})
// .drawRect(0, 0, 100, 100)
// // .drawPolygon([-100, -100, +100, -100, +100, +100, -100, +100])
// .endFill()

const g2 = new Graphics()
const g1 = new Graphics(g2.context)

const g3 = new Graphics();

g3.context.fillStyle = 'red';
g3.context.fillRect(0,0,100,100)

const ctx = g2.renderable.context;

const scaleUp = 1

// ctx.strokeStyle = 0xCCFF00// 'red'
ctx.lineWidth = 3/scaleUp;


const grd = ctx.createLinearGradient(20, 0, 200, 300);

grd.addColorStop(0, '#FF0000');
grd.addColorStop(0.5, '#0000FF');
grd.addColorStop(1, '#FFFFFF');

 ctx.fillStyle = '#FFD700'// '#FF0000'
 ctx.strokeStyle = '#FFA500'// '#FF0000'

 // ctx.ellipse(100, 100, 200, 100, 0, 0, 2 * Math.PI)
 ctx.rect(100, 100, 200, 100)
ctx.lineTo(1900, 300)
ctx.stroke();
// ctx.strokeStyle = 0xFFFFFF// 'white'// grd;// 0xFF0000// 'red'
// ctx.globalAlpha = 0.1;

// ctx.beginPath();
// // ctx.moveTo(20, 20);
// ctx.arc(100, 75, 50, 0, 2 * Math.PI);
// // ctx.quadraticCurveTo(20, 100, 200, 20);
// ctx.fill();
// ctx.stroke();

 // ctx.translate(200, 200);
const heart = new GraphicsPath2D(`M 213.1,6.7
c -32.4-14.4,-73.7,0,-88.1,30.6
C 110.6,4.9,67.5,-9.5,36.9,6.7
C 2.8,22.9,-13.4,62.4,13.5,110.9
C 33.3,145.1,67.5,170.3,125,217
c 59.3-46.7,93.5,-71.9,111.5,-106.1
C 263.4,64.2,247.2,22.9,213.1,6.7
z`)// A 30,30 0 1 1 10,20`);

const moon = new GraphicsPath2D(`M10,20 
A 30,30 0 0 0 40,70 
A 30,30 0 1 1 10,20`)
// ctx.translate(200, 0);

const sword = new GraphicsPath2D(`

m 2.2 -58 s -9.238 -2.872 -20.4 22.8 c 0 0 -2.4 5.2 -4.8 7.2 s -13.6 5.6 -15.6 9.6 l -10.4 16 s 14.8 -16 18 -18.4 c 0 0 8 -8.4 4.8 -1.6 c 0 0 -14 10.8 -12.8 20 c 0 0 -5.6 14.4 -6.4 16.4 c 0 0 16 -32 18.4 -33.2 s 3.6 -1.2 2.4 2.4 s -1.6 20 -4.4 22 c 0 0 8 -20.4 7.2 -23.6 c 0 0 3.2 -3.6 5.6 1.6 l -1.2 16 l 4.4 12 s -2.4 -11.2 -0.8 -26.8 c 0 0 -2 -10.4 2 -4.8 s 13.6 11.6 13.6 16.4 c 0 0 -5.2 -17.6 -14.4 -22.4 l -4 6 l -1.2 -2 s -3.6 -0.8 0.8 -7.6 s 4 -7.6 4 -7.6 s 7 6.6 8 7.2 c 0 0 13.2 -7.6 14.4 16.8 c 0 0 6.8 -14.4 -2.4 -21.2 c 0 0 -14.8 -2 -13.6 -7.2 l 7.2 -12.4 c 3.6 -5.2 2 -2.4 2 -2.4 z
`)
const tigerSplot = new GraphicsPath2D(`

m 2.2 -58 s -9.238 -2.872 -20.4 22.8 c 0 0 -2.4 5.2 -4.8 7.2 s -13.6 5.6 -15.6 9.6 l -10.4 16 s 14.8 -16 18 -18.4 c 0 0 8 -8.4 4.8 -1.6 c 0 0 -14 10.8 -12.8 20 c 0 0 -5.6 14.4 -6.4 16.4 c 0 0 16 -32 18.4 -33.2 s 3.6 -1.2 2.4 2.4 s -1.6 20 -4.4 22 c 0 0 8 -20.4 7.2 -23.6 c 0 0 3.2 -3.6 5.6 1.6 l -1.2 16 l 4.4 12 s -2.4 -11.2 -0.8 -26.8 c 0 0 -2 -10.4 1.8 -4.4 s 13.6 11.6 13.6 16.4 c 1.4 -1.4 -5.2 -17.6 -14.4 -22.4 l -4 6 l -1.2 -2 s -3.6 -0.8 0.8 -7.6 s 4 -7.6 4 -7.6 s 7 6.6 8 7.2 c 0 0 13.2 -7.6 14.4 16.8 c 0 0 6.8 -14.4 -2.4 -21.2 c 0 0 -14.8 -2 -13.6 -7.2 l 7.2 -12.4 c 3.6 -5.2 2 -2.4 2 -2.4 z
`)
const tigerSplotPart = new GraphicsPath2D(`m 2.2 -58 S -7.038 -60.872 -18.2 -35.2 C -18.2 -35.2 -20.6 -30 -23 -28 S -36.6 -22.4 -38.6 -18.4 L -49 -2.4 S -34.2 -18.4 -31 -20.8 C -31 -20.8 -23 -29.2 -26.2 -22.4 C -26.2 -22.4 -40.2 -11.6 -39 -2.4 C -39 -2.4 -44.6 12 -45.4 14 C -45.4 14 -29.4 -18 -27 -19.2 S -23.4 -20.4 -24.6 -16.8 S -26.2 3.2 -29 5.2 C -29 5.2 -21 -15.2 -21.8 -18.4 C -21.8 -18.4 -18.6 -22 -16.2 -16.8 L -17.4 -0.8 L -13 11.2 S -15.4 -0 -13.8 -15.6 C -13.8 -15.6 -15.8 -26 -11.8 -20.4 S 1.8 -8.8 1.8 -4 C 1.8 -4 -3.4 -21.6 -12.6 -26.4 L -16.6 -20.4 L -17.8 -22.4 S -21.4 -23.2 -17 -30 S -13 -37.6 -13 -37.6 S -6 -31 -5 -30.4 C -5 -30.4 8.2 -38 9.4 -13.6 C 9.4 -13.6 16.2 -28 7 -34.8 C 7 -34.8 -7.8 -36.8 -6.6 -42 L 0.6 -54.4 C 4.2 -59.6 2.6 -56.8 2.6 -56.8 Z`)


// ctx.fill(heart);
// ctx.stroke(heart);

// ctx.fill(moon);
const mm = new Matrix();

mm.scale(5, 5);
// mm.rotate(Math.PI/2);
 mm.translate(100, 100);
 // ctx.stroke(tigerSplot);
// ctx.fill(sword);
mm.translate(500, 500);
// ctx.setTransform(mm);
// ctx.globalAlpha = 0.5

// ctx.fillStyle = 'red';
//  ///ctx.fill(tigerSplot);

// ctx.fillStyle = 'blue';
// ctx.fill(tigerSplotPart);

// ctx.beginPath();
// ctx.moveTo(20, 20);           // Create a starting point
// ctx.lineTo(100, 20);          // Create a horizontal line
// ctx.arcTo(150, 20, 150, 70, 50); // Create an arc
// ctx.lineTo(150, 120);         // Continue with vertical line
// ctx.stroke(); 
   // Create first path and add a rectangle
const p1 = new GraphicsPath2D();

p1.rect(0, 0, 100, 150);

// Create second path and add a rectangle
const p2 = new GraphicsPath2D();

p2.rect(0, 0, 100, 75);

// Create transformation matrix that moves 200 points to the right
const m = new Matrix();

 m.rotate(0.3);
// m.a = 1; m.b = 0;
// m.c = 0; m.d = 1; 
m.tx = 200; m.ty = 0;

// Add second path to the first path
 p1.addPath(p2, m);

// ctx.setTransform(1, 0, 0, 1, 100, 100);

 // ctx.translate(100, 100);
// ctx.ellipse(100, 100, 100/2, 200/2, 0, 0, 2 * Math.PI);
 // ctx.roundRect(0, 0, 100, 100, 10);
// Draw the first path
// ctx.stroke(p1);   

// ctx.beginPath()
// ctx.setTransform(1, 0, 0, 1, 200, 200);

 const pattern = ctx.createPattern(tileDemo, 'repeat');

 const patternMatrix = new Matrix();

 patternMatrix.rotate(-45 * Math.PI / 180);
 patternMatrix.scale(1.5, 1.5);
  pattern.setTransform(patternMatrix);
//   ctx.fillStyle = pattern;
//   ctx.fillRect(0, 0, 200, 100);
 
//  // ctx.stroke();
  
  
// path1.rect(10, 10, 100, 100);

// const path2 = new GraphicsPath2D(path1);

// path2.moveTo(220, 60);
// path2.arc(170, 60, 50, 0, 2 * Math.PI);

// ctx.stroke(path1);

// ctx.moveTo(0,0)
// ctx.lineTo(100,0)
// ctx.lineTo(200,100)
// ctx.stroke()

// const path = new GraphicsPath2D('M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z');
const path = new GraphicsPath2D('M 100 100 L 200 100 L 200 200 L 100 200 z')// M  110 190 L 190 190 L 190 110 L 110 10 z');

// path.moveTo(0,0)
// path.lineTo(100,0)
// path.lineTo(200,100)
// path.closePath()
ctx.lineJoin = 'round'
// ctx.lineCap =
 // ctx.fill(path)

// const m = new Matrix()

// m.rotate(0.5);

// ctx.setTransform(m)
// ctx.rect(0, 0, 100, 100)
// ctx.stroke()
// ctx.fill()
 // ctx.drawImage(testTexture, 0, 0)// , 100, 100)
console.log(ctx)
 container.addChild(g1)
// container.addChild(g2)
 // container.addChild(g3)

 g1.scale.set(2);

 g2.scale.set(scaleUp, scaleUp)
const x = 800 / 2;
const y = 600 / 2;
const r = Math.min(800, 600) / 6;


const gradientSprite = new Sprite(grd.texture);

// container.addChild(gradientSprite);

// g1.x = g2.x = x;
// g1.y = y - 120;
// g2.y = y + 120;

// create a cnvas 2d context

const canvas = document.createElement('canvas');

canvas.style.position = 'absolute';


canvas.width = 800;
canvas.height =600;

canvas.style.top = '0';
canvas.style.left = '0';

const ctx2 = canvas.getContext('2d');

ctx2.setTransform(1, 0, 0, 1, 200, 300);

ctx2.fillStyle = '#FF0000'
ctx2.strokeStyle = '#CCFF00'
ctx2.lineWidth = 10;

ctx2.beginPath()
ctx2.moveTo(-100,-10)
 ctx2.rect(0, 0, 200, 100)
// ctx2?.ellipse(0, 0, 200, 100, 0, 0, 2 * Math.PI)
ctx2?.lineTo(400, 400)

const pathCTx2 = new Path2D()

pathCTx2.moveTo(0,0)
pathCTx2.lineTo(100,0)
pathCTx2.lineTo(200,100)

const pathCTx22 = new Path2D()

 pathCTx22.moveTo(100,0)
pathCTx22.lineTo(200,0)
pathCTx22.lineTo(300,300)

pathCTx2.addPath(pathCTx22)

// ctx2.stroke(pathCTx2)

// ctx2.stroke()
// ctx2.rect(0, 0, 200, 100)


const grd2 = ctx2.createLinearGradient(20, 0, 200, 300);

grd2.addColorStop(0, '#FF0000');
grd2.addColorStop(0.5, '#0000FF');
grd2.addColorStop(1, '#FFFFFF');

// ctx2.strokeStyle = grd2;// 0xFF0000// 'red'

// ctx2.fill(new Path2D('M 100 100 L 200 100 L 200 200 L 100 200 z M  110 190 L 190 190 L 190 110 L 110 10 z'))
 ctx2.stroke()


// M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z


 document.body.appendChild(canvas)
// const epicShape = new GraphicsThing()
//     .addTexture({
//         texture:testTexture, 
//         alpha:1, 
//         transform:myMatrix
//     })
//     .addShape({
//         shape: [new Circle(100, 100, 50), new Circle(100, 100, 50)],
//         fill: {
//             color:0xFF0000, 
//             alpha:1,
//             texture:testTexture,
//             matrix: new Matrix(),
//         },
//         line: {
//             width:10,
//             matrix: new Matrix(),
//         },
//         transform:new Matrix(), 
//     })
//     .addRect({
//         x:100,
//         y:100,
//         width:100,
//         height:100,
//         fill: {
//             color:0xFF0000,
//             alpha:1,
//             texture:testTexture,
//             matrix: new Matrix(),
//         },
//     })
//     .addCircle({
//         x:100,
//         y:100,
//         radius:100,
//         fill: {
//             color:0xFF0000,
//             alpha:1,
//             texture:testTexture,
//             matrix: new Matrix(),
//         },
//     })

//     onst epicShape = new GraphicsThing()
// //    builder.. path to 
//     // just structure..
// const epicGeometry = new ShapeThing()
//     .addShape({
//         shape: new Circle(100, 100, 50),
//         fill: {
//             color:0xFF0000,
//             texture:testTexture,
//         }
//     })


// container.addChild(graphics);

const ctxG1 = g2.context;
const ctxG2 = g3.context;

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

        renderer.render(root);
    })

let tick = 0;

    const update = () => {
        
    //    g.rotation += 0.01;
        renderer.render(root);

      
      //  const rRenderable = rectAndHole.renderable;
        
        tick++;

   //     rRenderable.clear();
    //   //  rRenderable.shapeTransformMatrix.rotate(0.5);
    //     rRenderable.beginFill({color:0x00FF00});
    //     rRenderable.drawRect(350, 350, 150+tick, 150);
    //     rRenderable.beginHole();
    //     rRenderable.drawCircle(375, 375, 25);
    //     rRenderable.drawCircle(425, 425, 25);
    //     rRenderable.drawCircle(475, 475, 25);
    //     rRenderable.endHole();
    //     rRenderable.endFill();

   
        renderer.render(root);
        //   mesh2.rotation += 0.01;
     //     requestAnimationFrame(update);
    }

    update();
}






