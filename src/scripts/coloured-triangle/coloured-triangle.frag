in vec3 vColor;
in vec2 vUvs;

out vec4 outColor;

uniform sampler2D myTexture;

uniform float alpha;


void main(void){
    outColor = texture(myTexture, vUvs);
}
