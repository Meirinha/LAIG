class JapanesePiece extends CGFobject{
	constructor(scene, robotAppearance) {
		super(scene);

		this.kokeshi = new MyModel(this.scene, 'kokeshi.vert', 'kokeshi.faces', 1.5);

		this.robotAppearance = robotAppearance;

		this.initBuffers();
	};

	display() {
		this.scene.pushMatrix();
		this.scene.translate(-0.1,0,0);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.robotAppearance.apply();
		this.kokeshi.display();
		this.scene.popMatrix();
	}
}
