#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

varying vec2 vTextureCoord;

void main() {

	vec4 color = vec4(0.6,0.6,0.9, 1.0) * uLight[0].diffuse;

	vec4 colorSepia = color;
	colorSepia.r = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
	colorSepia.g = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
	colorSepia.b = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;

	gl_FragColor = colorSepia;
}