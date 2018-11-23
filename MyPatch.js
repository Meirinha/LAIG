class MyPatch extends CGFobject {
	constructor(scene, npointsU, npointsV, npartsU, npartsV, controlPoints) {
		super(scene);
		let nurbsSurface = new CGFnurbsSurface(npointsU-1 , npointsV-1, controlPoints);

		this.obj = new CGFnurbsObject(scene, npartsU, npartsV, nurbsSurface); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

	};
    
    display()
    {
        this.obj.display();
    }
	updateTexCoords(sFactor, tFactor) {

	};
}
