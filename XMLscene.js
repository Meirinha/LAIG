var DEGREE_TO_RAD = Math.PI / 180;

let CELL_WIDTH = 2.0;
let BOARD_SIZE = 19;


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
        this.resetRequest();
        this.direction;
        this.line;

        this.previousBoard = [];
        this.moveSequences = [];

        this.vsBot = true; //TODO
        this.botDiff = 2;

        this.whitePiece = new CyberPiece(this, this.robotWhite, this.ballWhite);
        this.blackPiece = new CyberPiece(this, this.robotBlack, this.ballBlack);

        this.teleporter = new Teleporter(this);

        this.menu1 = new MyPlane(this, 1, 1);
        this.menu2 = new MyPlane(this, 1, 1);
        this.menu3 = new MyPlane(this, 1, 1);

        this.boardQuad = new MyRectangle(this, 1, [0, 0, 1, 1]);
    }

    initAppearances() {

        this.appearance = new CGFappearance(this);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.menu1app = new CGFappearance(this);

        this.menu1app.setAmbient(0.3, 0.3, 0.3, 1);
        this.menu1app.setDiffuse(0.7, 0.7, 0.7, 1);
        this.menu1app.setSpecular(0.0, 0.0, 0.0, 1);
        this.menu1app.setShininess(120);
        this.menu1app.loadTexture('../scenes/images/pp.png');

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
        this.logPicking();
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

            this.graph.displayScene();
            if (typeof this.board !== 'undefined') { //Wait for prolog board
                this.displayDirectionClickables();
                this.displayBoardPieces();

                // this.pushMatrix();
                // this.menu1app.apply();
                // this.translate(1,1,0);
                // this.menu1.display();
                // this.popMatrix();
            }
            this.pushMatrix();
            this.translate(0.5, -0.1, 39.5);
            this.rotate(-90 * DEGREE_TO_RAD, 1, 0, 0);
            this.scale(39, 39, 1);
            this.boardAppearance.apply();
            this.boardQuad.display();
            this.popMatrix();

            this.pushMatrix();
            this.boardAppearance.apply();
            // this.teleporter.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(20, 0, 40);
            this.whitePiece.display();

            this.popMatrix();

        } else {
            // Draw axis
            if (this.displayAxis)
                this.axis.display();
        }

        this.popMatrix();
        this.setActiveShader(this.defaultShader);
        // draw objects
        // ---- END Background, camera and axis setup
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
        for (var node in this.graph.components) {
            this.graph.components[node].updateAnimation(currTime - this.lastTime);
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
    logPicking() {
        if (this.pickMode == false) {
            if (this.pickResults != null && this.pickResults.length > 0) {
                for (var i = 0; i < this.pickResults.length; i++) {
                    var obj = this.pickResults[i][0];
                    if (obj) {
                        var customId = this.pickResults[i][1];
                        console.log("Picked object: " + obj + ", with pick id " + customId);

                        this.getDirectionandLine(customId);
                    }
                }
                this.pickResults.splice(0, this.pickResults.length);
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
        if (this.validMove(this.direction, this.line))
            this.moveRequest(this.direction, this.line);
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
        console.log("NOT Valid");
        return false;
    }

    undoMove() {
        this.board = this.previousBoard;
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
        let regex = new RegExp("^([^-]+)(?:-([^-]+)-(.+))?$"); //Board - NextTurnPlayer - gameEnded
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
        this.scene.nextBoard = board;

        this.scene.firstAppearance();
        this.scene.board = board;

        console.log(board);

        if (matched[2] != undefined && matched[3] != undefined) {
            this.player = matched[2];
            this.gameEnded = matched[3];

            //Good response, Animate
            let animation = this.nextPieceAnimInfo.animation;
            animation.setStartTime((new Date().getTime() - this.initialTime) / 1000);
            this.animations[this.nextPieceAnimInfo.pickID] = animation;
            this.animations.length++;
        } else
            this.currentBoard = this.boardAfterAnimation;
        console.log("Hello There");
    };

    moveRequest(direction, line) {
        console.log("Direction: " + direction + "Line: " + line);
        this.previousBoard = this.board;
        this.makeRequest("move(" + direction + "," + line + ")");
        if (this.vsBot) {
            this.makeRequest("botMove(" + this.botDiff + ")");
        }
    };

    resetRequest() {
        console.log("Reset Board");
        this.makeRequest("reset");
    }

    firstAppearance() { // Detect where to stop animation Piece 
        let n;
        switch (this.direction) {
            case "down":
                {
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        if (this.nextBoard[i][this.line - 1] != "e") {
                            n = i;
                            break;
                        }
                    }
                    break;
                }
            case "up":
                {
                    for (let i = BOARD_SIZE - 1; i <= 0; i--) {
                        if (this.nextBoard[i][this.line - 1] != "e") {
                            n = i;
                            break;
                        }
                    }
                    break;
                }

            case "right":
                {
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        if (this.nextBoard[this.line - 1][i] != "e") {
                            n = i;
                            break;
                        }
                    }
                    break;
                }
            case "left":
            default:
                {
                    for (let i = BOARD_SIZE - 1; i <= 0; i--) {
                        if (this.nextBoard[this.line - 1][i] != "e") {
                            n = i;
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

    pieceSidePlacement(piece) {
        switch (this.animationDirection) {
            case "down":
                {
                    this.pushMatrix();
                    this.translate(this.animationLine * CELL_WIDTH, 0, 0);
                    piece.display();
                    this.popMatrix();
                    break;
                }
            case "up":
                {
                    this.pushMatrix();
                    this.translate(this.animationLine * CELL_WIDTH, 0, 20 * CELL_WIDTH);
                    piece.display();
                    this.popMatrix();
                    break;
                }
            case "right":
                {
                    this.pushMatrix();
                    this.translate(0, 0, this.animationLine * CELL_WIDTH);
                    piece.display();
                    this.popMatrix();
                    break;
                }
            case "left":
            default:
                {
                    this.pushMatrix();
                    this.translate(20 * CELL_WIDTH, 0, this.animationLine * CELL_WIDTH);
                    piece.display();
                    this.popMatrix();
                    break;
                }
        }
    }
};