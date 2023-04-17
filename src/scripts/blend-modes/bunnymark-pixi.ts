


import { Container, Rectangle, Renderer, Texture } from 'pixi.js';

import { BunnyPixi } from './BunnyPixi';


export async function bunnymark(rendererx:WebGPURenderer) {

    const renderer = new Renderer()

    document.body.appendChild(renderer.view);
    
    const root = new Container();

    // const stage = new Stage(root);

    const textures = [
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
    ].map(url=> Texture.from(url, {resolution:1}));


   
    // await Promise.all(textures.map(texture=>texture.source.isReady));

    
    const bounds = new Rectangle(0, 0, 800, 600);
   
  //  root.addChild(bunny2);

    
    const bunnies:BunnyPixi[] = []

    let count = 0;

    function addBunny()
    {
         
        const bunny = new BunnyPixi(textures[count++%textures.length],bounds)

        root.addChild(bunny.view);

        bunnies.push(bunny);
    }
   
    let pause = false;

    for(let i = 0; i < 100000; i++)
    {
        addBunny();
    }

    renderer.view.addEventListener('mousedown', ()=>{
        pause = !pause
    })

    function renderUpdate() {
        
        
        if(!pause)
        {
            for(let i = 0; i < bunnies.length; i++)
            {
                bunnies[i].update();
            }
        }

        
       // bunny.transform.rotation += 0.01
        renderer.render(root);
        requestAnimationFrame(renderUpdate)
        
    }

    renderUpdate()
}