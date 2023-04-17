
import type {
  WebGPURenderer} from 'blaze';
import { 
  Assets,
  BLEND_MODES,
  Container,
  Graphics,
  loadAssetExtensions,
  Rectangle,
  Sprite} from 'blaze';

import { BunnyMesh } from '../blend-modes/BunnyMesh';
import { Bunny } from './Bunny';
import { BunnyFlicker } from './BunnyFlicker';


export async function bunnymarkQuad(renderer:WebGPURenderer) {
  
     
  const params = new URLSearchParams(window.location.search);
    
  const slow = params.get('slow');
  const startCount = parseFloat(params.get('count')) ||100000;
  const blend = params.get('blend')

    const root = new Container();

    
  // const stage = new Stage(root);

    const stage = new Container();

    // stage.addChild(root);

    const textures = Object.values(await Assets.load(
        [
          './assets/rabbitv3_ash@2x.png',
          './assets/rabbitv3_batman@2x.png',
          './assets/rabbitv3_bb8@2x.png',
          './assets/rabbitv3_frankenstein@2x.png',
          './assets/rabbitv3_neo@2x.png',
          './assets/rabbitv3_sonic@2x.png',
          './assets/rabbitv3_spidey@2x.png',
          './assets/rabbitv3_stormtrooper@2x.png',
          './assets/rabbitv3_superman@2x.png',
          './assets/rabbitv3_tron@2x.png',
          './assets/rabbitv3_wolverine@2x.png',
          './assets/rabbitv3@2x.png',
      ].map(src=>({src, data:{resolution:1, scaleMode:'nearest'}}))))
   
    
    // const spriteSheet = await Assets.load('./assets/old/profile-pics/profile-pics---x.json');
    // const spriteSheet2 = await Assets.load('./assets/old/profile-pics/profile-pics.json');
    // const spriteSheet3 = await Assets.load('./assets/old/profile-pics/profile-pics@0.5x.json');


    // const svgContext = await Assets.load('./assets/Ghostscript_Tiger.svg');
    // const svgContext2 = await Assets.load('./assets/logo.svg');

    // const graphics = new Graphics(svgContext2);
    
    // console.log('svgContext',svgContext)
    
    const container= new Container();

    root.addChild(container);
    // root.addChild(graphics);
        
    // graphics.x = 300;
    // graphics.y = 300;
    
    // console.log('spriteSheet',spriteSheet)
  
//     const sp1 = new Sprite(spriteSheet.textures['profile-paige.jpg']);


//     const sp2 = new Sprite(spriteSheet2.textures['profile-paige.jpg']);

//     const sp3 = new Sprite(spriteSheet3.textures['profile-paige.jpg']);

//     sp1.x = 0;
//    // sp1.y = 100;

//     sp2.x = 256;
//  //   sp2.y = 200;

//     sp3.x = 512;

  //  container.addChild(sp1)
  //  container.addChild(sp2)
  //  container.addChild(sp3)

    const bounds = new Rectangle(0, 0, 800, 600);
   
  //  root.addChild(bunny2);

    
    const bunnies:Bunny[] = []

    let count = 0;

    function addBunny(makeMesh = false)
    {
         
        let bunny
        
        
        if(!makeMesh)// bunnies.length % 2)
        {
            
          //   bunny = new BunnyFlicker(textures,bounds)
           bunny = new Bunny(textures[count++%textures.length],bounds)
          //   bunny = new Bunny(textures[count++%textures.length],bounds)
        }
        else
        {
            bunny = new BunnyMesh(textures[count++%textures.length],bounds)

        }

        if(blend)
        {

          bunny.view.blendMode = (bunnies.length % 2) ? BLEND_MODES.ADD : BLEND_MODES.NORMAL;
        }
      
      
         root.addChild(bunny.view);
        
      //  bunny.view.transform.visible = false
        bunnies.push(bunny);

   //  bunny.view.blendMode = BLEND_MODES.COLOR_DODGE;
      //  console.log(bunnies.length);
    }
   
    const flikerBunny = new Bunny(textures[count++%textures.length],bounds);

    let pause = false;

  //  addBunny();
   // addBunny(true);
0
   for(let i = 0; i < startCount; i++)
   {
      addBunny(false);
    // addBunny();
   }
   // addBunny(true);

    // --- weekend --- // 

//          addBunny();
//         addBunny();
//         addBunny();
//         addBunny();
//         addBunny();
//         addBunny();
//         // }
        
//         addBunny(true);
//         addBunny();
//         addBunny();
//         addBunny();
//    addBunny();
//    addBunny();

const otherCanvas  = document.createElement('canvas');

otherCanvas.width = 800;
otherCanvas.height = 600;

// const otherContext = otherCanvas.getContext('2d');

// otherContext.fillStyle = '#FF0000';

// otherContext.fillRect(0,0,800,600);

document.body.appendChild(otherCanvas);

    renderer.view.element.addEventListener('mousedown', ()=>{
       // pause = !pause
        pause = !pause

       
       // root.visible = !root.visible;
        // addBunny();
       // addBunny(true);
//        console.log(getLocalBounds(root));

// /       root.visible = !root.visible;
    })
    let tick = 0;
    
  //  getLocalBounds
    const measures = {
        min: Number.MAX_VALUE,
        max: 0,
        last100: new Array(100).fill(0),
        total: 0,
    }
    

 
    const domElement = document.createElement('div');

    domElement.style.position = 'absolute';
    domElement.style.top = '0px';
    domElement.style.left = '80px';
    domElement.style.backgroundColor = '#FFFFFF';
    domElement.innerHTML = 'HELLO! HOWS IT GOIGN'
    // document.body.appendChild(domElement);

//    container.tint = 0xFF0000;
    
    function renderUpdate() {
      
       // root.tint = 0xFF0000;
      // addBunny();
        if(!pause)
        {
            for(let i = 0; i < bunnies.length; i++)
            {
                bunnies[i].update();
               // bunnies[i].view.blendMode = pause ? BLEND_MODES.ADD : BLEND_MODES.NORMAL;
            }
        }

        
        //    renderer.view.element.width = 800
        // bunny.transform.rotation += 0.01
        const now = performance.now();
        
        renderer.render(root);
        
        const time = performance.now() - now;
        
        // console.log('time',time);
       // otherContext.drawImage(renderer.view.element,0,0, 800, 600);
        // 5.5
        // 0.07
        // 0.10000002384185791
      
      //  renderer.view.element.width = 300
       // renderer.render(root);
       
        const then = performance.now();

        const delta = then - now;
        

        measures.min = Math.min(measures.min, delta);
        measures.max = Math.max(measures.max, delta);
        measures.last100[tick++%100] = delta;
        
        measures.total++;

        let total = 0;
        
        for(let i = 0; i < measures.last100.length; i++)
        {
            total+=measures.last100[i];
        }


        domElement.innerHTML = `min: ${  (measures.min*1000)|0  } max: ${  (measures.max * 1000)|0  } avg: ${((total/100)*1000)|0}`;
        

        requestAnimationFrame(renderUpdate)
      
        if(slow)
        {

            if(tick++%2)
            {
                
              root.addChild(flikerBunny.view);
            }
            else
            {
              root.removeChild(flikerBunny.view);
                
            }
        }

    }

    renderUpdate()
}