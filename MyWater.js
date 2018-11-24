class MyWater extends CGFobject {
    constructor(scene, idtexture, idwavemap, parts, heightscale, texscale)
    {
        super(scene);
        this.idTexture = idtexture;
        this.idWaveMap = idwavemap;
        this.parts = parts;
		this.heightScale = heightscale;
		this.texScale = texscale;

        this.plane = new MyPlane(this.scene, this.parts, this.parts);
        this.graph = this.scene.graph;

        this.baseTexCoords = [
            -0.5, -0.5,
            0.5, -0.5,
            0.5, 0.5,
            -0.5, 0.5
        ];
    };

    display()
    {
		this.scene.setActiveShader(this.scene.testShaders[0]);
        this.scene.testShaders[0].setUniformsValues({heightScale:this.heightScale});
        this.scene.testShaders[0].setUniformsValues({texScale:this.texScale});

        this.graph.textures[this.idTexture].bind(0);

        this.graph.textures[this.idWaveMap].bind(1);
        this.plane.display();
    }

    updateTexCoords(sFactor, tFactor) {
    };

    getTexture(){return this.idTexture;};
}
