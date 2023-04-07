attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform sampler2D uSampler2;


varying vec2 vTextureCoord;

void main() {
    /*
    1 - obter coordenadas atuais de textura dos 2
    2 - determinar a altura baseado na cor do uSampler2
    3 - alterar a posição
    */

    vec4 grayColor = texture2D(uSampler2, aTextureCoord);
    
    //define altitude
    vec3 newPosition = vec3(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + (grayColor.r * 100.0 / 400.0));  // 150 is the maximum height
	 
    gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);

	vTextureCoord = vec2(aTextureCoord.s, aTextureCoord.t);
}