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
				vec4.fromValues(0,0,1,1),
				vec4.fromValues(0,1,1,1),
				vec4.fromValues(0,1,0,1)
			],
			[
				vec4.fromValues(1,0,0.5,1),
				vec4.fromValues(1,0.5,0.5,1),
				vec4.fromValues(1,0.5,0,1)
			]
		];
		this.cape = new MyPatch(scene, pointsU, pointsV, partsU, partsV, controlPoints);

		/**
		 * END CAPE
		 */
	};

	display()
	{
		this.scene.setActiveShader(this.scene.testShaders[1]);
        this.scene.testShaders[1].setUniformsValues({heightScale:this.heightScale});
        this.scene.testShaders[1].setUniformsValues({texScale:this.texScale});

        this.scene.graph.textures["watertexture"].bind(0);

        this.scene.graph.textures["wavemap"].bind(1);


        this.cape.display();
	};
	updateTexCoords(sFactor, tFactor) {
	};
}
