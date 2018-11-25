/**
 * OVNI class, aka vehicle object
 */
class OVNI extends CGFobject {
	constructor(scene) {
		super(scene);


		/**
		 * CAPE HERE
		 */
		let pointsU = 2;
		let pointsV = 3;
		let partsU = 5;
		let partsV = 5;
		let controlPoints = [
			//segments per pointU
			[
				//line per pointsV
				vec4.fromValues(-6,10,-1.5,1),
				vec4.fromValues(0,10,-8,1),
				vec4.fromValues(6,10,-1.5,1)
			],
			[
				vec4.fromValues(-2.5,16.5,-0.2,1),
				vec4.fromValues(0,16.5,-4,1),
				vec4.fromValues(2.5,16.5,-0.2,1)
			]
		];
		let controlPoints2 = [
			//segments per pointU
			[
				//line per pointsV
				vec4.fromValues(6,10,-1.5,1),
				vec4.fromValues(0,10,-8,1),
				vec4.fromValues(-6,10,-1.5,1)
			],
			[
				vec4.fromValues(2.5,16.5,-0.2,1),
				vec4.fromValues(0,16.5,-4,1),
				vec4.fromValues(-2.5,16.5,-0.2,1)
			]
		];
		this.cape = new MyPatch(scene, pointsU, pointsV, partsU, partsV, controlPoints);
		this.cape2 = new MyPatch(scene, pointsU, pointsV, partsU, partsV, controlPoints2);

		/**
		 * END CAPE
		 */
	};

	display()
	{
		this.scene.setActiveShader(this.scene.testShaders[2]);

        this.scene.graph.textures["black"].bind(0);

        this.scene.graph.textures["wavemap"].bind(1);


		this.cape.display();
		this.cape2.display();
		this.scene.setActiveShader(this.scene.defaultShader);

	};
	updateTexCoords(sFactor, tFactor) {
	};
}
