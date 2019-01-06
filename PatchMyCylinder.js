/**
 * PatchMyCylinder class
 *
 * Cylinder created from nurb surfaces
 */
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
        let controlPoints2 = [
            [
                vec4.fromValues(this.base / 2, 0.0, 0.0, 1.0), vec4.fromValues(this.base / 2, Math.sqrt(2)*this.base / 2, 0.0, 1.0),
                vec4.fromValues(-this.base / 2, Math.sqrt(2)*this.base / 2, 0.0, 1.0), vec4.fromValues(-this.base / 2, 0.0, 0.0, 1.0)
            ],
            [
                vec4.fromValues(this.top / 2, 0.0, this.height, 1.0), vec4.fromValues(this.top / 2, Math.sqrt(2)*this.top / 2, this.height, 1.0),
                vec4.fromValues(-this.top / 2, Math.sqrt(2)*this.top / 2, this.height, 1.0), vec4.fromValues(-this.top / 2, 0.0, this.height, 1.0)
            ]
        ];

        let controlPointsSequel2 = [
            [
                vec4.fromValues(-this.base / 2, 0.0, 0.0, 1.0), vec4.fromValues(-this.base / 2, -this.base * Math.sqrt(2)/ 2, 0.0, 1.0),
                vec4.fromValues(this.base / 2, -this.base* Math.sqrt(2) / 2, 0.0, 1.0), vec4.fromValues(this.base / 2, 0.0, 0.0, 1.0)
            ],
            [
                vec4.fromValues(-this.top / 2, 0.0, this.height, 1.0), vec4.fromValues(-this.top / 2, -this.top* Math.sqrt(2) / 2, this.height, 1.0),
                vec4.fromValues(this.top / 2, -this.top* Math.sqrt(2) / 2, this.height, 1.0), vec4.fromValues(this.top / 2, 0.0, this.height, 1.0)
            ]
        ];
        let nurbsSurface = new CGFnurbsSurface(1, 3, controlPoints);

        this.obj = new CGFnurbsObject(this.scene, this.stacks, this.slices, nurbsSurface); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

        let nurbsSurface2 = new CGFnurbsSurface(1, 3, controlPointsSequel);

        this.obj2 = new CGFnurbsObject(this.scene, this.stacks, this.slices, nurbsSurface2); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

        let nurbsSurface3 = new CGFnurbsSurface(1, 3, controlPoints2);

        this.obj3 = new CGFnurbsObject(this.scene, this.stacks, this.slices, nurbsSurface3);

        let nurbsSurface4 = new CGFnurbsSurface(1, 3, controlPointsSequel2);

        this.obj4 = new CGFnurbsObject(this.scene, this.stacks, this.slices, nurbsSurface4);

    };

    display()
    {
        this.obj.display();
        this.obj2.display();
        this.obj3.display();
        this.obj4.display();
    }

    updateTexCoords(sFactor, tFactor) {

    };
}
