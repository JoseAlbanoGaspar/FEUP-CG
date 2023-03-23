attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float normScale;

varying float filterYCord;

void main() {
    vec3 offset=vec3(0.0,0.0,0.0);
    offset.x = sin(normScale);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

    filterYCord = gl_Position.y;
}