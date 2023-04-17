

import { Assets, Container, filters, Graphics, Renderer,Sprite } from 'pixi.js';

import shaderCode from './coloured-triangle.wgsl';
import { RoundedRectangle } from './RoundedRectangle';
import { loadTexture } from './textureUtils';





export async function maskFilterScenePixi(__renderer:WebGPURenderer) {

    
    const fruit1 = 'https://pixijs.io/examples/examples/assets/rt_object_01.png'
    const avacado = './assets/targetpic-02.webp'
    const eggplant = './assets/targetpic-03.webp'
    const sensaiTexture = 'https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg'
    const texture = './assets/rabbitv3@2x.png';
   

    await Assets.load([
        'https://pixijs.io/examples/examples/assets/rt_object_01.png',
        './assets/targetpic-02.webp',
        './assets/targetpic-03.webp',
        'https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg',
        {src:'./assets/rabbitv3@2x.png', data:{resolution:1}},
    ]);

    const renderer = new Renderer({
        backgroundColor:0xD3EEDD,
    })

    document.body.appendChild(renderer.view);

    const container = new Container();

    const root = new Container();

    const backSprite = Sprite.from(eggplant);
    const frontSprite = Sprite.from(avacado);
 
   
  //  frontSprite2.alpha =0.1;
    
    // backSprite.scale.set(1)

    root.addChild(backSprite);
    root.addChild(frontSprite);
    frontSprite.x = 100
    frontSprite.rotation = 0.5
    root.addChild(container);
   
    
 
    backSprite.mask = frontSprite;
   
    const bunnies = [];

   // container.attachRenderGroup();

    for (let i = 0; i < 0; i++) {
        const bunny = Sprite.from(texture);

        bunny.x = Math.random() * 200;
        bunny.y = Math.random() * 200;
        bunny.rotation = Math.random() * (Math.PI * 2);
        bunny.scale.set(2)
        container.addChild(bunny);

        bunny.filters = [noiseFilter];
        bunnies.push(bunny);
    }

    // container.addChild(frontSprite);
     // container.addChild(frontSprite2);
    
   
    const roundedRect = new RoundedRectangle(100, 100, 30);

    roundedRect.resize(100, 300);
  container.addChild(roundedRect);

    let tick = 0;

//    uniforms
    // root.addChild(fruit);
    const update = () => {
        
        
        tick++;
        roundedRect.resize(100 + (Math.sin(tick * 0.03)+0.5) * 100, 300);
        renderer.render(root);
        
       // container.rotation += 0.01;
      
       requestAnimationFrame(update);
    }

    update();
}






