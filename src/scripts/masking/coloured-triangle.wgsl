


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) color : vec3<f32>,
  };

@vertex
fn mainVert(
  @location(0) aPosition : vec2<f32>, 
  @location(1) aColor : vec3<f32>
) -> VSOutput {
  return VSOutput(
    vec4(aPosition, 0.0, 1.0),
    aColor
  );
};

@fragment
fn mainFrag(
  @location(0) aColor: vec3<f32>
) -> @location(0) vec4<f32> {
  return vec4<f32>(aColor, 1.0);
};