import type { WebGPURenderer } from 'blaze';
import { BLEND_MODES,BlendMode,ImageSource,Rectangle,TextureLayout } from 'blaze';
import { Sprite, Texture } from 'blaze';
import { Container,getLocalBounds,Stage } from 'blaze';

import { BunnyMesh } from '../blend-modes/BunnyMesh';
import { Bunny } from './Bunny';
import { BunnyFlicker } from './BunnyFlicker';

async function loadImage(url:string):Promise<ImageBitmap>
{
    
        const img = document.createElement('img');

        img.crossOrigin = 'anonymous';

        img.src = url;
        await img.decode();

        const imageBitmap = await createImageBitmap(img);

        return imageBitmap;
}

export async function bunnymarkQuad(renderer:WebGPURenderer) {

    

    const root = new Container();

    const stage = new Stage(root);

    const textures:Texture[] = (await Promise.all([
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
    ].map(loadImage))).map((imageBitmap)=>{
        // /
        const texture = new Texture({
          source:new ImageSource({resource:imageBitmap}),
          layout:new TextureLayout({
            frame:new Rectangle(0,0,1,1),
          })
        })

        return texture;
    })
    
    // .map(imageBitmap=>{new Texture2({
    //     source:imageBitmap,
    // }})

    // const texture = new Texture2({
    //   source:new ImageSource(imageBitmap),
    // })

  
    
   console.log(textures)
   // await Promise.all(textures.map(texture=>texture.source.isReady));

    
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
        }
        else
        {
            bunny = new BunnyMesh(textures[count++%textures.length],bounds)

        }
     //   bunny.view.renderable.blendMode = (bunnies.length % 2) ? BLEND_MODES.ADD : BLEND_MODES.NORMAL;
        root.addChild(bunny.view);
      //  bunny.view.transform.visible = false
        bunnies.push(bunny);
      //  console.log(bunnies.length);
    }
   
    const flikerBunny = new Bunny(textures[count++%textures.length],bounds);

    let pause = false;

   // addBunny();
  //  addBunny(true);
0
   for(let i = 0; i < 100000; i++)
   {
      addBunny();
    //  addBunny(true);
   }

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

    renderer.view.element.addEventListener('mousedown', ()=>{
        pause = !pause
       // pause = !pause
        // addBunny();
      //  addBunny(true);
        console.log(getLocalBounds(root));

// /       root.visible = !root.visible;
    })
    let tick = 0;
    
    getLocalBounds
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

    function renderUpdate() {
        
        
      // addBunny();
        if(!pause)
        {
            for(let i = 0; i < bunnies.length; i++)
            {
                bunnies[i].update();
            }
        }

        const now = performance.now();

       // bunny.transform.rotation += 0.01
        renderer.render(stage);

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
      
        if(false)
        {

            if(tick++%2)
            {
                
                stage.addChild(flikerBunny.view);
            }
            else
            {
                stage.removeChild(flikerBunny.view);
                
            }
        }

    }

    renderUpdate()
}