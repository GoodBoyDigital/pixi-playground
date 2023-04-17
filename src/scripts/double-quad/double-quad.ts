import type { WebGPURenderer } from 'blaze';
import { BindGroupLayout } from 'blaze';
import { UniformGroup } from 'blaze';
import { BindGroup,BlendMode, Buffer,Geometry, Program, Shader, Texture } from 'blaze';
import { Matrix, Point } from 'blaze/lib/maths';

import shaderCode from './quad.wgsl';

const sizeMap = [20,100];
const sizeIndex = 0;

class Sprite {
    geometry: Geometry;
    bindGroup: any;
    transformMatrix: Matrix;
    textureBindGroup: any;
    shader: Shader;
    position: Point;

    constructor({texture, program, cameraBindGroup}: {texture:Texture, program: Program, cameraBindGroup: BindGroup}) 
    {
        const size = (10 + Math.random() * 10)// * 0.1;

        console.log(size);

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

        this.geometry = geometry;
        
        this.transformMatrix = new Matrix();
        
        const quadUniforms =  new UniformGroup({
            transformMatrix:{
                value:this.transformMatrix,
                type:'mat3x3<f32>',
            }
        });
    
        this.bindGroup = new BindGroup({
            quadUniforms
        });

        this.textureBindGroup = new BindGroup({
            0:texture.sampler,
            1:texture.source,
        })  

        this.shader = new Shader({
            program,
            groups:[
                this.bindGroup,
                cameraBindGroup,
                this.textureBindGroup,
            ]
        });

        this.position = new Point()
    }
}

export async function doubleQuadScene(renderer:WebGPURenderer) {


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

    const cameraUniforms = new UniformGroup({
        projectionMatrix:{
            value:renderer.projection.projectionMatrix,
            type:'mat3x3<f32>',
        }
    });
    

    const cameraBindGroup = new BindGroup({
        cameraUniforms
    });

    const textureUrls = ['./assets/pic-sensei.jpg','./assets/logo.png' ];

    const textures = textureUrls.map(url=>new Texture({ url, sampler }))

    await Promise.all(textures.map((texture=>texture.source.isReady)))

    const sprites:Sprite[] = [];

    for(let i = 0; i < 10000; i++) 
    {
        const sprite = new Sprite({
            texture:textures[i%textures.length],
            program,
            cameraBindGroup,
        });

        sprite.position.x = Math.random() * 800
        sprite.position.y = Math.random() * 600

        sprites.push(sprite);

    }
    

    
    
    

    
    

    

   
    


   

    const colorTargetState = new BlendMode();
    
    let rot = 0;

    const renderBundleEncoder = renderer.encoder.startRecording();

    for(let i = 0; i < sprites.length; i++)
    {
        const sprite = sprites[i];
       
        renderer.pipeline.render(sprite.geometry, sprite.shader, colorTargetState, renderBundleEncoder);  
    }

    const renderBundle = renderBundleEncoder.finish();

    const useBundle = true;

    function renderUpdate() {
        
        rot += 0.04;
    
        renderer.pipeline.boundGroups = [];
        renderer.pipeline.activePipeline= null
        renderer.encoder.begin();
        
        
        const passEncoder =  renderer.encoder.passEncoder
        
        for(let i = 0; i < sprites.length; i++)
        {
            const sprite = sprites[i];
            
            sprite.transformMatrix
            .identity()
            .rotate(sprite.position.x + rot)// 400, 300, 0, 0, 1,1,0,0,0)
            .translate(sprite.position.x, sprite.position.y)

            sprite.bindGroup.resources.quadUniforms.update();

            if(useBundle)
            {
                renderer.shader.updateData(sprite.shader);
            }
            else
            {
                renderer.pipeline.render(sprite.geometry, sprite.shader, colorTargetState, passEncoder);  
            }
        }
        
       if(useBundle)
       {

           passEncoder.executeBundles([renderBundle]);
           
        }
        
        renderer.encoder.finish();

        requestAnimationFrame(renderUpdate)
        
    }

    renderUpdate()
}