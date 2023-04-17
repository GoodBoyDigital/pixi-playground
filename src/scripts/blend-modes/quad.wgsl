struct CameraUniforms {
  projectionMatrix:mat3x3<f32>
}

struct QuadUniforms {
  transformMatrix:mat3x3<f32>
}



@group(0) @binding(0) var<uniform> quadUniforms : QuadUniforms;
@group(1) @binding(0) var<uniform> cameraUniforms : CameraUniforms;


@group(2) @binding(0) var mySampler: sampler;
@group(2) @binding(1) var myTexture: texture_2d<f32>;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) color : vec3<f32>,
    @location(1) uv : vec2<f32>,
  };

  
@vertex
fn mainVert(
  @location(0) aPosition : vec2<f32>, 
  @location(1) aColor : vec3<f32>,
  @location(2) aUV : vec2<f32>
) -> VSOutput {

  var  mvpMatrix = cameraUniforms.projectionMatrix *  quadUniforms.transformMatrix; 
  
  return VSOutput(
    vec4<f32>((mvpMatrix * vec3<f32>(aPosition, 1.0)).xy, 0.0, 1.0),
    aColor,
    aUV
  );
};


@fragment
fn mainFrag(
  @location(0) color: vec3<f32>,
  @location(1) uv: vec2<f32>
) -> @location(0) vec4<f32> {

 
  return  textureSample(myTexture, mySampler, uv) * vec4(color, 1.);
};