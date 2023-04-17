// import './benchmark2';


import { autoDetectRenderer, loadAssetExtensions } from 'blaze';
// import * as PIXI from 'pixi.js';
import * as Stats from 'stats.js';

import { bunnymarkQuad } from './bunnymark/bunnymark-quad';
// import { bunnymark } from './bunnymark/bunnymark-pixi';
 import { filterScene } from './masking/filter-scene';

 // import { bunnymark } from './bunnymark/bunnymark';

// console.log(PIXI);
// const recorder = new WebGPURecorder();

function addFPS()
{
    const stats = new Stats();

    stats.dom.style.transform = 'scale(3)';
    stats.dom.style.top = `${80}px`;
    stats.dom.style.left = `${100}px`;
    document.body.appendChild(stats.dom);

    function update()
    {

        stats.update();

        requestAnimationFrame(update);
    }
    
    update();

}
async function init() {

    await loadAssetExtensions();
    
    const params = new URLSearchParams(window.location.search);
    const pixi = params.get('pixi');
    
   
    let renderer ;

    if(pixi === 'webGPU' || pixi === 'canvas' || pixi === 'webgl')
    {
        const resolution = 1

        const view = {
            width: 800,
            height: 600,
            resolution,
            antialias: false,
          //  multiView: true,
        }

        renderer = await autoDetectRenderer({
                preference:pixi.toLowerCase(),
                options:{
                    background:{
                        color:0xCCCCCC,// xCCCCCC,// 0xD3EEDD,
                    },
                    view,
                    context:view,
                }
            }
        )

        document.body.appendChild(renderer.view.element)
        
        const label = document.createElement('div');
        
        label.style.position = 'absolute';
        label.style.padding = '10px';
        label.style.backgroundColor = '#FFFFFF';
        label.innerHTML = renderer.type;
      
        // position label top right
        label.style.top = `${10}px`;
        label.style.right = `${10}px`;

        document.body.appendChild(label)

        const fillScreen = false;

        if(fillScreen)
        {
            renderer.resize(window.innerWidth, window.innerHeight)
            
            window.addEventListener('resize', ()=>{
                renderer.resize(window.innerWidth, window.innerHeight);
            });
        }
        else
        {

        //    renderer.view.element.style.width = '100%';
        //    renderer.view.element.style.height = '100%';
        }
        
}


   

    // get url params
    const scene = params.get('scene');
   
    if(scene === 'bunnymark')
    {
        if(pixi === 'webGPU' || pixi === 'canvas' || pixi === 'webgl')
        {
        
            await bunnymarkQuad(renderer);

        }
        else
        {

         //    await bunnymark(renderer);
        }
    }
    else
    {
        // eslint-disable-next-line no-lonely-if
        if(pixi === 'webGPU' || pixi === 'canvas' || pixi === 'webgl')
        {            
            await filterScene(renderer);
        }
        else
        {
          // await filterScenePixi(renderer);
        }
    }

    
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init()//

 addFPS();