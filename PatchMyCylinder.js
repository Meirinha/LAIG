class PatchMyCylinder extends CGFobject {
    constructor(scene, base, top, height, slices, stacks) {
        super(scene);
        this.height = height;
        this.base = base;
        this.top = top;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    };

    initBuffers() {


        let controlPoints = [
            [
                vec4.fromValues(-this.base / 2, 0.0, 0.0, 1.0), vec4.fromValues(-this.base / 2, Math.sqrt(2)*this.base / 2, 0.0, 1.0),
                vec4.fromValues(this.base / 2, Math.sqrt(2)*this.base / 2, 0.0, 1.0), vec4.fromValues(this.base / 2, 0.0, 0.0, 1.0)
            ],
            [
                vec4.fromValues(-this.top / 2, 0.0, this.height, 1.0), vec4.fromValues(-this.top / 2, Math.sqrt(2)*this.top / 2, this.height, 1.0),
                vec4.fromValues(this.top / 2, Math.sqrt(2)*this.top / 2, this.height, 1.0), vec4.fromValues(this.top / 2, 0.0, this.height, 1.0)
            ]
        ];

        let controlPointsSequel = [
            [
                vec4.fromValues(this.base / 2, 0.0, 0.0, 1.0), vec4.fromValues(this.base / 2, -this.base * Math.sqrt(2)/ 2, 0.0, 1.0),
                vec4.fromValues(-this.base / 2, -this.base* Math.sqrt(2) / 2, 0.0, 1.0), vec4.fromValues(-this.base / 2, 0.0, 0.0, 1.0)
            ],
            [
                vec4.fromValues(this.top / 2, 0.0, this.height, 1.0), vec4.fromValues(this.top / 2, -this.top* Math.sqrt(2) / 2, this.height, 1.0),
                vec4.fromValues(-this.top / 2, -this.top* Math.sqrt(2) / 2, this.height, 1.0), vec4.fromValues(-this.top / 2, 0.0, this.height, 1.0)
            ]
        ];
        let nurbsSurface = new CGFnurbsSurface(1, 3, controlPoints);

        var obj = new CGFnurbsObject(this.scene, this.stacks, this.slices, nurbsSurface); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

        this.scene.surfaces.push(obj);

        let nurbsSurface2 = new CGFnurbsSurface(1, 3, controlPointsSequel);

        var obj2 = new CGFnurbsObject(this.scene, this.stacks, this.slices, nurbsSurface2); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

        this.scene.surfaces.push(obj2);
    };

    updateTexCoords(sFactor, tFactor) {

    };
}