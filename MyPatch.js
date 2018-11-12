class MyPatch extends CGFobject {
	constructor(scene, npointsU, npointsV, npartsU, npartsV, controlPoints) {
		super(scene);
		let nurbSurface = new CGFnurbsSurface(npointsU, npointsV, controlPoints);
		this.nurbsObject = new CGFnurbsObject(scene, npartsU, npartsV, nurbSurface);
	};
	display() {
		this.nurbsObject.display();
	};

	updateTexCoords(sFactor, tFactor)
	{

	};
}