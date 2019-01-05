class CyberPiece extends CGFobject{
	constructor(scene, robotAppearance, ballAppearance) {
		super(scene);

		this.robot = new MyModel(this.scene, 'robot.vert', 'robot.faces', 6);
		this.ball = new MyModel(this.scene, 'ball.vert', 'ball.faces', 6);
		
		this.robotAppearance = robotAppearance;
		this.ballAppearance = ballAppearance;

		this.initBuffers();
	};

	display() {
		this.scene.pushMatrix();
		this.scene.translate(0,-3,-0.4);
		this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
		this.robotAppearance.apply();
		this.robot.display();

		this.ballAppearance.apply();
		this.ball.display();
		this.scene.popMatrix();
	}
}