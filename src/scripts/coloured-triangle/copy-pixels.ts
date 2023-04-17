import type { WebGPURenderer } from 'blaze';
import { Assets, BindGroup,Buffer,BufferResource, Geometry,GlProgram, GlShader, GpuProgram, GpuShader,Shader, State,Texture, TextureSource, UniformGroup,WebGLRenderer } from 'blaze';

import fragShaderCode from './coloured-triangle.frag';
import vertShaderCode from './coloured-triangle.vert';
import wgslShaderCode from './coloured-triangle.wgsl';

// if(!window.GPUBufferUsage)
// {
//     window.GPUBufferUsage = {};
// }

export async function copyPixelsScene(renderer:WebGPURenderer) {


    const texture = await Assets.load('assets/pic-sensei.jpg');

    const aPosition = new Buffer({
        data: new Float32Array([
            -1, 1, // point 1
            1, 1, // point 2
            -1, -1, // point 3

        ]),
        usage: GPUBufferUsage.VERTEX,
});

    const aColor = new Buffer({
        data: new Float32Array([
            1, 0, 0, // color 1
            0, 1, 0,// color 2
            0, 0, 1// color 3
        ]),
        usage: GPUBufferUsage.VERTEX,
    });

    const indexBuffer = new Buffer({
        data: new Uint32Array([
            0, 1, 2, // triangle 1
        ]),
       usage: GPUBufferUsage.INDEX,
    });
  
    const geometry = new Geometry({
        attributes: {
            aPosition: {
                buffer: aPosition,
                shaderLocation: 0,
                format: 'float32x2',
                stride: 2 * 4,
                offset: 0,
            },
            aColor:{
                buffer: aColor,
                shaderLocation: 1,
                format: 'float32x3',
                stride: 3 * 4,
                offset: 0,
            }
        },
        indexBuffer
    });

    const gpuProgram = new GpuProgram({
        fragment: {
            source: wgslShaderCode,
            entryPoint: 'mainFrag',
        },
        vertex: {
            source: wgslShaderCode,
            entryPoint: 'mainVert',
        },
    });

    const glProgram = new GlProgram({
        fragment: fragShaderCode,
        vertex: vertShaderCode
    });

    const uniformGroup = new UniformGroup({
        alpha:{value:1, type:'f32'},
    });

    renderer.uniformBuffer.updateUniformGroup(uniformGroup);
    
    const shader = new Shader({
        gpuProgram,
        glProgram,
        resources: {
            someVariable:uniformGroup,
            myTexture: texture.source,
            myTextureSampler: texture.style,
        },
    });


    const state = State.for2d();

    const renderTexture = new Texture({
        source:new TextureSource({
            width:512,
            height:512,
        }),
    })

    const outputTexture = new Texture({
        source:new TextureSource({
            width:512,
            height:512,
        }),
    })

  
    // quad...
    

    const update = ()=>{

        shader.resources.myTexture = texture.source;

        // draw to texture..
        renderer.renderTarget.start(renderTexture, true, renderer.background.colorRgba); 
        renderer.renderTarget.draw(geometry, shader, state);
        renderer.renderTarget.finish();
        
        // now copy dem pixels..
         const gl = renderer.gl;
        
        renderer.texture.bind(outputTexture);
        
         gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, 512, 512, 0);
        
        renderer.renderTarget.start(renderer.view.texture, true, renderer.background.colorRgba); 
        
        shader.resources.myTexture = outputTexture.source;

        renderer.renderTarget.draw(geometry, shader, state);

        renderer.renderTarget.finish();

       requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    // renderer.renderTarget.finish();
    
}