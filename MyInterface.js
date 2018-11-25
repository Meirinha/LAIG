/**
 * MyInterface class, creating a GUI interface.
 */
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        this.gui.open();
        return true;
    }

    addAxis() {
        this.gui.add(this.scene, 'displayAxis').name("Display Axis");
    }

    /**
     * Adds a folder containing the IDs of the lights passed as parameter.
     * @param {array} lights
     */
    addLightsGroup(lights) {

        var group = this.gui.addFolder("Lights");
        group.open();

        // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
        // e.g. this.option1=true; this.option2=false;

        for (var key in lights) {
            if (lights.hasOwnProperty(key)) {

                this.scene.lightValues[key] = lights[key][0];
                group.add(this.scene.lightValues, key);
            }
        }
    }

    addViewsGroup(views) {
        // var group = this.gui.addFolder("Camera");
        //group.close();

        this.cameraArray = [];

        for (var key in views) {
            this.cameraArray.push(key);
        }

        this.gui.add(this.scene, 'changeCamera', this.cameraArray).name("Active Camera");
    }

    addShadersGroup() {
        this.gui.add(this.scene, 'selectedExampleShader', {
            'Simple texturing': 0,
            'Multiple textures in VS and FS': 1

        }).name('Shader examples');
    }

    processKeyUp(event) {
        let graph = this.scene.graph;
        if (event.code == "KeyM") {
            console.log("Pressed M");
            graph.componentsNextMaterial();
        }
    }
}