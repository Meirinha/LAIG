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
    };

    display()
    {
		this.scene.setActiveShader(this.scene.testShaders[0]);
        this.scene.testShaders[0].setUniformsValues({heightScale:this.heightScale});
        this.graph.textures[this.idTexture].bind(0);
        this.graph.textures[this.idWaveMap].bind(1);
        this.plane.display();
    }

    updateTexCoords(sFactor, tFactor) {
		for (let i = 0; i < this.baseTexCoords.length; i++) {
			if (i % 2 == 0)
				this.texCoords[i] = this.baseTexCoords[i] / this.texScale;
			else
				this.texCoords[i] = this.baseTexCoords[i] / this.texScale;
		}
		this.updateTexCoordsGLBuffers();
    };

    getTexture(){return this.idTexture;};
}