#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float texScale;

void main() {
// Transformed Vertex position
    vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);

    // Transformed normal position
    vec3 N = normalize(vec3(uNMatrix * vec4(aVertexNormal, 1.0)));

    vec3 eyeVec = -vec3(vertex.xyz);
    vec3 E = normalize(eyeVec);

    vFinalColor = lighting(vertex, E, N);

    gl_Position = uPMatrix * vertex;
	vec2 newTexCoords = vec2(vTextureCoord.s * texScale, vTextureCoord.t * texScale);
	vec4 color = texture2D(uSampler, newTexCoords);
	vec4 filter = texture2D(uSampler2, newTexCoords);

	gl_FragColor = color;
}
