class MyTerrain extends CGFobject {
    constructor(scene, idtexture, idheightmap, parts, heightscale)
    {
        super(scene);
        this.idTexture = idtexture;
        this.idHeightMap = idheightmap;
        this.parts = parts;
        this.heightScale = heightscale;

        this.plane = new MyPlane(this.scene, this.parts, this.parts);
        this.graph = this.scene.graph;
    };

    display()
    {
        this.scene.setActiveShader(this.scene.testShaders[1]);
        this.scene.testShaders[1].setUniformsValues({heightScale:this.heightScale});
        this.graph.textures[this.idTexture].bind(0);
        this.graph.textures[this.idHeightMap].bind(1);
        this.plane.display();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    updateTexCoords(sFactor, tFactor) {

    };

    getTexture(){return this.idTexture;};
}