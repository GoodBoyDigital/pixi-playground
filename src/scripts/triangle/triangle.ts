import type { WebGPURenderer } from 'blaze';
import { BlendMode, Geometry, Program, Shader } from 'blaze';
import { Buffer,BufferSystem } from 'blaze';

import shaderCode from './basic-triangle.wgsl';

export async function triangleScene(renderer:WebGPURenderer) {


    const aPosition = new Buffer({
        data: new Float32Array([
            -1, 1, // point 1
            1, 1, // point 2
            -1, -1, // point 3
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
        // TODO auto generate this! WebgPU only?
        layout: {}
    });

    const shader = new Shader({
        program,
        groups:[]
    });

    const colorTargetState = new BlendMode();

    renderer.encoder.begin();
    
   
    const passEncoder =  renderer.encoder.passEncoder

    renderer.pipeline.render(geometry, shader, colorTargetState, passEncoder);

    renderer.encoder.finish();

}