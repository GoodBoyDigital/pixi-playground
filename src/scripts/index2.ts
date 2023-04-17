import './benchmark2';

import { autoDetectRenderer } from 'blaze';
import * as Stats from 'stats.js';

// import { bunnymark } from './bunnymark/bunnymark';
import { bunnymark } from './bunnymark/bunnymark-pixi';
import { bunnymarkQuad } from './bunnymark/bunnymark-quad';
// import { colouredTriangleScene } from './coloured-triangle/coloured-triangle';
// import { copyPixelsScene } from './coloured-triangle/copy-pixels';
// import { everythingScene } from './masking/everything-scene';
import { filterScene } from './masking/filter-scene';
// import { filterScenePixi } from './masking/filter-scene-pixi-v7';
import { graphicsScene } from './masking/graphics-scene';
import { graphicsAdvancedScene } from './masking/graphics-scene-advanced';
import { graphicsSVGExamplesScene } from './masking/graphics-scene-basic-examples';
import { graphicsDynamicScenePixi } from './masking/graphics-scene-dynamic-pixi-v7';
import { maskFilterScene } from './masking/mask-filter-scene';
import { maskingScene } from './masking/masking-scene';
import { textureRenderBasic } from './masking/render-texture-basic';
import { textScene } from './masking/text-scene';
// import { textureScene } from './masking/texture-scene';
// import {WebGPURecorder} from './webgpu_recorder'

// const recorder = new WebGPURecorder();

function addFPS()
{
    const stats = new Stats();

    console.log(stats)

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

    const params = new URLSearchParams(window.location.search);
    const pixi = params.get('pixi');
    
   
    let  renderer ;

    if(pixi === 'webGPU' || pixi === 'canvas' || pixi === 'webgl')
    {

        if(pixi === 'canvas')
        {

         //   renderer = new CanvasRenderer();
        }
        else if(pixi === 'webGL')
        {
       //    renderer = new WebGLRenderer();
        }
        else
        {
         //   renderer = new WebGPURenderer();
        }
        
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

        // renderer = new WebGPURenderer();

        // await renderer.init(
        //     {
        //         background:{
        //             color:0,// xCCCCCC,// xCCCCCC,// 0xD3EEDD,
        //         },
        //         view:{
        //             width: 800,
        //             height: 600,
        //             resolution,
        //             antialias: false,
        //         }
        //     }
        // )
        
        // / add html label to top left of screen saying hello

       

    //    renderer.resize(800,600)
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

             await bunnymark(renderer);
        }
    }
    else
    {
        // eslint-disable-next-line no-lonely-if
        if(pixi === 'webGPU' || pixi === 'canvas' || pixi === 'webgl')
        {            
             // await textScene(renderer);
          //   await copyPixelsScene(renderer);
        //      await everythingScene(renderer);
    //         await maskingScene(renderer);
            await filterScene(renderer);
//               await graphicsAdvancedScene(renderer);
          //   await textureRenderBasic(renderer);
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