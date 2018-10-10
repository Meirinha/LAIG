/**
 * MyQuad
 * @constructor
 */
class MyBase extends CGFobject
{
	constructor(scene, id, slices)
	{
		super(scene);
		this.slices = slices;
		this.id = id;
		this.initBuffers();
	};

	initBuffers()
	{

		var ang = Math.PI*2 / this.slices; //step between slices in radians
		this.vertices = new Array();
		this.indices =  new Array();
		this.normals =  new Array();
		this.texCoords = new Array();

		this.vertices.push(0,0,0);
		this.texCoords.push(0.5,0.5);
			for (var j = 0; j<=this.slices; j++){
				this.vertices.push(Math.cos(j*ang),Math.sin(j*ang), 0);
				this.texCoords.push(Math.cos(j*ang)/2+0.5,Math.sin(j*ang)/2+0.5);
				this.normals.push(0,0,1);
			}
			for(var i = 1; i<this.slices; i++){
					this.indices.push(0,i,i+1);
			}

						this.indices.push(0,this.slices,1);
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
