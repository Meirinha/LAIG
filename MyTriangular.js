/**
 * MyUnitCubeQuad
 * @constructor
 */
class MyTriangular extends CGFobject
{
	constructor(scene, id, x1, y1, z1, x2, y2, z2, x3, y3, z3, minS = 0, maxS = 1, minT = 0, maxT = 1)
	{
		super(scene);

		this.id = id;

		this.x1 = x1;
		this.y1 = y1;
		this.z1 = z1;

		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;

		this.x3 = x3;
		this.y3 = y3;
		this.z3 = z3;

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.initBuffers();
	};

	initBuffers()
	{
		this.texCoords = [
		this.minS,this.maxT,
		this.maxS,this.maxT,
		this.minS,this.minT,
		this.maxS,this.minT,
		]
		this.vertices = [
		this.x1, this.y1, this.z1,
		this.x2, this.y2, this.z2,
		this.x3, this.y3, this.z3,
		];

		this.indices = [
		0, 1, 2,
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
