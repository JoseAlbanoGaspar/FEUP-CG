#ifdef GL_ES
precision highp float;
#endif

varying float change;
varying float otherChange;
varying float oneMoreChange;

void main() {
    //gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    float color = (change + 1.0) / 2.0;
    float otherColor = (otherChange + 1.0) / 2.0;
    float oneMoreColor = (oneMoreChange + 1.0) / 2.0;

    gl_FragColor = vec4(otherColor,color,oneMoreColor,1.0);
}