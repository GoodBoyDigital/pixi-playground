

import { DisplayObject, Graphics} from 'pixi.js';
import { Assets, Container, filters, Renderer,Sprite } from 'pixi.js';

import shaderCode from './coloured-triangle.wgsl';
import { loadTexture } from './textureUtils';


// function addBetterListening()
// {

//     const recursiveDispatch = (container:Container, event:string)=> {

//         for(let i = 0; i < container.children.length; i++)
//         {
//             const child = container.children[i];

//             recursiveDispatch(child as Container, event);

//             child.emit(event, child);
//         }
//     }

//     class RecursiveContainer extends Container
//     {
//         public override addChild<T extends DisplayObject[]>(...children: T): T[0] {
            
//             if (children.length === 1)
//             {   
//                 recursiveDispatch(children[0] as Container, 'addedToParent');
//             }
            
//             return super.addChild(...children);
//         }

//         public override removeChild<T extends DisplayObject>(child: T): T 
//         {
  
//             if(child.parent)
//             {   
//                 recursiveDispatch(child as Container, 'removedFromParent');
//             }
            
//             return super.removeChild(child);
//         }
//     }

//     const addChildOg = Container.prototype.addChild;
//     const removeChildOg = Container.prototype.removeChild;
    
  

//     Container.prototype.addChild = function addChild(child)
//     {
//         if(child.parent !== this)
//         {   
//             recursiveDispatch(child, 'addedToParent');
//         }

//         addChildOg(child);
//     }

//     Container.prototype.removeChild = function removeChild(child)
//     {
//         if(child.parent)
//         {   
//             recursiveDispatch(child, 'removedFromParent');
//         }

//         removeChildOg(child);
//     }


// }

// addBetterListening();

export async function filterScenePixi(__renderer:WebGPURenderer) {

    
    const fruit1 = 'https://pixijs.io/examples/examples/assets/rt_object_01.png'
    const avacado = './assets/pic-sensei@2x.webp'
   // const eggplant = './assets/targetpic-03.webp'
    const sensaiTexture = 'https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg'
    const texture = './assets/rabbitv3@2x.png';
   

    await Assets.load([
        // 'https://pixijs.io/examples/examples/assets/rt_object_01.png',
        // './assets/targetpic-02.webp',
        // './assets/targetpic-03.webp',
        {src:'./assets/pic-sensei@2x.webp', data:{resolution:1}},
        {src:'./assets/rabbitv3@2x.png', data:{resolution:1}},
    ]);

    const renderer = new Renderer({
        backgroundColor:0xD3EEDD,
    })

    document.body.appendChild(renderer.view);

    const container = new Container();

    const root = new Container();

    const graphics = new Graphics().beginFill(0xFF0000).drawCircle(200,200,300).endFill();
    // const backSprite = Sprite.from(eggplant);
    // const frontSprite = Sprite.from(avacado);
    // const frontSprite2 = Sprite.from(avacado);

    // frontSprite2.alpha =0.1;
    
    // backSprite.scale.set(1)

    // root.addChild(backSprite);
    root.addChild(container);
    container.rotation += 0.1;
    // container.addChild(graphics);

    const filter = new filters.ColorMatrixFilter()

    const noiseFilter = new filters.NoiseFilter()

    noiseFilter.noise = 0.5
    noiseFilter.multisample =  4;
    
    
    filter.blackAndWhite(true);

    const bunnies = [];

//    container.filters = [noiseFilter];
//     container.filters = [noiseFilter]
   // container.attachRenderGroup();
   const frontSprite = Sprite.from(avacado);
   
   container.addChild(frontSprite);
   for (let i = 0; i < 100; i++) {
    const bunny = Sprite.from(texture);
    
     bunny.x = Math.random() * 200;
     bunny.y =  Math.random() * 200;
    bunny.rotation = Math.random() * (Math.PI * 2);
    bunny.scale.set(10)
    container.addChild(bunny);
    // bunny.anchor.set(0.5);
     bunny.filters = [noiseFilter];
    bunnies.push(bunny);
 }

    // container.addChild(frontSprite);
     // container.addChild(frontSprite2);
    
   
    
    
//  container.attachRenderGroup();
   // root.addChild(sprite);
   /*
   * All the bunnies are added to the container with the addChild method
   * when you do this, all the bunnies become children of the container, and when a container moves,
   * so do all its children.
   * This gives you a lot of flexibility and makes it easier to position elements on the screen
   */
  // container.x = 300;
  // container.y = 360;
  
//   backSprite.x = 0;
//   backSprite.y = 0;
//  // backSprite.alpha = 0.2
//   backSprite.scale.set(4,2)
//   // frontSprite.x = 400;
//   // frontSprite.alpha = 0.1
//   frontSprite.anchor.set(0.5)
//   frontSprite.rotation = 0.2
//   frontSprite.scale.set(1)

//   frontSprite2.anchor.set(0.5)
//   frontSprite2.rotation = 0.2
//   frontSprite2.scale.set(1)
  
  
  const senseSprite= Sprite.from(sensaiTexture);
  



 //   container.filters = [noiseFilter]
  //    frontSprite.filters = [filter];
  // senseSprite.filters = [filter];
    // senseSprite.filters = [new Filter({
    //     resolution:1,
    //     blendRequired:true,
    //   //  antialias:false,
    // })];
    
    // frontSprite.addChild(senseSprite);
    
    // container.scale.set(0.4)
    // container.label = 'bunnyContainer'
    // root.label = 'root'
    container.x = 100;
    container.y= 100;
   


//    uniforms
    // root.addChild(fruit);
    const update = () => {
        
        
        bunnies.forEach((bunny) => {
            bunny.rotation += 0.007;
        });
        // the 'true' clears the texture before the content is rendered
    //    renderer.render(container, rt);   
    renderer.render(root);

        
        
       // container.rotation += 0.01;
       // renderer.render(container, rt);
         // renderer.render(root);
        // renderer.render(root);

      requestAnimationFrame(update);
    }

    update();
}






