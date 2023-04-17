// [[block]] struct ColorUniforms {
//   uColor : vec4<f32>;
// };
// [[binding(0), group(0)]] var<uniform> uColors : ColorUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>
  };

@vertex
fn mainVert(@location(0) aPosition : vec2<f32>) -> VSOutput {
  var output : VSOutput;
  output.position = vec4(aPosition, 0.0, 1.0);
  return output;
};

@fragment
fn mainFrag() -> @location(0) vec4<f32> {
  return vec4<f32>(1.0, 0.0, 0.0, 1.0);
};