import type { WebGPURenderer } from 'blaze';
import { Assets, BindGroup,Buffer,BufferResource, Geometry,GlProgram, GlShader, GpuProgram, GpuShader,Shader, State,UniformGroup,WebGLRenderer } from 'blaze';

import fragShaderCode from './coloured-triangle.frag';
import vertShaderCode from './coloured-triangle.vert';
import wgslShaderCode from './coloured-triangle.wgsl';

// if(!window.GPUBufferUsage)
// {
//     window.GPUBufferUsage = {};
// }

export async function colouredTriangleScene(renderer:WebGPURenderer) {


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

    // const gpuShader = new GpuShader({
    //     program:gpuProgram,
    //     groups:[
    //         new BindGroup({
    //             0:new UniformGroup({
    //                 alpha:{value:0, type:'f32'}
    //             })
    //         })
    //     ]
    // });

    const uniformGroup = new UniformGroup({
        alpha:{value:1, type:'f32'},
    });

    uniformGroup.ubo = true;

    renderer.uniformBuffer.updateUniformGroup(uniformGroup);
    
    const bufferResource = new BufferResource({
        buffer:uniformGroup.buffer,
        offset:0,
        size: 4*4
    })

    // const gpuShader = new GpuShader({
    //     program:gpuProgram,
    //     groups:[
    //         uniformGroup
    //     ]
    // });

    // const glShader = new GlShader({
    //     program:glProgram,
    //     uniforms: {
    //         someVariable:bufferResource,
    //     },
    //     // uniformBuffers:[
    //     //      {index:0, name:'someVariable', uniforms:uniformGroup},
    //     // ]
    // });
    
    const shader = new Shader({
        gpuProgram,
        glProgram,
        // groups: {
        //     0:new BindGroup({
        //         0:uniformGroup,
        //         1:texture.source,
        //         2:texture.style
        //     })
        // },
        // groupMap:{
        //     0:{
        //         0:'someVariable',
        //         1:'myTexture',
        //         2:'myTextureSampler'
        //     }
        // },
        // uniforms:{
        //     someVariable:uniformGroup,
        //     myTexture:texture.source,
        //     myTextureSampler:texture.style
        // },
    });

    // const shader2 = new Shader({
    //     //  gpuProgram,
    //       glProgram,
    //     //   groups: [
    //     //     {
    //     //         group:0, 
    //     //         value:new BindGroup({
    //     //             0:uniformGroup,
    //     //             1:texture.source,
    //     //             2:texture.style
    //     //         })
    //     //     },
    //     //   ],
    //     //   groupMap:[
    //     //     {group:0, bind:1, name:'someVariable'},
    //     //     {group:0, bind:2, name:'myTexture'},
    //     //     {group:0, bind:3, name:'myTextureSampler'},
    //     // ],
    //       uniforms:{
    //           someVariable:uniformGroup,
    //           myTexture:texture.source,
    //           myTextureSampler:texture.style
    //       },
          
    //   });

    const state = State.for2d();

    const update = ()=>{

        renderer.renderTarget.start(renderer.view.texture, true, renderer.background.colorRgba); 
        
        uniformGroup.uniforms.alpha = Math.random();
        
       // uniformGroup.update();
        renderer.uniformBuffer.updateUniformAndUploadGroup(uniformGroup);
      //  renderer.buffer.updateBuffer(uniformGroup.buffer);
   
        if(renderer instanceof WebGLRenderer)
        {
            shader.program = shader.glProgram;

            renderer.renderTarget.draw(geometry, shader, state);
        }
        else
        {
            shader.program = shader.gpuProgram;

            renderer.renderTarget.draw(geometry, shader, state);
        }
        
        renderer.renderTarget.finish();
    // requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    // renderer.renderTarget.finish();
    
}