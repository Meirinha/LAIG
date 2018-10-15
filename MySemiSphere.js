
 class MySemiSphere extends CGFobject{
   constructor (scene, id, slices, stacks) {
 	super(scene);
	this.slices = slices;
	this.stacks = stacks;
  this.id = id;
 	this.initBuffers();
 };
initBuffers () {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
   this.texCoords = [];

    var index = 0;
   	var index_incr = this.stacks+1;
    var ang = 0.0;
    var ang_incr = 2 * Math.PI / this.slices;

    var ang_sphere = 0.0;
    var ang_aux = (Math.PI/2) / this.stacks;

    var height = Math.sin(ang_sphere);
    var coord_x = Math.cos(ang_sphere);
    var coord_y = Math.sin(ang_sphere);

    for(var i = 0; i <= this.slices; i++)
    {
        for(var j = 0; j <= this.stacks+1; j++)
        {

            this.vertices.push(coord_x, coord_y, height);
            this.texCoords.push(coord_x*0.5+0.5,0.5-coord_y*0.5);
            this.normals.push(2*coord_x, 2*coord_y, 2*height);


			if(i !== 0 && j !== 0) {
             this.indices.push(index,index-index_incr-1,index-1);
             this.indices.push(index,index-index_incr,index-index_incr-1);
           }

            index++;

            height=Math.sin(ang_sphere);
            coord_x = Math.cos(ang_sphere)* Math.cos(ang);
            coord_y = Math.cos(ang_sphere)*Math.sin(ang);
            ang_sphere+=ang_aux;

        }
        ang += ang_incr;
        ang_sphere = 0.0;
        height = 0;
        coord_x = Math.cos(ang);
        coord_y = Math.sin(ang);
    };
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
 };

 updateTexCoords(sFactor, tFactor) {

 };
};
