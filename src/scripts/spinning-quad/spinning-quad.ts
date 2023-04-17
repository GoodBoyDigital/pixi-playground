import type { WebGPURenderer } from 'blaze';
import { BindGroupLayout } from 'blaze';
import { UniformGroup } from 'blaze';
import { BindGroup,BlendMode, Buffer,Geometry, Program, Shader, Texture } from 'blaze';
import { Matrix } from 'blaze/lib/maths';

import shaderCode from './quad.wgsl';

export async function spinningQuadScene(renderer:WebGPURenderer) {


    const size = 100;

    const aPosition = new Buffer({
        data: new Float32Array([
            -size, size, // point 1
            size, size, // point 2
            -size, -size, // point 3
            size, -size, // point 4
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
            1, 1, 1,// color 4
            1, 1, // uv4
        ]),
        usage: GPUBufferUsage.VERTEX,
    });



    const indexBuffer = new Buffer({
        data: new Uint32Array([
            0, 1, 2, // triangle 1
            2, 1, 3, // triangle 2
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

        layout:[
            {quadUniforms:0},
            {cameraUniforms:0}, 
            {mySampler:0,myTexture:1}     
        ],

        gpuLayout: [
            [
                {
                    buffer:{
                        type:'uniform',
                    },
                    binding: 0,  
                    visibility: GPUShaderStage.VERTEX,
                }
            ],
            [
                {
                    buffer:{
                        type:'uniform',
                    },
                    binding: 0, 
                    visibility: GPUShaderStage.VERTEX,
                }
            ],
            [
                {
                    name:'mySampler',
                    sampler:{
                        type:'filtering'
                    },
                    binding: 0,
                    visibility: GPUShaderStage.FRAGMENT,
                },
                {
                    name:'myTexture',
                    texture: {
                        sampleType: 'float',
                        viewDimension: '2d',
                        multisampled:false
                    },
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                }
            ],     
        ]
    });

    const sampler:GPUSamplerDescriptor = {
        magFilter: 'nearest',
        minFilter: 'nearest',
        addressModeU: 'repeat',
        addressModeV: 'repeat',
    };

    
    const texture = new Texture({ url: './assets/pic-sensei.jpg', sampler });

    await texture.source.isReady;

    const cameraUniforms = new UniformGroup({
        projectionMatrix:{
            value:renderer.projection.projectionMatrix,
            type:'mat3x3<f32>',
        }
    });
    
    

    const transformMatrix = new Matrix();

    const quadUniforms = new UniformGroup({
        transformMatrix:{
            value:transformMatrix,
            type:'mat3x3<f32>',
        }
    });

    const bindGroup = new BindGroup({
        0:quadUniforms
    });

    const bindGroup2 = new BindGroup({
        0:cameraUniforms
    });

    const bindGroup3 = new BindGroup({
        0:texture.sampler,
        1:texture.source,
    });

    const shader = new Shader({
        program,
        groups:[
            bindGroup,
            bindGroup2,
            bindGroup3,
        ]
    });

    


   

    const colorTargetState = new BlendMode();
    
    let rot = 0;

    function renderUpdate() {
        
        rot += 0.04;

        transformMatrix
        .identity()
        .rotate(rot)// 400, 300, 0, 0, 1,1,0,0,0)
        .translate(400, 300)
        
        renderer.encoder.begin();
        
        
        const passEncoder =  renderer.encoder.passEncoder
        
        renderer.pipeline.render(geometry, shader, colorTargetState, passEncoder);
        
        renderer.encoder.finish();

        requestAnimationFrame(renderUpdate)
        
    }

    renderUpdate()
}