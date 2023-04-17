import type { WebGPURenderer } from 'blaze';
import { BlendMode, Buffer,Geometry, Program, Shader, Texture } from 'blaze';

import shaderCode from './textured-triangle.wgsl';

export async function texturedTriangleScene(renderer:WebGPURenderer) {


    const aPosition = new Buffer({
        data: new Float32Array([
            -1, 1, // point 1
            1, 1, // point 2
            -1, -1, // point 3
        ]),
        usage: GPUBufferUsage.VERTEX,
    });

    const aColorUVs = new Buffer({
        data: new Float32Array([
            1, 0, 0, // color 1
            0, 0, // uv1
            0, 1, 0,// color 2
            0, 1, // uv2
            0, 0, 1,// color 3
            1, 0, // uv3
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
                buffer: aColorUVs,
                shaderLocation: 1,
                format: 'float32x3',
                stride: 5 * 4,
                offset: 0,
            },
            aUV:{
                buffer: aColorUVs,
                shaderLocation: 2,
                format: 'float32x2',
                stride: 5 * 4,
                offset: 3 * 4,
            }
        },
        indexBuffer
    });

    const program = new Program({
        fragment: {
            source: shaderCode,
            entryPoint: 'mainFrag',
        },
        vertex: {
            source: shaderCode,
            entryPoint: 'mainVert',
        },
        // TODO auto generate this! WebGPU only?
        layout: {
            0:{
                0:'mySampler',
                1:'myTexture',
            }
        }
    });

    const sampler:GPUSamplerDescriptor = {
        magFilter: 'nearest',
        minFilter: 'nearest',
        addressModeU: 'repeat',
        addressModeV: 'repeat',
    };

    const texture = new Texture({ url: './assets/pic-sensei.jpg', sampler });

    await texture.source.isReady;

    const shader = new Shader({
        program,
        groups:[
            {
                mySampler:texture.sampler,
                myTexture:texture.source,
            }
        ]
    });

    const colorTargetState = new BlendMode();

    renderer.encoder.begin();
    
   
    const passEncoder =  renderer.encoder.passEncoder

    renderer.pipeline.render(geometry, shader, colorTargetState, passEncoder);

    renderer.encoder.finish();
}