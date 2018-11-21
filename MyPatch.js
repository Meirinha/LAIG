class MyPatch extends CGFobject {
	constructor(scene, npointsU, npointsV, npartsU, npartsV, controlPoints) {
		super(scene);
		let nurbsSurface = new CGFnurbsSurface(npointsU-1 , npointsV-1, controlPoints);

		var obj = new CGFnurbsObject(scene, npartsU, npartsV, nurbsSurface); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

		this.scene.surfaces.push(obj);
	};
	updateTexCoords(sFactor, tFactor) {

	};
}
