class OVNi extends CGFobject {
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
				vec4.createFrom(1,1,1,1),
				vec4.createFrom(1,1,1,1),
				vec4.createFrom(1,1,1,1)
			],
			[
				vec4.createFrom(1,1,1,1),
				vec4.createFrom(1,1,1,1),
				vec4.createFrom(1,1,1,1)
			]
		];
		this.cape = new MyPatch(scene, pointsU, pointsV, partsU, partsV, controlPoints);

		/**
		 * END CAPE
		 */
	};

	display()
	{

	};
}