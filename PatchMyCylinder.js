class PatchMyCylinder extends CGFobject {
	constructor(scene, base, top, height, slices, stacks) {
		super(scene);
		this.height = height;
		this.bradius = base;
		this.tradius = top;
		this.slices = slices;
		this.stacks = stacks;
		this.id = id;

		this.initBuffers();
	};

	initBuffers(){
		
	};

	updateTexCoords(sFactor, tFactor) {

	};
}