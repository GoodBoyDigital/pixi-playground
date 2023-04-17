

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
  return VSOutput(
    vec4(aPosition, 0.0, 1.0),
    aColor,
    aUV
  );
};

@binding(0) @group(0) var mySampler: sampler;
@binding(1) @group(0) var myTexture: texture_2d<f32>;

@fragment
fn mainFrag(
  @location(0) color: vec3<f32>,
  @location(1) uv: vec2<f32>
) -> @location(0) vec4<f32> {

 
  return  textureSample(myTexture, mySampler, uv) * vec4(color, 1.);
};