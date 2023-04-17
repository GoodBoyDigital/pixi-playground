

import { Assets, BitmapFont, BitmapText, Color, Container, filters, Geometry, Graphics, Mesh, Renderer,Shader,Sprite, Texture } from 'pixi.js';

import shaderCode from './coloured-triangle.wgsl';
import { RoundedRectangle } from './RoundedRectangle';
import { loadTexture } from './textureUtils';


export async function graphicsDynamicScenePixi(__renderer:WebGPURenderer) {

    
    await Assets.load('assets/fonts/comicmsdf.fnt');

    const renderer = new Renderer({
        backgroundColor:0xD3EEDD,
    })

    document.body.appendChild(renderer.view);

    const container = new Container();

    const root = new Container();


    root.addChild(container);
 
    const things:Graphics[] = []; 

    const textSDF = new BitmapText('SDF', {
        fontName:'comicmsdf', 
        fontSize: 100, 
        tint:0xFF0000
    });

 //   textSDF.scale.set(5)
    container.addChild(textSDF);

    for(let i = 0; i < 2; i++){
    
        const thing = new Graphics()
        
       // thing.context.batchMode = 'no-batch';

        things.push(thing)
        
        container.addChild(thing);

        thing.x = Math.random() * 800;
        thing.y = Math.random() * 600;

        thing.scale.set( 0.5)
    }

    let tick = 0;

    const geometry = new Geometry()
    .addAttribute('aVertexPosition', // the attribute name
        [-100, -100, // x, y
            100, -100, // x, y
            100, 100], // x, y
        2) // the size of the attribute

    .addAttribute('aColor', // the attribute name
        [1, 0, 0, // r, g, b
            0, 1, 0, // r, g, b
            0, 0, 1], // r, g, b
        3) // the size of the attribute

    .addAttribute('aUvs', // the attribute name
        [0, 0, // u, v
            1, 0, // u, v
            1, 1], // u, v
        2); // the size of the attribute

const vertexSrc = `

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec3 aColor;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;
    varying vec3 vColor;

    void main() {

        vUvs = aUvs;
        vColor = aColor;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`;

const fragmentSrc = `

    precision mediump float;

    varying vec3 vColor;
    varying vec2 vUvs;

    uniform vec4 inputColor;
    uniform sampler2D uSampler2;

    void main() {

        gl_FragColor = vec4(inputColor);
    }`;

    const color = new Color('yellow');

    
const uniforms = { 
    inputColor: color,
    uSampler2: Texture.from('examples/assets/bg_scene_rotate.jpg') 
};

const shader = Shader.from(vertexSrc, fragmentSrc, uniforms);

const triangle = new Mesh(geometry, shader);

triangle.position.set(400, 300);
triangle.scale.set(2);

root.addChild(triangle);
//    uniforms
    // root.addChild(fruit);
    const update = () => {
        
        
        tick+=0.1;
        
        for(let i = 0; i < things.length; i++)
        {
            const thing = things[i];

          //  if(tick === 0)
            {
                thing.clear();
                thing.lineStyle(10, 0xff0000, 1);
                thing.beginFill(0xffFF00, 0.5);

                thing.moveTo(-120 + Math.sin(tick) * 20, -100 + Math.cos(tick) * 20);
                thing.lineTo(120 + Math.cos(tick) * 20, -100 + Math.sin(tick) * 20);
                thing.lineTo(120 + Math.sin(tick) * 20, 100 + Math.cos(tick) * 20);
                thing.lineTo(-120 + Math.cos(tick) * 20, 100 + Math.sin(tick) * 20);
                thing.lineTo(-120 + Math.sin(tick) * 20, -100 + Math.cos(tick) * 20);
                thing.closePath();

            }
            
            thing.rotation = tick * 0.1;
        }


        renderer.render(root);
      
       requestAnimationFrame(update);
    }

    update();
}






