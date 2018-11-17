var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
        this.lightValues = {};

        this.lastTime = 0;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);
        // Transparency
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.sceneInited = false;

        this.initCameras();
        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.displayAxis = true;
        this.setUpdatePeriod(16);
        this.animations = [];


		this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);
		this.texture = new CGFtexture(this, "texture.jpg");
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap ('REPEAT', 'REPEAT');


        this.surfaces = [];
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {

        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break; // Only eight lights allowed by WebGL.

            if (this.graph.lights.hasOwnProperty(key)) {
                var light = this.graph.lights[key];

                //lights are predefined in cgfscene
                this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
                this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

                if (light[5]) { //is spot
                    this.lights[i].setSpotCutOff(light[6] * DEGREE_TO_RAD);
                    this.lights[i].setSpotExponent(light[7]);
                    let pos = vec3.fromValues(light[1][0], light[1][1], light[1][2]);
                    let target = vec3.fromValues(light[8][0], light[8][1], light[8][2]);
                    vec3.subtract(pos, target, pos);

                    this.lights[i].setSpotDirection(pos[0], pos[1], pos[2]);
                }
                this.lights[i].setVisible(true);
                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();

                i++;
            }
        }
    }


    /* Handler called when the graph is finally loaded.
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {

        this.camera = this.graph.views[this.graph.defaultView];
        this.interface.setActiveCamera(this.camera);
        this.currCamera = this.graph.defaultView;
        this.changeCamera = this.currCamera;

        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.setGlobalAmbientLight(this.graph.ambient["r"], this.graph.ambient["g"], this.graph.ambient["b"], this.graph.ambient["a"]);

        this.gl.clearColor(this.graph.background["r"], this.graph.background["g"], this.graph.background["b"], this.graph.background["a"]);

        this.initLights();

        // Adds lights group.
        this.interface.addAxis();
        this.interface.addLightsGroup(this.graph.lights);
        this.interface.addViewsGroup(this.graph.views);

        this.sceneInited = true;

    }


    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();

        if (this.sceneInited) {
            // Draw axis
            if (this.displayAxis)
                this.axis.display();
            this.updateLightsDisplay();
            this.setCameraUsed();
            // Displays the scene (MySceneGraph function).

            this.graph.displayScene();

            this.appearance.apply();
            for (i = 0; i < this.surfaces.length; i++) {
                this.pushMatrix();
                this.surfaces[i].display();
                this.popMatrix();
            }
        } else {
            // Draw axis
            if (this.displayAxis)
                this.axis.display();
        }

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }

    updateLightsDisplay() {
        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                } else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }
    }

    setCameraUsed() {
        if (this.currCamera != this.changeCamera) {
            this.camera = this.graph.views[this.changeCamera];
            this.currCamera = this.changeCamera;
            this.interface.setActiveCamera(this.camera);
        }
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    update(currTime) {

      for(var node in this.graph.components) {
        this.graph.components[node].updateAnimation(currTime - this.lastTime);
      }
      this.lastTime = currTime;
        }
};
