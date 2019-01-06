var DEGREE_TO_RAD = Math.PI / 180;

let CELL_WIDTH = 2.0;
let BOARD_SIZE = 19;
let THROW_ANIMATION_TIME = 2000;
let MOVE_CAMERA_TIME = 2000;


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
        this.initShaders();

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
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.initAppearances();

        this.gameGraphs = new Array();
        this.gameEnvironments = new Array();

        this.surfaces = [];
        this.objects = [];

        for (let i = 0; i < 76; i++)
            this.objects.push(new CGFplane(this));

        this.setPickEnabled(true);

        this.initGameVariables();
    }

    initGameVariables() {
        this.board;
        this.nextBoard;
        this.direction = "down";
        this.line = 10;
        this.gameOver = false;
        this.gameState = "menu";

        this.playTimer = 15;

        this.animationPiece;
        this.throwAnimationOccurring = false;
        this.animationJustFinished = false;

        this.previousBoard = [];
        this.moveSequences = [];

        this.vsBot = false; //TODO
        this.botDiff = 2;
        this.botColor = "black";

        this.whitePiece = new CyberPiece(this, this.robotWhite, this.ballWhite);
        this.blackPiece = new CyberPiece(this, this.robotBlack, this.ballBlack);

        this.teleporter = new Teleporter(this);

        this.menu1 = new MyPlane(this, 1, 1);
        this.menu2 = new MyPlane(this, 1, 1);
        this.menu3 = new MyPlane(this, 1, 1);

        this.boardQuad = new MyRectangle(this, 1, [0, 0, 1, 1]);

        this.cameraTimerDelta = 0.0;
        this.moveCameraTimer = MOVE_CAMERA_TIME;
        this.isMovingCamera = false;
        this.cameraPositionIndex = 0;

        this.resetRequest();
    }

    initAppearances() {

        this.appearance = new CGFappearance(this);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.initMenuAppearances();

        // White Pieces
        this.robotWhite = new CGFappearance(this);
        this.robotWhite.setEmission(0.3, 0.2, 0.1, 1.0);
        this.robotWhite.setAmbient(0.2, 0.2, 0.2, 1);
        this.robotWhite.setDiffuse(0.8, 0.6, 0.1, 1);
        this.robotWhite.setSpecular(0.85, 0.64, 0.12, 1);
        this.robotWhite.setShininess(1);

        this.ballWhite = new CGFappearance(this);
        this.ballWhite.setEmission(0.0, 0.2, 0.1, 1.0);
        this.ballWhite.setAmbient(0.2, 0.2, 0.2, 1);
        this.ballWhite.setDiffuse(0.2, 0.5, 0.3, 1);
        this.ballWhite.setSpecular(0.3, 0.7, 0.4, 1);
        this.ballWhite.setShininess(0.7);

        this.robotBlack = new CGFappearance(this);
        this.robotBlack.setEmission(0.1, 0.2, 0.4, 1.0);
        this.robotBlack.setAmbient(0.2, 0.2, 0.2, 1);
        this.robotBlack.setDiffuse(0.1, 0.3, 0.5, 1);
        this.robotBlack.setSpecular(0.27, 0.5, 0.7, 1);
        this.robotBlack.setShininess(0.7);

        this.ballBlack = new CGFappearance(this);
        this.ballBlack.setEmission(0.3, 0.3, 0.3, 1.0);
        this.ballBlack.setAmbient(0.2, 0.2, 0.2, 1);
        this.ballBlack.setDiffuse(0.5, 0.5, 0.5, 1);
        this.ballBlack.setSpecular(0.75, 0.75, 0.75, 1);
        this.ballBlack.setShininess(1);

        this.boardAppearance = new CGFappearance(this);
        this.boardAppearance.loadTexture('../scenes/images/board.jpg');
    }

    initMenuAppearances() {
        this.menu1app = new CGFappearance(this);
        this.menu1app.setAmbient(0.3, 0.3, 0.3, 1);
        this.menu1app.setDiffuse(0.7, 0.7, 0.7, 1);
        this.menu1app.setSpecular(0.0, 0.0, 0.0, 1);
        this.menu1app.setShininess(120);
        this.menu1app.loadTexture('../scenes/images/pp.png');

        this.menu2app = new CGFappearance(this);
        this.menu2app.setAmbient(0.3, 0.3, 0.3, 1);
        this.menu2app.setDiffuse(0.7, 0.7, 0.7, 1);
        this.menu2app.setSpecular(0.0, 0.0, 0.0, 1);
        this.menu2app.setShininess(120);
        this.menu2app.loadTexture('../scenes/images/pc.png');

        this.menu3app = new CGFappearance(this);
        this.menu3app.setAmbient(0.3, 0.3, 0.3, 1);
        this.menu3app.setDiffuse(0.7, 0.7, 0.7, 1);
        this.menu3app.setSpecular(0.0, 0.0, 0.0, 1);
        this.menu3app.setShininess(120);
        this.menu3app.loadTexture('../scenes/images/cc.png');
    }

    initShaders() {

        this.testShaders = [
            new CGFshader(this.gl, "shaders/water.vert", "shaders/water.frag"),
            new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag"),
            new CGFshader(this.gl, "shaders/OVNI.vert", "shaders/OVNI.frag")
        ];

        this.selectedExampleShader = 0;
        this.scaleFactor = 1.0;

        this.testShaders[0].setUniformsValues({
            uSampler2: 1
        });
        this.testShaders[1].setUniformsValues({
            uSampler2: 1
        });
        this.testShaders[2].setUniformsValues({
            uSampler2: 1
        });
        this.updateScaleFactor();
    }

    updateScaleFactor() {
        this.testShaders[0].setUniformsValues({
            normScale: 1
        });
        this.testShaders[1].setUniformsValues({
            normScale: 1
        });
        this.testShaders[2].setUniformsValues({
            normScale: 1
        });
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

        // Reads the lights from the scene gameGraphs[this.currentEnvironment].
        for (var key in this.gameGraphs[this.currentEnvironment].lights) {
            if (i >= 8)
                break; // Only eight lights allowed by WebGL.

            if (this.gameGraphs[this.currentEnvironment].lights.hasOwnProperty(key)) {
                var light = this.gameGraphs[this.currentEnvironment].lights[key];

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


    /* Handler called when the gameGraphs[this.currentEnvironment] is finally loaded.
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {

        this.camera = this.gameGraphs[this.currentEnvironment].views[this.gameGraphs[this.currentEnvironment].defaultView];
        this.interface.setActiveCamera(this.camera);
        this.currCamera = this.gameGraphs[this.currentEnvironment].defaultView;
        this.changeCamera = this.currCamera;

        this.axis = new CGFaxis(this, this.gameGraphs[this.currentEnvironment].referenceLength);

        this.setGlobalAmbientLight(this.gameGraphs[this.currentEnvironment].ambient["r"], this.gameGraphs[this.currentEnvironment].ambient["g"], this.gameGraphs[this.currentEnvironment].ambient["b"], this.gameGraphs[this.currentEnvironment].ambient["a"]);

        this.gl.clearColor(this.gameGraphs[this.currentEnvironment].background["r"], this.gameGraphs[this.currentEnvironment].background["g"], this.gameGraphs[this.currentEnvironment].background["b"], this.gameGraphs[this.currentEnvironment].background["a"]);

        this.initLights();

        // Adds lights group.
        this.interface.addAxis();
        // if (this.currentEnvironment == 'cyberpunk.xml')
        //     this.interface.addLightsGroupCyberpunk(this.gameGraphs[this.currentEnvironment].lights);
        // else
        //     this.interface.addLightsGroupJapanese(this.gameGraphs[this.currentEnvironment].lights);
        this.interface.addViewsGroup(this.gameGraphs[this.currentEnvironment].views);
        if (!this.sceneInited)
            this.interface.addGameGroup(this.gameEnvironments);

        this.sceneInited = true;
    }

    /**
     * Displays the scene.
     */
    display() {
        if (!this.throwAnimationOccurring) {
            this.logPicking();
        }
        this.clearPickRegistration();
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.setActiveShader(this.defaultShader);
        this.pushMatrix();

        if (this.sceneInited) {
            // Draw axis
            if (this.displayAxis)
                this.axis.display();
            this.updateLightsDisplay();
            this.setCameraUsed();
            // Displays the scene (MySceneGraph function).

            this.gameGraphs[this.currentEnvironment].displayScene();
            if (typeof this.board !== 'undefined') { //Wait for prolog board
                this.displayDirectionClickables();
                this.displayBoardPieces();
                this.displayThrowAnimation();
            }

            if (this.gameState == "menu")
                this.displayMenu();


            this.pushMatrix();
            this.boardAppearance.apply();
            this.teleporter.display();
            this.popMatrix();


        } else {
            // Draw axis
            if (this.displayAxis)
                this.axis.display();
        }

        this.popMatrix();
        if (this.isMovingCamera)
            this.updateCameraRotation();
        this.setActiveShader(this.defaultShader);
        // draw objects
        // ---- END Background, camera and axis setup
    }

    updateCameraRotation() {
        //         this.cameraPositionIndex = 0;
        switch (this.cameraPositionIndex) {
            case 0: //top
                {
                    this.camera.orbit(CGFcameraAxisID.X, -50 * DEGREE_TO_RAD * (this.cameraTimerDelta / MOVE_CAMERA_TIME));
                    break;
                }
            case 1: //left
            default:
                {
                    this.camera.orbit(CGFcameraAxisID.X, 50 * DEGREE_TO_RAD * (this.cameraTimerDelta / MOVE_CAMERA_TIME));
                    break;
                }
        }

    }

    displayMenu() {
        this.pushMatrix();
        this.menu1app.apply();
        this.translate(10 * CELL_WIDTH, 36, 9 * CELL_WIDTH);
        this.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
        this.scale(2, 1, 4);
        this.registerForPick(BOARD_SIZE * 4 + 1, this.menu1);
        this.menu1.display();
        this.popMatrix();

        this.pushMatrix();
        this.menu2app.apply();
        this.translate(10 * CELL_WIDTH, 36, 10 * CELL_WIDTH);
        this.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
        this.scale(2, 1, 4);
        this.registerForPick(BOARD_SIZE * 4 + 2, this.menu2);
        this.menu2.display();
        this.popMatrix();

        this.pushMatrix();
        this.menu3app.apply();
        this.translate(10 * CELL_WIDTH, 36, 11 * CELL_WIDTH);
        this.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
        this.scale(2, 1, 4);
        this.registerForPick(BOARD_SIZE * 4 + 3, this.menu3);
        this.menu3.display();
        this.popMatrix();
    }

    displayThrowAnimation() {
        if (this.throwAnimationOccurring && typeof this.animationPiece.matrix != 'undefined') {

            this.pushMatrix();
            this.multMatrix(this.animationPiece.matrix);
            if (this.animationColor == "white")
                this.whitePiece.display();
            else
                this.blackPiece.display();
            this.popMatrix();
        }
        if (this.animationJustFinished && ((this.vsBot && this.botColor != this.animationColor) || this.vsBot == 2) && this.gameWinner == "no") {
            this.animationJustFinished = false;
            this.makeRequest("botMove(" + this.botDiff + ")");
        } else if (this.animationJustFinished) {
            this.board = this.nextBoard;
        }
    }

    displayBoardPieces() {
        let piece;
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                // console.log(this.board);
                piece = this.board[j][i];
                if (piece != "e") {
                    this.pushMatrix();
                    this.translate(i * 2 + 2, 0, j * 2 + 2);
                    if (piece == "O")
                        this.whitePiece.display();
                    else if (piece == "X")
                        this.blackPiece.display();
                    this.popMatrix();
                }
            }
        }
        this.pushMatrix();
        this.translate(0.5, -0.1, 39.5);
        this.rotate(-90 * DEGREE_TO_RAD, 1, 0, 0);
        this.scale(39, 39, 1);
        this.boardAppearance.apply();
        this.boardQuad.display();
        this.popMatrix();
    }

    displayDirectionClickables() {
        for (let i = 0; i < 19; i++) {
            this.pushMatrix();
            this.translate(i * 2 + 2, 0, 0);
            this.registerForPick(i + 1, this.objects[i]);
            this.objects[i].display();
            this.popMatrix();
        }
        // ---- END Background, camera and axis setup
        let j = 0;
        for (let i = 19; i < 38; i++) {
            this.pushMatrix();
            this.translate(0, 0, j * 2 + 2);
            this.registerForPick(i + 1, this.objects[i]);
            this.objects[i].display();
            this.popMatrix();
            j++;
        }
        j = 0;
        for (let i = 38; i < 57; i++) {
            this.pushMatrix();
            this.translate(j * 2 + 2, 0, 40);
            this.registerForPick(i + 1, this.objects[i]);
            this.objects[i].display();
            this.popMatrix();
            j++;
        }
        j = 0;
        for (let i = 57; i < 76; i++) {
            this.pushMatrix();
            this.translate(40, 0, j * 2 + 2);
            this.registerForPick(i + 1, this.objects[i]);
            this.objects[i].display();
            this.popMatrix();
            j++;
        }
    }

    updateLightsDisplay() {
        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(false); //Invisible light
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
            this.camera = this.gameGraphs[this.currentEnvironment].views[this.changeCamera];
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
        if (this.animationBegin == undefined) {
            this.animationBegin = currTime;
        }
        for (var node in this.gameGraphs[this.currentEnvironment].components) {
            this.gameGraphs[this.currentEnvironment].components[node].updateAnimation(currTime - this.lastTime);
        }
        if (this.animationBegin + THROW_ANIMATION_TIME > currTime && typeof this.animationPiece != 'undefined') {
            this.setPickEnabled(false);
            this.animationPiece.matrix = this.animationPiece.getTransformationMatrix((currTime - this.animationBegin) / 1000);
            this.animationJustFinished = false;
        } else {
            if (this.throwAnimationOccurring) {
                this.animationJustFinished = true;
                this.throwAnimationOccurring = false;
                this.board = this.nextBoard;
            }
            if (this.gameWinner != "no") {
                this.gameState = "menu";
                console.log(this.gameWinner + ' is the Winner');
            }
            this.setPickEnabled(true);
        }

        if (this.moveCameraTimer < MOVE_CAMERA_TIME) {
            this.cameraTimerDelta = currTime - this.lastTime;
            this.moveCameraTimer += currTime - this.lastTime;
            this.cameraJustFinished = true;
        } else if (this.cameraJustFinished) {
            this.isMovingCamera = false;
            this.cameraPositionIndex++;
            if(this.cameraPositionIndex == 2)

                this.cameraPositionIndex = 0;

            this.cameraJustFinished = false;
            this.cameraTimerDelta = 0;
        }




        this.lastTime = currTime;
        //shaders here
        let factor = (Math.sin((currTime * 0.05) % 3130 * 0.001) + 1.0) * 0.5;
        let factor2 = (Math.sin((currTime * 0.1) % 3130 * 0.001) + 1.0) * 0.5;
        this.testShaders[0].setUniformsValues({
            time: factor
        });
        this.testShaders[2].setUniformsValues({
            time: factor2
        });
    }
    updateAnimation(deltaT) {
        this.time += deltaT / 1000;
        if (this.currentAnimationIndex < this.animations.length) {
            if (this.time >= this.gameGraphs[this.currentEnvironment].scene.animations[this.currentAnimation].duration) {
                this.time = 0;
                this.currentAnimationIndex++;
                this.currentAnimation = this.animations[this.currentAnimationIndex];
                if (this.currentAnimationIndex >= this.animations.length) {
                    this.currentAnimationIndex = 0;
                    this.currentAnimation = this.animations[this.currentAnimationIndex];
                }
            }
            this.animationMatrix = this.gameGraphs[this.currentEnvironment].scene.animations[this.currentAnimation].getTransformationMatrix(this.time);
        }
    }


    logPicking() {
        if (this.pickMode == false) {
            if (this.pickResults != null && this.pickResults.length > 0) {
                for (var i = 0; i < this.pickResults.length; i++) {
                    var obj = this.pickResults[i][0];
                    if (obj) {
                        var customId = this.pickResults[i][1];
                        console.log("Picked object with pick id " + customId);
                        if (customId < BOARD_SIZE * 4 + 1 && (this.gameState != "pp" || this.gameState != "pc" || this.gameState != "cc"))
                            this.getDirectionandLine(customId);
                        else if (this.gameState == "menu")
                            this.menuInitGame(customId - BOARD_SIZE * 4);
                    }
                }
                this.pickResults.splice(0, this.pickResults.length);
            }
        }
    }

    menuInitGame(option) {
        switch (option) {
            case 1:
                {
                    console.log('Starting PvP');
                    this.gameState = "pp";
                    this.vsBot = false;
                    this.gameWinner = "no";
                    break;
                }
            case 2:
                {
                    console.log('Starting PvC');
                    this.gameState = "pc";
                    this.vsBot = true;
                    this.gameWinner = "no";
                    break;
                }
            case 3:
            default:
                {
                    console.log('Starting CvC');
                    this.gameState = "cc";
                    this.vsBot = 2;
                    this.gameWinner = "no";
                }
        }
    }

    getDirectionandLine(ID) {
        let n = Math.floor((ID - 1) / 19);
        this.line = (ID - 1) % 19 + 1;
        

        switch (n) {
            case 0:
                {
                    this.direction = "down";
                    break;
                }
            case 1:
                {
                    this.direction = "right";
                    break;
                }
            case 2:
                {
                    this.direction = "up";
                    break;
                }
            default:
                {
                    this.direction = "left";
                }
        }
        if (this.validMove(this.direction, this.line)){
            this.moveRequest(this.direction, this.line);
            this.directions[]
          }
    };

    validMove(direction, line) {
        switch (direction) {
            case "down":
            case "up":
                {
                    for (let i = 0; i < BOARD_SIZE; i++)
                        if (this.board[i][line - 1] != "e")
                            return true;
                    break;
                }
            default:
                for (let i = 0; i < BOARD_SIZE; i++)
                    if (this.board[line - 1][i] != "e")
                        return true;
        }
        console.log("Invalid move");
        return false;
    }

    undoMove() {
        this.undoRequest();
    }

    getPrologRequest(requestString, onSuccess, onError, port) {
        let requestPort = port || 8081;
        let request = new XMLHttpRequest();
        request.scene = this;
        request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

        request.onload = onSuccess || function (data) {
            console.log("Request successful. Reply: " + data.target.response);
        };
        request.onerror = onError || function () {
            console.log("Error waiting for response");
        };

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    };

    makeRequest(requestString) {
        this.getPrologRequest(requestString, this.handleReply);
    };

    handleReply(data) {
        console.log("Reply");
        let regex = new RegExp("^([^-]+)-(white|black)-(down|right|left|up)-([0-9]+)-(white|black|no)$"); //Board - NextTurnPlayer - gameEnded
        let matched = regex.exec(data.target.responseText);
        this.validMove = true;

        let board = new Array();
        regex = /\[(?:\[)?([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^\]]*)\](?:\])?(?:,|\])/y;
        for (let i = 0; i < BOARD_SIZE; i++) {
            board[i] = new Array();
            let matchedsequel = regex.exec(matched[1]);
            for (let j = 1; j < matchedsequel.length; j++) {
                board[i].push(matchedsequel[j]);
            }
        }
        this.scene.animationColor = matched[2];

        this.scene.direction = matched[3];
        this.scene.line = matched[4];
        console.log(matched[5]);
        this.scene.gameWinner = matched[5];

        this.scene.nextBoard = board;

        this.scene.firstAppearance();
        this.scene.initThrowAnimation();

        console.log(board);
    };

    moveRequest(direction, line) {
        console.log("Direction: " + direction + "Line: " + line);
        this.previousBoard = this.board;
        this.makeRequest("move(" + direction + "," + line + ")");
    };

    resetRequest() {
        console.log("Reset Board");
        this.makeRequest("reset");
    }
    undoRequest() {
        console.log("Undo Play");
        this.makeRequest("undo");
    }

    firstAppearance() { // Detect where to stop animation Piece
        this.animationBegin = this.lastTime;
        let n;
        console.log(this.nextBoard);
        switch (this.direction) {
            case "down":
                {
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        if (this.nextBoard[i][this.line - 1] != "e") {
                            n = i + 1;
                            break;
                        }
                    }
                    break;
                }
            case "up":
                {
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        if (this.nextBoard[BOARD_SIZE - i - 1][this.line - 1] != "e") {
                            n = i + 1;
                            break;
                        }
                    }
                    break;
                }
            case "right":
                {
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        if (this.nextBoard[this.line - 1][i] != "e") {
                            n = i + 1;
                            break;
                        }
                    }
                    break;
                }
            case "left":
            default:
                {
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        if (this.nextBoard[this.line - 1][BOARD_SIZE - i - 1] != "e") {
                            n = i + 1;
                            break;
                        }
                    }
                    break;
                }
        }
        this.animationDirection = this.direction;
        this.animationLine = this.line;
        this.animationStop = n;
    }

    initThrowAnimation() {
        switch (this.animationDirection) {
            case "down":
                {
                    let start = this.animationLine * CELL_WIDTH;
                    let stop = this.animationStop * CELL_WIDTH;
                    this.animationPiece = new LinearAnimation(this, 1, THROW_ANIMATION_TIME / 1000, [
                        [start, 0, 0],
                        [start, 0, stop]
                    ]);
                    break;
                }
            case "up":
                {
                    let start = this.animationLine * CELL_WIDTH;
                    let stop = this.animationStop * CELL_WIDTH;
                    let border = 20 * CELL_WIDTH;
                    this.animationPiece = new LinearAnimation(this, 1, THROW_ANIMATION_TIME / 1000, [
                        [start, 0, border],
                        [start, 0, border - stop]
                    ]);
                    break;
                }
            case "right":
                {
                    let start = this.animationLine * CELL_WIDTH;
                    let stop = this.animationStop * CELL_WIDTH;
                    this.animationPiece = new LinearAnimation(this, 1, THROW_ANIMATION_TIME / 1000, [
                        [0, 0, start],
                        [stop, 0, start]
                    ]);
                    break;
                }
            case "left":
            default:
                {
                    let start = this.animationLine * CELL_WIDTH;
                    let stop = this.animationStop * CELL_WIDTH;
                    let border = 20 * CELL_WIDTH;
                    this.animationPiece = new LinearAnimation(this, 1, THROW_ANIMATION_TIME / 1000, [
                        [border, 0, start],
                        [border - stop, 0, start]
                    ]);
                    break;
                }
        }
        this.throwAnimationOccurring = true;
        this.animationBegin = this.lastTime;
        console.log(this.animationPiece);
    }
};
