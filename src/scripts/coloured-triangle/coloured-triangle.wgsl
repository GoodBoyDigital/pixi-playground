
struct SomeVariable {
    alpha: f32,
}

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) color : vec3<f32>,
    @location(1) aUvs : vec2<f32>
  };

@group(0) @binding(0) var<uniform> someVariable : SomeVariable;
@group(0) @binding(1) var myTexture: texture_2d<f32>;
@group(0) @binding(2) var myTextureSampler: sampler;


@vertex
fn mainVert(
  @location(0) aPosition : vec2<f32>, 
  @location(1) aColor : vec3<f32>
) -> VSOutput {
  return VSOutput(
    vec4(aPosition, 0.0, 1.0),
    aColor,
    (aPosition.xy + 1.)/2.
  );
};

@fragment
fn mainFrag(
  @location(0) aColor: vec3<f32>,
  @location(1) aUvs: vec2<f32>
) -> @location(0) vec4<f32> {
  return vec4<f32>(aColor, someVariable.alpha) + textureSample(myTexture, myTextureSampler, aUvs);
};