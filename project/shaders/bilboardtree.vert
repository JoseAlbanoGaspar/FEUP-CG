attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform sampler2D uSampler2;


varying vec2 vTextureCoord;
varying float zOffset;

void main() {
    vec3 newPosition = vec3(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z );
	 
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = vec2(aTextureCoord.s, aTextureCoord.t);
}