class Teleporter extends CGFobject{
	constructor(scene, topApperance, midAppearance) {
		super(scene);

		this.part1 = new MyModel(this.scene, 'halfcyl.vert', 'halfcyl.faces', 1);
		this.top = new MyCylinder(this.scene, 1000, 4, 4, 1, 30, 20);
		this.bot = new MyCylinder(this.scene, 1001, 4, 4, 1, 30, 10);

		this.topApperance = topApperance;
		this.midAppearance = midAppearance;
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
		this.midAppearance.apply();
		this.part1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(10, 10.08, 10.98);
// 		this.scene.rotate(-180*DEGREE_TO_RAD, 0, 1, 0);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.midAppearance.apply();
		this.obj3.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(0,10,0);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.topApperance.apply();
		this.top.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,0);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.topApperance.apply();
		this.bot.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
}
