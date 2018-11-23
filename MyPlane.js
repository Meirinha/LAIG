class MyPlane extends CGFobject {
    constructor(scene, npartsU, npartsV) {
        super(scene);

        let controlPoints = [
            [vec4.fromValues(-0.5, 0.0, -0.5,1), vec4.fromValues(0.5, 0.0, -0.5,1)],
            [vec4.fromValues(-0.5, 0.0, 0.5,1), vec4.fromValues(0.5, 0.0, 0.5,1)]
        ];
        let nurbsSurface = new CGFnurbsSurface(1, 1, controlPoints);

        this.obj = new CGFnurbsObject(scene, npartsU, npartsV, nurbsSurface);
        // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)
    }

    display()
    {
        this.obj.display();
    }
    updateTexCoords(sFactor, tFactor) {

    };
}