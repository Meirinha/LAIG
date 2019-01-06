class Teleporter extends CGFobject{
	constructor(scene) {
		super(scene);

		this.part1 = new MyModel(this.scene, 'halfcyl.vert', 'halfcyl.faces', 1);
		this.top = new MyCylinder(this.scene, 1000, 4, 4, 1, 30, 20);
		this.bot = new MyCylinder(this.scene, 1001, 4, 4, 1, 30, 10);

		let controlPoints2 = [
				[
						vec4.fromValues(this.base / 2, 0.0, 0.0, 1.0), vec4.fromValues(this.base / 2, Math.sqrt(2)*this.base / 2, 0.0, 1.0),
						vec4.fromValues(-this.base / 2, Math.sqrt(2)*this.base / 2, 0.0, 1.0), vec4.fromValues(-this.base / 2, 0.0, 0.0, 1.0)
				],
				[
						vec4.fromValues(this.top / 2, 0.0, this.height, 1.0), vec4.fromValues(this.top / 2, Math.sqrt(2)*this.top / 2, this.height, 1.0),
						vec4.fromValues(-this.top / 2, Math.sqrt(2)*this.top / 2, this.height, 1.0), vec4.fromValues(-this.top / 2, 0.0, this.height, 1.0)
				]
		];
		let nurbsSurface3 = new CGFnurbsSurface(1, 3, controlPoints2);

		this.obj3 = new CGFnurbsObject(this.scene, this.stacks, this.slices, nurbsSurface3);

		this.initBuffers();
	};

	display() {
		this.scene.pushMatrix();
		this.scene.scale(0.2, 0.25, 0.2);

		this.scene.pushMatrix();
		this.scene.scale(1, 1.8, 1);
		this.scene.translate(-0.3,0,0);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.part1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1, 1.8, 1);
		this.scene.translate(-0.3,0,0);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.obj3.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(0,10,0);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.top.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,0);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.bot.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
}
