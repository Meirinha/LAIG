/**
 * MyModel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyModel(scene, fileVerts, fileFaces, scale) {
	this.scale = scale || 1.;
	this.fileVerts = fileVerts;
	this.fileFaces = fileFaces;
	CGFobject.call(this,scene);
	this.scene = scene;
	this.initBuffers();
};

MyModel.prototype = Object.create(CGFobject.prototype);
MyModel.prototype.constructor = MyModel;

MyModel.prototype.importFile = function(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                 rawFile.allText = rawFile.responseText;
            }
        }
    }
    rawFile.send();
	return rawFile.allText;
}

MyModel.prototype.initBuffers = function () {

	this.vertices = [];

	this.normals = [];

	this.indices = [];

	this.texCoords = [];

	var verts = this.importFile(this.fileVerts).split( "\n" );
	for (var vertice in verts)
	{
		var vertArray = verts[vertice].split( " " );
		this.vertices.push(parseFloat(vertArray[0])/this.scale);
		this.vertices.push(parseFloat(vertArray[1])/this.scale);
		this.vertices.push(parseFloat(vertArray[2])/this.scale);
		this.normals.push(parseFloat(vertArray[3]));
		this.normals.push(parseFloat(vertArray[4]));
		this.normals.push(parseFloat(vertArray[5]));
		this.texCoords.push(parseFloat(vertArray[6]));
		this.texCoords.push(parseFloat(vertArray[7]));
	}

	var faces = this.importFile(this.fileFaces).split( "\n" );
	for (var face in faces)
	{
		var faceArray = faces[face].split( " " );
		this.indices.push(parseInt(faceArray[0]));
		this.indices.push(parseInt(faceArray[1]));
		this.indices.push(parseInt(faceArray[2]));

		if(faceArray.length == 4)
		{
			this.indices.push(parseInt(faceArray[2]));
			this.indices.push(parseInt(faceArray[3]));
			this.indices.push(parseInt(faceArray[0]));
		}
	}

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
MyModel.prototype.updateTexCoords = function(sFactor, tFactor) {

};
