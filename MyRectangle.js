/**
 * MyRectangle
 * @constructor
 */
class MyRectangle extends CGFobject {
	constructor(scene, id, args) {
		super(scene);
		this.id = id;
		this.x1 = args[0];
		this.y1 = args[1];
		this.x2 = args[2];
		this.y2 = args[3];

		this.minS = 0;
		this.maxS = 1;
		this.minT = 0;
		this.maxT = 1;

		this.initBuffers();

	};

	initBuffers() {
		/*this.texCoords = [
			this.minS, this.maxT,
			this.maxS, this.maxT,
			this.minS, this.minT,
			this.maxS, this.minT,
		];*/

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
		];

		this.baseTexCoords = [
			this.minS, this.minT,
			this.minS, this.maxT,
			this.maxS, this.minT,
			this.maxS, this.maxT,
		];
		this.texCoords = new Array(this.baseTexCoords.length);


		this.updateTexCoords(1, 1);

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
	updateTexCoords(sFactor, tFactor) {

		for (let i = 0; i < this.baseTexCoords.length; i++) {
			if (i % 2 == 0)
				this.texCoords[i] = this.baseTexCoords[i] / sFactor;
			else
				this.texCoords[i] = this.baseTexCoords[i] / tFactor;
		}
		this.updateTexCoordsGLBuffers();
	};
};