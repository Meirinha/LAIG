attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float time;

uniform float normScale;

uniform float heightScale;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	vec3 yset =vec3(0.0,0.0,0.5);
	vec2 textTime = vec2(time, time);

	vTextureCoord = aTextureCoord+textTime;
	float grey = dot(texture2D(uSampler2, vTextureCoord+textTime).rgb, vec3(0.2989, 0.5870, 0.1140));

		offset=aVertexNormal*yset*grey;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
