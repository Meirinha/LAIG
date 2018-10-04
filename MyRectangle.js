/**
 * MyRectangle
 * @constructor
 */
class MyRectangle extends CGFobject {
	constructor(scene, id, x1, y1, x2, y2) {
		super(scene);
		this.id = id;
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;

		this.minS = 0;
		this.maxS = 1;
		this.minT = 0;
		this.maxT = 1;

		this.initBuffers();

	};

	initBuffers() {
		this.texCoords = [
			this.minS, this.maxT,
			this.maxS, this.maxT,
			this.minS, this.minT,
			this.maxS, this.minT,
		]

		this.vertices = [
			this.x1, this.y1, 0,
			this.x2, this.y1, 0,
			this.x2, this.y2, 0,
			this.x1, this.y2, 0
		];

		this.indices = [
			0, 1, 2,
			3, 0, 2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};