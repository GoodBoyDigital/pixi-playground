import type { WebGPURenderer } from 'blaze';
import { Container } from 'blaze';
import { Sprite } from 'blaze';
import { getGlobalBounds, Graphics, NoiseFilter } from 'blaze';

import { loadTexture } from './textureUtils';


export async function maskingScene(renderer:WebGPURenderer) {


    const root = new Container();

    const container = new Container();

    root.addChild(container);

    root.label = 'root';
 
    const texturePromises = [
        'https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg',
        './assets/rabbitv3_ash@2x.png',
        //  './assets/rabbitv3_batman@2x.png',
        //  './assets/rabbitv3_bb8@2x.png',
        // './assets/rabbitv3_frankenstein@2x.png',
        // './assets/rabbitv3_neo@2x.png',
        // './assets/rabbitv3_sonic@2x.png',
        // './assets/rabbitv3_spidey@2x.png',
        // './assets/rabbitv3_stormtrooper@2x.png',
        // './assets/rabbitv3_superman@2x.png',
        // './assets/rabbitv3_tron@2x.png',
        // './assets/rabbitv3_wolverine@2x.png',
        // './assets/rabbitv3@2x.png',
    ].map(url=>loadTexture(url));

    const textures = await Promise.all(texturePromises);

    const dude = new Sprite(textures[0]);

    const dude2 = new Sprite(textures[0]);

    dude.label = 'masked dude'  
    
    container.addChild(dude2);
    
    container.addChild(dude);
    // container.filters = [new NoiseFilter()];
    dude.anchor.set(0.5);
    
    dude.position.set(400,300);
    
    const mask = new Sprite(textures[1]);

    // dude.scale.set(10)
//    mask.context.rect(0,0,200,200).fill(0x00ff00)

    mask.label = 'dude-mask'
   // mask.anchor.set(0.5)
    mask.position.set(400,300);
    
    container.addChild(mask);
 

   dude.mask = mask;

    mask.rotation += Math.PI/4
    mask.scale.set(10)

    console.log('DIMENSIONS', root.width,root.height);

    function renderUpdate() {
        mask.rotation = 0// .01;
        renderer.render(root);
       requestAnimationFrame(renderUpdate)

       // dude.rotation-=0.01
    }
  
      renderUpdate()


        renderer.view.element.addEventListener('mousedown', ()=>{
        // pause = !pause
        // addBunny();
         // addBunny(true);
         const bounds = getGlobalBounds(root);

        //  const bunny = new Sprite(textures[1]);

        //  root.addChild(bunny);

        //  bunny.anchor.set(0.5);

        //  bunny.x = bounds.rectangle.x + (bounds.rectangle.width/2)
        //  bunny.y = bounds.rectangle.y + (bounds.rectangle.height/2)
         
         console.log('DIMENSIONS', bounds.rectangle);
       // root.transform.visible = !root.transform.visible;
     })
  
}