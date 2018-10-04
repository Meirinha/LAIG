/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
	constructor(scene, id, base, top, height, slices, stacks) {
		super(scene);
		this.id = id;
		this.bradius = base;
		this.tradius = top;
		this.height = height;
		this.slices = slices;
		this.stacks = stacks;

		if (this.bradius != this.tradius)
			this.diff = Math.abs(this.bradius - this.tradius);
		else
			this.diff = this.bradius;
		this.initBuffers();
	};

	initBuffers() {

		var ang = Math.PI * 2 / this.slices; //step between slices in radians
		var levels = 1.0 / this.stacks;
		this.vertices = new Array();

		this.indices = new Array();

		this.normals = new Array();

		this.texCoords = new Array();

		var deltaT = 1 / this.stacks;
		var deltaS = 1 / this.slices;


		for (var i = 0; i <= this.stacks; i++)
			for (var j = 0; j <= this.slices; j++) {
				this.vertices.push(Math.cos(j * ang) * ((i * (this.diff / this.stacks)) + 1), Math.sin(j * ang) * ((i * (this.diff / this.stacks)) + 1), i * levels);
				this.normals.push(Math.cos(j * ang), Math.sin(j * ang), 0);
				this.texCoords.push(j * deltaS, i * deltaT);

			}
		for (var i = 0; i < this.stacks; i++)
			for (var j = 0; j <= this.slices; j++) {

				this.indices.push((i * this.slices) + j + i, (i * this.slices) + this.slices + j + 1 + i, i * (this.slices) + this.slices + j + i);
				this.indices.push((i * this.slices) + j + i, (i * this.slices) + j + 1 + i, i * (this.slices) + this.slices + j + 1 + i);
			}


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};