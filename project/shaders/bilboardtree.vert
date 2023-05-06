attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform sampler2D uSampler2;


varying vec2 vTextureCoord;
varying float zOffset;

void main() {

    //vec4 grayColor = texture2D(uSampler2, vec2(x, z));
    
    //zOffset = grayColor.r * 0.25;
    vec3 newPosition = vec3(aVertexPosition.x, aVertexPosition.y /*+ zOffset*/, aVertexPosition.z );  // 0.25 is the maximum height
	 
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = vec2(aTextureCoord.s, aTextureCoord.t);

    //zOffset *= 4.0;
}