import type { WebGPURenderer } from 'blaze';
import { Rectangle } from 'blaze';
import { Sprite, Texture } from 'blaze';
import { Container,Stage } from 'blaze';

import type { Bunny } from './Bunny';
import { Triangle } from './Triangle';


export async function blendModeScene(renderer:WebGPURenderer) {

    

    const root = new Container();

    const stage = new Stage(root);

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
    ].map(url=>new Texture({ url }));


   
    await Promise.all(textures.map(texture=>texture.source.isReady));

    
    const bounds = new Rectangle(0, 0, 800, 600);
   
  //  root.addChild(bunny2);

    
    const bunnies:Bunny[] = []

    let count = 0;

    function addBunny()
    {
        let  bunny;

        if(bunnies.length % 2)
        {

            bunny = new Triangle(textures[count++%textures.length],bounds)
        }
        else
        {

          bunny = new Triangle(textures[count++%textures.length],bounds)
        }

        root.addChild(bunny.view);

        bunnies.push(bunny);
      //  console.log(bunnies.length);
    }
   
    let pause = false;

    for(let i = 0; i < 1; i++)
    {
        addBunny();
    }

    renderer.view.element.addEventListener('mousedown', ()=>{
        pause = !pause
        addBunny();
    })
    
    function renderUpdate() {
        
      // addBunny();
        if(!pause)
        {
            for(let i = 0; i < bunnies.length; i++)
            {
                bunnies[i].update();
            }
        }

        
       // bunny.transform.rotation += 0.01
        renderer.render(stage);
        requestAnimationFrame(renderUpdate)
        
    }

    renderUpdate()
}