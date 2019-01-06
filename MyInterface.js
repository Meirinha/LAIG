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

        this.gui.close();
        return true;
    }

    addAxis() {
        this.gui.add(this.scene, 'displayAxis').name("Display Axis");
    }

    /**
     * Adds a folder containing the IDs of the lights passed as parameter.
     * @param {array} lights
     */
    addLightsGroupCyberpunk(lights) {

        let group = this.gui.addFolder("Lights_Cyber");
        group.close();

        // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
        // e.g. this.option1=true; this.option2=false;

        for (var key in lights) {
            if (lights.hasOwnProperty(key)) {

                this.scene.lightValues[key] = lights[key][0];
                group.add(this.scene.lightValues, key);
            }
        }
    }
        addLightsGroupJapanese(lights) {

        let group = this.gui.addFolder("Lights_Japan");
        group.close();

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

    addGameGroup(gameGraphs)
    {
        var group = this.gui.addFolder("Game");
        group.close();

        group.add(this.scene, 'playTimer').name("Play Timer");
        group.add(this.scene, 'botDiff', [1,2,3]).name("Bot Difficulty");
        group.add(this.scene, 'currentEnvironment', gameGraphs).name("Environment");
    }

    addMusicGroup() {
        this.audio = new Array();

        this.audio.push(new Audio('scenes/songs/cyberpunk.mp3'));
        this.audio.push(new Audio('scenes/songs/japanese.mp3'));

        let arrayMusic = [0,1];

        this.gui.add(this.scene, 'currentMusic', arrayMusic).name("Music");
        this.gui.add(this.scene, 'music').name('Press P to play');
        this.gui.add(this.scene, 'music').name('Press S to pause');
    }

    processKeyUp(event) {
        let graph = this.scene.graph;
        if (event.code == "KeyM") {
            console.log("Pressed M");
            graph.componentsNextMaterial();
        } else if(event.code == "KeyZ") {
            console.log("Pressed Z");
            this.scene.undoMove();
        } else if(event.code == "KeyC")
        {
            console.log("Pressed C");
            this.scene.isMovingCamera = true;
            this.scene.moveCameraTimer = 0.0;
        }
    }
}
