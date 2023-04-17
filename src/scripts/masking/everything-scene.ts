
import type { WebGPURenderer } from 'blaze';
import { Graphics , MeshGeometry} from 'blaze';
import { Assets, Circle,Container, Mesh, Rectangle, Sprite,Texture, Triangle } from 'blaze';

import { loadTexture } from './textureUtils';


export async function everythingScene(renderer:WebGPURenderer) {

    
    const eggplant = await Assets.load('./assets/targetpic-03.webp')
    const sensaiTexture = await Assets.load('https://raw.githubusercontent.com/GoodBoyDigital/pixi-playground/master/src/assets/pic-sensei.jpg')
   

    const container = new Container();

    const root = new Container();

    root.addChild(container);
    
    // one sprite..
    const sprite = new Sprite(eggplant);

    const size = 100;
    
    const geometry = new MeshGeometry({
        positions: new Float32Array([-size*0.4, -size, size*0.4, -size, size, size, -size, size]),
        uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
        indices: new Uint32Array([0, 1, 2, 0, 2, 3]), // triangle 1);
    });

    geometry.batchMode = 'no-batch'
    
    // one mesh
    const mesh = new Mesh({
        geometry,
        texture: sensaiTexture,
    });

    mesh.x = 370;
    mesh.y = 120;

    container.addChild(sprite);
    container.addChild(mesh);



    // run test.. 
    renderer.view.element.addEventListener('mousedown', ()=>{
         // g.visible = !g.visible
        // g.tint = Math.random() * 0xFFFFFF
//        g.renderable.clear()
        // g.renderable.beginFill({color:0xFFFFFF * Math.random(), alpha:0.1})
        // g.renderable.drawShape(new Rectangle(Math.random() * 300,Math.random() * 300,Math.random() * 300,Math.random() * 300))
        
        // renderer.render(root);
    })


    const update = () => {
        
    //    g.rotation += 0.01;
        renderer.render(root);
        //   mesh2.rotation += 0.01;
     //   requestAnimationFrame(update);
    }

    update();
}






