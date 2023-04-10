attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform sampler2D uSampler2;


varying vec2 vTextureCoord;
varying float zOffset;

void main() {

    vec4 grayColor = texture2D(uSampler2, aTextureCoord);
    
    //define altitude
    zOffset = (grayColor.r * 100.0 / 400.0);
    vec3 newPosition = vec3(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + zOffset);  // 100?? is the maximum height
	 
    gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);

	vTextureCoord = vec2(aTextureCoord.s, aTextureCoord.t);

    zOffset *= 4.0;
}