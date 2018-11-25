class OVNI extends CGFobject {
	constructor(scene) {
		super(scene);


		/**
		 * CAPE HERE
		 */
		let pointsU = 2;
		let pointsV = 3;
		let partsU = 0;
		let partsV = 0;
		let controlPoints = [
			//segments per pointU
			[
				//line per pointsV
				vec4.fromValues(1,1,1,1),
				vec4.fromValues(1,1,1,1),
				vec4.fromValues(1,1,1,1)
			],
			[
				vec4.fromValues(1,1,1,1),
				vec4.fromValues(1,1,1,1),
				vec4.fromValues(1,1,1,1)
			]
		];
		this.cape = new MyPatch(scene, pointsU, pointsV, partsU, partsV, controlPoints);

		/**
		 * END CAPE
		 */
	};

	display()
	{
		this.scene.setActiveShader(this.scene.testShaders[0]);
        this.scene.testShaders[2].setUniformsValues({heightScale:this.heightScale});
        this.scene.testShaders[2].setUniformsValues({texScale:this.texScale});

        // this.scene.graph.textures[this.idTexture].bind(0);

        // this.scene.graph.textures[this.idWaveMap].bind(1);
	};
	updateTexCoords(sFactor, tFactor) {
	};
}
