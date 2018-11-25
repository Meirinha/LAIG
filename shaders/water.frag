#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float texScale;

void main() {
	vec2 newTexCoords = vec2(vTextureCoord.s * texScale, vTextureCoord.t * texScale);
	vec4 color = texture2D(uSampler, newTexCoords);
	vec4 filter = texture2D(uSampler2, newTexCoords);

	gl_FragColor = color;
}
