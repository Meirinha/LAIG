class Diamond extends CGFobject {

	constructor(scene, id, slices) {
		super(scene);
		this.slices = slices;
		this.id = id;

		this.cone = new MyCylinder(this.scene, this.id, 0.5, 0.0, 2, this.slices, 1);
		this.initBuffers();
	};

	display() {
		this.scene.pushMatrix();
			this.scene.rotate(270*DEGREE_TO_RAD, 1, 0, 0);
			this.cone.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(90*DEGREE_TO_RAD, 1, 0, 0);
			this.cone.display();
		this.scene.popMatrix();

	};

	updateTexCoords(sFactor, tFactor) {

	};
};