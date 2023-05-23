attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying float change;
varying float otherChange;
varying float oneMoreChange;

void main() {
    vec3 offset=vec3(0.0,0.0,0.0);
    offset.y = sin(timeFactor);
    otherChange = sin(timeFactor + 40.0);
    oneMoreChange = sin(timeFactor + 80.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
    change = offset.y;

}