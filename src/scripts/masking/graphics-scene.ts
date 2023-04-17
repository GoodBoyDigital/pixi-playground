
import type { MeshGeometry, WebGPURenderer } from 'blaze';
import { Graphics } from 'blaze';
import { Assets, Circle,Container, Mesh, Rectangle, Sprite,Texture, Triangle } from 'blaze';

import { loadTexture } from './textureUtils';


export async function graphicsScene(renderer:WebGPURenderer) {

    
   // const fruit1 = await Assets.load('https://pixijs.io/examples/examples/assets/rt_object_01.png')
    // const avacado = await Assets.load('./assets/targetpic-02.webp')
    const eggplant = await Assets.load('./assets/targetpic-03.webp')
    const sensaiTexture = await Assets.load('https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg')
    // const texture = await Assets.load('./assets/rabbitv3@2x.png');
   // const tilingTest = await Assets.load('./assets/ripples.png');
   

    const container = new Container();

    const root = new Container();

    root.addChild(container);
    
    const backSprite = new Sprite(eggplant);
    
    root.addChild(container);
    
    
    
    const subSensai = new Texture({source:sensaiTexture, layout:{
        frame:new Rectangle(0.25,0.25,0.5,0.5) 
    }});
    
    const frontSprite = new Sprite(subSensai);
    
    // const geometry = buildGeometry({
    //     shape:[new Circle(200,0,100)],
    //     texture:subSensai,
    // })

    // const shape = new Shape()
    //     .moveTo(0, 0)
    //     .lineTo(100, 0)
    //     .lineTo(100, 100)
    //     .drawRect(0, 0, 100, 100)
        
        
    const g = new Graphics();

    g.renderable
        .beginFill({color:0xFFFFFF, alpha:0.5})
        .lineStyle({color:0xCC0000, alpha:0.3, width:20, cap:'round', join:'round'})
    .moveTo(0, 0)
    .lineTo(100, 0)
   // .lineTo(200, 0)
  //  .lineTo(200, 50)
    .lineTo(100, 100)
    .lineTo(0, 100)
    .beginHole()
    .drawShape(new Rectangle(11,11, 50,50))
    .endHole()
    
    //   .drawShape(new Circle(200,250,100))
    // .drawShape(new Rectangle(200, 0, 200, 100))
    // .drawShape(new Triangle(0, 0, 100, 0, 100, 100))
   // .drawShape(new Triangle(0+140, 0, 100+140, 0, 100+140, 100))
   // .drawShape(new Triangle(0, 0, 0, 100, 100, 100))
       // .beginFill({color:0xCCCC00, alpha:1})
        // .drawShape(new Rectangle(0, 200, 500, 100))
    
       // g.tint = 0xFF0000

        const g2 = new Graphics();

        g2.renderable
        .lineStyle({color:0xFFCC00, alpha:1})
        .beginFill({color:0xFFCCFF, alpha:1})
        .drawShape(new Circle(200,0,100))
        // .drawShape(new Circle(200,200,100))
        // .beginFill({color:0xFFCCFF, alpha:1})
        // .drawShape(new Circle(200,400,100))
      
    
       // g.tint = 0xFF0000

      //  g.alpha = 0.5
       // .drawNativeLine(0, 0, 100, 0)

        // .moveTo(0, 0)
        // .lineTo(100, 0)
        // .lineTo(100, 100)
        // .lineTo(0, 100)
   
 //   container.addChild(g);
    // container.addChild(g2);

    g.x = 300
    g.y = 300

    // const mesh = new Mesh(
    //     geometry as MeshGeometry,
      
    // );

    

    const sprite = new Sprite( Texture.WHITE);

    const graphics = new Graphics();
    const gRenderable = graphics.renderable;

    // Rectangle
gRenderable.beginFill({color:0xDE3249,alpha:1});
gRenderable.drawRect(50, 50, 100, 100);
gRenderable.endFill();

// // Rectangle + line style 1
gRenderable.lineStyle({width:2, color:0xFEEB77, alpha:1});
gRenderable.beginFill({color:0x650A5A});
gRenderable.drawRect(200, 50, 100, 100);
gRenderable.endFill();

// // Rectangle + line style 2
gRenderable.lineStyle({width:10, color:0xFFBD01, alpha:1});
gRenderable.beginFill({color:0xC34288});
gRenderable.drawRect(350, 50, 100, 100);
gRenderable.endFill();

// // Rectangle 2
gRenderable.lineStyle({width:2, color:0xFFFFFF, alpha:1});
gRenderable.beginFill({color:0xAA4F08});
gRenderable.drawRect(530, 50, 140, 100);
gRenderable.endFill();

// // Circle
gRenderable.lineStyle(null); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
gRenderable.beginFill({color:0xDE3249, alpha:1});
gRenderable.drawCircle(100, 250, 50);
gRenderable.endFill();

// // Circle + line style 1
gRenderable.lineStyle({width:2, color:0xFEEB77, alpha:1});
gRenderable.beginFill({color:0x650A5A, alpha:1});
gRenderable.drawCircle(250, 250, 50);
gRenderable.endFill();

// // Circle + line style 2
gRenderable.lineStyle({width:10, color:0xFFBD01, alpha:1});
gRenderable.beginFill({color:0xC34288, alpha:1});
gRenderable.drawCircle(400, 250, 50);
gRenderable.endFill();

// // Ellipse + line style 2
gRenderable.lineStyle({width:2, color:0xFFFFFF, alpha:1});
gRenderable.beginFill({color:0xAA4F08, alpha:1});
gRenderable.drawEllipse(600, 250, 80, 50);
gRenderable.endFill();

// // draw a shape
gRenderable.beginFill({color:0xFF3300});
gRenderable.lineStyle({width:4, color:0xffd900, alpha:1});
gRenderable.moveTo(50, 350);
gRenderable.lineTo(250, 350);
gRenderable.lineTo(100, 400);
gRenderable.lineTo(50, 350);
// gRenderable.closePath();
gRenderable.endFill();

// // draw a rounded rectangle
gRenderable.lineStyle({width:2, color:0xFF00FF, alpha:1});
gRenderable.beginFill({color:0x650A5A, alpha:0.25});
gRenderable.drawRoundedRect(50, 440, 100, 100, 16);
gRenderable.endFill();

// // draw star
// gRenderable.lineStyle(2, 0xFFFFFF);
// gRenderable.beginFill(0x35CC5A, 1);
// gRenderable.drawStar(360, 370, 5, 50);
// gRenderable.endFill();

// // draw star 2
// gRenderable.lineStyle(2, 0xFFFFFF);
// gRenderable.beginFill(0xFFCC5A, 1);
// gRenderable.drawStar(280, 510, 7, 50);
// gRenderable.endFill();

// // draw star 3
// gRenderable.lineStyle(4, 0xFFFFFF);
// gRenderable.beginFill(0x55335A, 1);
// gRenderable.drawStar(470, 450, 4, 50);
// gRenderable.endFill();

// // draw polygon
 const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];

gRenderable.lineStyle(0);
gRenderable.beginFill({color:0x3500FA, alpha:1});
gRenderable.drawPolygon(path);
gRenderable.endFill();

    // container.addChild(sprite);
    
// Texture.WHITE = new Texture({
//     source: new TextureSource({
//         resource: canvas,
//     }),
// });

    // const geometry2 = buildGeometry({
    //     shape:[new Rectangle(300, 0, 100, 100),new Rectangle(0, 0, 100, 100),new Circle(200,50,100)],
    //     texture:subSensai,
    // })

    // const mesh2 = new Mesh(
    //     geometry2 as MeshGeometry,
    //     subSensai
    // );



    // measure speed of next function 

    const now = performance.now();

    // for(let i = 0; i < 1; i++){

    //     const geometry2 = buildGeometry({
    //         shape:[new Rectangle(300, 0, 100, 100),new Rectangle(0, 0, 100, 100),new Circle(200,50,100)],
    //         texture:subSensai,
    //     })
    // }

    console.log(performance.now() - now);

    // container.addChild(frontSprite);
  //    container.addChild(mesh);
    // container.addChild(mesh2);


    // mesh.x = 300;
    // mesh.y = 500;


    // mesh2.x = 300;
    // mesh2.y = 300;
   // container.addChild(graphics);

    // run test.. 
    renderer.view.element.addEventListener('mousedown', ()=>{
         // g.visible = !g.visible
        // g.tint = Math.random() * 0xFFFFFF
//        g.renderable.clear()
        g.renderable.beginFill({color:0xFFFFFF * Math.random(), alpha:0.1})
        g.renderable.drawShape(new Rectangle(Math.random() * 300,Math.random() * 300,Math.random() * 300,Math.random() * 300))
        
        renderer.render(root);
    })


    const update = () => {
        
    //    g.rotation += 0.01;
        renderer.render(root);
        //   mesh2.rotation += 0.01;
        // requestAnimationFrame(update);
    }

    update();
}






