#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float zOffset;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 altimetry = texture2D(uSampler3, vec2(vTextureCoord.s,1.0 - zOffset));
	
	gl_FragColor = 0.7 * color + 0.3 * altimetry;
}