var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var AMBIENT_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var ANIMATIONS_INDEX = 7;
var PRIMITIVES_INDEX = 8;
var COMPONENTS_INDEX = 9;

//Default Values
var DEFAULT_SCENE_ROOT = "rootScene";
var DEFAULT_SCENE_AXIS_LENGTH = 5.0;

var DEFAULT_VIEWS_DEFAULT = "defaultViews";
var DEFAULT_PERSPECTIVE_NEAR = 0.1;
var DEFAULT_PERSPECTIVE_FAR = 900;
var DEFAULT_PERSPECTIVE_ANGLE = 0.0;
var DEFAULT_VIEW_FROM = 1.0;
var DEFAULT_VIEW_TO = 40.0;
var DEFAULT_ORTHO_SIDE = 2;

var DEFAULT_AMBIENT_RGB = 1.0;
var DEFAULT_AMBIENT_ALPHA = 1.0;
var DEFAULT_BACKGROUND_RGB = 0.0;
var DEFAULT_BACKGROUND_ALPHA = 1.0;

var DEFAULT_LIGHTS_LOCATION = 1.0;
var DEFAULT_LIGHT_VALUE = 1.0;
var DEFAULT_SPOT_TARGET = 5.0;

var DEFAULT_TRANSLATION_VALUE = 0.0;
var DEFAULT_SCALE_VALUE = 1.0;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.components = [];

        this.idRoot = null;
        // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */

        this.reader.open('scenes/' + filename, this);

        this.scene.defaultAppearance = new CGFappearance(this.scene);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "yas")
            return "root tag <yas> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <SCENE>
        var index;
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <scene> missing";
        else {
            if (index != SCENE_INDEX)
                this.onXMLMinorError("tag <scene> out of order");

            //Parse SCENE block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <VIEWS>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse VIEWS\ block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }

        // <AMBIENT>
        if ((index = nodeNames.indexOf("ambient")) == -1)
            return "tag <ambient> missing";
        else {
            if (index != AMBIENT_INDEX)
                this.onXMLMinorError("tag <ambient> out of order");

            //Parse AMBIENT block
            if ((error = this.parseAmbient(nodes[index])) != null)
                return error;
        }

        // <LIGHTS>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse LIGHTS block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }

        // <TEXTURES>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse TEXTURES block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <MATERIALS>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse MATERIALS block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <TRANSFORMATIONS>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <transformations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <transformations> out of order");

            //Parse TRANSFORMATIONS block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }
        // <ANIMATIONS>
        if ((index = nodeNames.indexOf("animations")) == -1)
            return "tag <animations> missing";
        else {
            if (index != ANIMATIONS_INDEX)
                this.onXMLMinorError("tag <animations> out of order");

            //Parse ANIMATIONS block
            if ((error = this.parseAnimations(nodes[index])) != null)
                return error;
        }

        // <PRIMITIVES>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <primitives> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <primitives> out of order");

            //Parse PRIMITIVES block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <COMPONENTS>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <components> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <components> out of order");

            //Parse COMPONENTS block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;
        }
    }

    parseScene(sceneNodes) {
        //Root
        if (sceneNodes.getAttribute("root") == null) {
            this.onXMLMinorError("Root does not have a name, using default name " + DEFAULT_SCENE_ROOT + ".");
            sceneNodes.setAttribute("root", DEFAULT_SCENE_ROOT);
        }
        this.rootID = sceneNodes.getAttribute("root");

        //Axis Length
        var sceneAxisLength = parseFloat(sceneNodes.getAttribute("axis_length"));

        if (!this.isValidNumber(sceneAxisLength) || sceneAxisLength < 0) {
            this.onXMLMinorError("Scene does not have a valid axis_length, using default value " + DEFAULT_SCENE_AXIS_LENGTH + ".");
            sceneNodes.setAttribute("axis_length", DEFAULT_SCENE_AXIS_LENGTH);
        }
        this.referenceLength = parseFloat(sceneNodes.getAttribute("axis_length"));
        console.log("Scene: Root= " + sceneNodes.getAttribute("root") + " Axis_Length= " + sceneNodes.getAttribute("axis_length"));

        return;
    }

    parseViews(viewsNodes) {
        this.views = [];
        //Default
        if (viewsNodes.getAttribute("default") == null) {
            this.onXMLMinorError("Views does not have a default attribute, using value " + DEFAULT_VIEWS_DEFAULT + ".");
            viewsNodes.setAttribute("default", DEFAULT_VIEWS_DEFAULT);
        }
        console.log("Views: default= " + viewsNodes.getAttribute("default"));
        this.defaultView = viewsNodes.getAttribute("default");
        //Views children

        var children = viewsNodes.children;

        //At least one view
        var i = 0;
        var idsUsed = [];
        do {
            var currChild = children[i];

            //Check id
            try {
                if (currChild.getAttribute("id") == null) {
                    var newid = "view" + i;
                    this.onXMLMinorError("Views child number " + i + " does not have an id, using value id=" + newid + ".");
                    currChild.setAttribute("id", newid);
                }
            } catch (err) {
                throw "At least one View (perspective or ortho) must exist."
            }

            if (idsUsed.indexOf(currChild.getAttribute("id")) > -1)
                throw "Repeated id in Views, id= " + currChild.getAttribute("id");

            idsUsed.push(currChild.getAttribute("id"));
            var near = parseFloat(currChild.getAttribute("near"));
            var far = parseFloat(currChild.getAttribute("far"));

            //Near
            if (!this.isValidNumber(near) || near < 0) {
                this.onXMLMinorError(currChild.getAttribute("id") + " does not have a near attribute, using default value near= " + DEFAULT_PERSPECTIVE_NEAR);
                currChild.setAttribute("near", DEFAULT_PERSPECTIVE_NEAR);
            }

            //Far
            if (!this.isValidNumber(far) || far < 0) {
                this.onXMLMinorError(currChild.getAttribute("id") + " does not have a far attribute, using default value far= " + DEFAULT_PERSPECTIVE_FAR);
                currChild.setAttribute("far", DEFAULT_PERSPECTIVE_FAR);
            }


            near = parseFloat(currChild.getAttribute("near"));
            far = parseFloat(currChild.getAttribute("far"));

            //Type Specific Attributes
            if (currChild.nodeName == "perspective") {
                var angle = parseFloat(currChild.getAttribute("angle"));
                if (!this.isValidNumber(angle)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " does not have an angle attribute, using default value angle= " + DEFAULT_PERSPECTIVE_ANGLE);
                    currChild.setAttribute("angle", DEFAULT_PERSPECTIVE_ANGLE);
                }

                //From Attribute
                var currGrandchild = currChild.children[0];

                var x = parseFloat(currGrandchild.getAttribute("x"));
                var y = parseFloat(currGrandchild.getAttribute("y"));
                var z = parseFloat(currGrandchild.getAttribute("z"));
                if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'from' xyz values, using default value x = y = z = " + DEFAULT_VIEW_FROM);
                    currGrandchild.setAttribute("x", DEFAULT_VIEW_FROM);
                    currGrandchild.setAttribute("y", DEFAULT_VIEW_FROM);
                    currGrandchild.setAttribute("z", DEFAULT_VIEW_FROM);
                }

                var fromX = parseFloat(currGrandchild.getAttribute("x"));
                var fromY = parseFloat(currGrandchild.getAttribute("y"));
                var fromZ = parseFloat(currGrandchild.getAttribute("z"));

                var fromVector = vec3.fromValues(fromX, fromY, fromZ);

                //To Attribute
                var currGrandchild = currChild.children[1];

                x = parseFloat(currGrandchild.getAttribute("x"));
                y = parseFloat(currGrandchild.getAttribute("y"));
                z = parseFloat(currGrandchild.getAttribute("z"));
                if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'to' xyz values, using default value x = y = z = " + DEFAULT_VIEW_TO);
                    currGrandchild.setAttribute("x", DEFAULT_VIEW_TO);
                    currGrandchild.setAttribute("y", DEFAULT_VIEW_TO);
                    currGrandchild.setAttribute("z", DEFAULT_VIEW_TO);
                }

                var toX = parseFloat(currGrandchild.getAttribute("x"));
                var toY = parseFloat(currGrandchild.getAttribute("y"));
                var toZ = parseFloat(currGrandchild.getAttribute("z"));

                var toVector = vec3.fromValues(toX, toY, toZ);
                this.views[currChild.getAttribute("id")] = new CGFcamera(parseFloat(currChild.getAttribute("angle") * DEGREE_TO_RAD), parseFloat(currChild.getAttribute("near")), parseFloat(currChild.getAttribute("far")), fromVector, toVector);

            } else if (currChild.nodeName == "ortho") {
                let left = parseFloat(currChild.getAttribute("left"));
                let right = parseFloat(currChild.getAttribute("right"));
                if (!this.isValidNumber(left) || !this.isValidNumber(right) || right < left) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has the attribute left and/or right invalid, using value right = -left = " + DEFAULT_ORTHO_SIDE);
                    currChild.setAttribute("left", DEFAULT_ORTHO_SIDE * -1);
                    currChild.setAttribute("right", DEFAULT_ORTHO_SIDE);
                }
                let top = parseFloat(currChild.getAttribute("top"));
                let bottom = parseFloat(currChild.getAttribute("bottom"));
                if (!this.isValidNumber(bottom) || !this.isValidNumber(top) || top < bottom) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has the attribute left and/or right invalid, using value top = -bottom = " + DEFAULT_ORTHO_SIDE);
                    currChild.setAttribute("bottom", DEFAULT_ORTHO_SIDE * -1);
                    currChild.setAttribute("top", DEFAULT_ORTHO_SIDE);
                }

                //From Attribute
                var currGrandchild = currChild.children[0];

                var x = parseFloat(currGrandchild.getAttribute("x"));
                var y = parseFloat(currGrandchild.getAttribute("y"));
                var z = parseFloat(currGrandchild.getAttribute("z"));
                if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'from' xyz values, using default value x = y = z = " + DEFAULT_VIEW_FROM);
                    currGrandchild.setAttribute("x", DEFAULT_VIEW_FROM);
                    currGrandchild.setAttribute("y", DEFAULT_VIEW_FROM);
                    currGrandchild.setAttribute("z", DEFAULT_VIEW_FROM);
                }

                var fromX = parseFloat(currGrandchild.getAttribute("x"));
                var fromY = parseFloat(currGrandchild.getAttribute("y"));
                var fromZ = parseFloat(currGrandchild.getAttribute("z"));

                var fromVector = vec3.fromValues(fromX, fromY, fromZ);

                //To Attribute
                var currGrandchild = currChild.children[1];

                x = parseFloat(currGrandchild.getAttribute("x"));
                y = parseFloat(currGrandchild.getAttribute("y"));
                z = parseFloat(currGrandchild.getAttribute("z"));
                if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'to' xyz values, using default value x = y = z = " + DEFAULT_VIEW_TO);
                    currGrandchild.setAttribute("x", DEFAULT_VIEW_TO);
                    currGrandchild.setAttribute("y", DEFAULT_VIEW_TO);
                    currGrandchild.setAttribute("z", DEFAULT_VIEW_TO);
                }

                var toX = parseFloat(currGrandchild.getAttribute("x"));
                var toY = parseFloat(currGrandchild.getAttribute("y"));
                var toZ = parseFloat(currGrandchild.getAttribute("z"));

                var toVector = vec3.fromValues(toX, toY, toZ);

                left = parseFloat(currChild.getAttribute("left"));
                right = parseFloat(currChild.getAttribute("right"));

                top = parseFloat(currChild.getAttribute("top"));
                bottom = parseFloat(currChild.getAttribute("bottom"));

                this.views[currChild.getAttribute("id")] = new CGFcameraOrtho(left, right, bottom, top, near, far, fromVector, toVector, vec3.fromValues(0, 1, 0));
            } else {
                this.onXMLMinorError("unknown tag <" + currChild.nodeName + ">");
                continue;
            }
            console.log(currChild.getAttribute("id") + " parsed");
            i++;
        } while (i < children.length);
        return null;
    }

    //Ambient
    parseAmbient(ambientNodes) {
        var children = ambientNodes.children;
        var currChild = children[0];
        if (currChild.nodeName == "ambient") {
            this.ambient = [];
            var colorsArray = ["r", "g", "b"];
            for (let i = 0; i < 3; i++) {
                let color = colorsArray[i];
                let colorValue = parseFloat(currChild.getAttribute(color));
                if (!this.isValidNumber(colorValue) || colorValue < 0 || colorValue > 1) {
                    this.onXMLMinorError("The value " + color + " of the child ambient of Ambient is not valid, using default value " + DEFAULT_AMBIENT_RGB);
                    currChild.setAttribute(color, DEFAULT_AMBIENT_RGB);
                }
                this.ambient[color] = parseFloat(currChild.getAttribute(color));
            }
            var alpha = parseFloat(currChild.getAttribute("a"));
            if (!this.isValidNumber(alpha) || alpha < 0 || alpha > 1) {
                this.onXMLMinorError("The value alpha of the child ambient of Ambient is not valid, using default value " + DEFAULT_AMBIENT_ALPHA);
                currChild.setAttribute("a", DEFAULT_AMBIENT_ALPHA);
            }
            this.ambient["a"] = parseFloat(currChild.getAttribute("a"));
        } else {
            this.onXMLError("Ambient must have ambient and background children, in this order");
        }
        currChild = children[1];
        if (currChild.nodeName == "background") {
            this.background = [];
            var colorsArray = ["r", "g", "b"];
            for (let i = 0; i < 3; i++) {
                let color = colorsArray[i];
                let colorValue = parseFloat(currChild.getAttribute(color));
                if (!this.isValidNumber(colorValue) || colorValue < 0 || colorValue > 1) {
                    this.onXMLMinorError("The value " + color + "of the child ambient of Ambient is not valid, using default value " + DEFAULT_BACKGROUND_RGB);
                    currChild.setAttribute(color, DEFAULT_BACKGROUND_RGB);
                }
                this.background[color] = parseFloat(currChild.getAttribute(color));
            }
            var alpha = parseFloat(currChild.getAttribute("a"));
            if (!this.isValidNumber(alpha) || alpha < 0 || alpha > 1) {
                this.onXMLMinorError("The value alpha of the child ambient of Ambient is not valid, using default value " + DEFAULT_BACKGROUND_ALPHA);
                currChild.setAttribute("a", DEFAULT_BACKGROUND_ALPHA);
            }
            this.background["a"] = parseFloat(currChild.getAttribute("a"));
        } else
            this.onXMLError("Ambient must have ambient and background children, in this order");
    }

    parseLights(ligthsNodes) {
        let children = ligthsNodes.children;
        this.lights = [];

        //At least one light
        var i = 0;
        do {
            var currChild = children[i];

            //Check id
            try {
                if (currChild.getAttribute("id") == null) {
                    var newid = "light" + i;
                    this.onXMLMinorError("Lights child number " + i + " does not have an id, using value id=" + newid + ".");
                    currChild.setAttribute("id", newid);
                }
            } catch (err) {
                this.onXMLError("At least one Light (omni or spot) must exist.");
            }

            //No repeated id
            if (this.lights[currChild.getAttribute("id")] != null)
                throw "Repeated id in Lights, id= " + currChild.getAttribute("id");


            //Enabled TODO confirmar se tt e true ou 1
            let ena = currChild.getAttribute("enabled");
            if (ena != "0" && ena != "1") {
                this.onXMLMinorError("Lights child id= " + currChild.getAttribute("id") + " has not a valid 'enabled' value, using 0.");
                currChild.setAttribute("enabled", 1);
            }
            var angle = 0.0;
            var exponent = 0.0;
            let target = [];
            var lightEnabled = this.reader.getBoolean(currChild, "enabled");
            for (let j = 0; j < currChild.children.length; j++) {
                let currGrandchild = currChild.children[j];

                if (currGrandchild.nodeName == "location") {
                    let x = parseFloat(currGrandchild.getAttribute("x"));
                    let y = parseFloat(currGrandchild.getAttribute("y"));
                    let z = parseFloat(currGrandchild.getAttribute("z"));
                    let w = parseFloat(currGrandchild.getAttribute("w"));
                    if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z) || !this.isValidNumber(w)) {
                        this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'location' xyzw values, using default value x = y = z = w = " + DEFAULT_LIGHTS_LOCATION);
                        currGrandchild.setAttribute("x", DEFAULT_LIGHTS_LOCATION);
                        currGrandchild.setAttribute("y", DEFAULT_LIGHTS_LOCATION);
                        currGrandchild.setAttribute("z", DEFAULT_LIGHTS_LOCATION);
                        currGrandchild.setAttribute("w", DEFAULT_LIGHTS_LOCATION);
                    }
                    var positionArray = [];
                    positionArray.push(parseFloat(currGrandchild.getAttribute("x")), parseFloat(currGrandchild.getAttribute("y")), parseFloat(currGrandchild.getAttribute("z")), parseFloat(currGrandchild.getAttribute("w")));

                } else if (currGrandchild.nodeName == "ambient") {
                    this.checkLightRGB(currGrandchild);

                    var ambientArray = [];
                    ambientArray.push(parseFloat(currGrandchild.getAttribute("r")), parseFloat(currGrandchild.getAttribute("g")), parseFloat(currGrandchild.getAttribute("b")), parseFloat(currGrandchild.getAttribute("a")));

                } else if (currGrandchild.nodeName == "diffuse") {
                    this.checkLightRGB(currGrandchild);

                    var diffuseArray = [];
                    diffuseArray.push(parseFloat(currGrandchild.getAttribute("r")), parseFloat(currGrandchild.getAttribute("g")), parseFloat(currGrandchild.getAttribute("b")), parseFloat(currGrandchild.getAttribute("a")));

                } else if (currGrandchild.nodeName == "specular") {
                    this.checkLightRGB(currGrandchild);

                    var specularArray = [];
                    specularArray.push(parseFloat(currGrandchild.getAttribute("r")), parseFloat(currGrandchild.getAttribute("g")), parseFloat(currGrandchild.getAttribute("b")), parseFloat(currGrandchild.getAttribute("a")));

                } else if (currChild.nodeName == "spot" && currGrandchild.nodeName == "target") {
                    let x = parseFloat(currGrandchild.getAttribute("x"));
                    let y = parseFloat(currGrandchild.getAttribute("y"));
                    let z = parseFloat(currGrandchild.getAttribute("z"));

                    if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                        this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName + "' xyz values, using default value x = y = z = " + DEFAULT_SPOT_TARGET);
                        currGrandchild.setAttribute("x", DEFAULT_SPOT_TARGET);
                        currGrandchild.setAttribute("y", DEFAULT_SPOT_TARGET);
                        currGrandchild.setAttribute("z", DEFAULT_SPOT_TARGET);
                    }
                    x = parseFloat(currGrandchild.getAttribute("x"));
                    y = parseFloat(currGrandchild.getAttribute("y"));
                    z = parseFloat(currGrandchild.getAttribute("z"));
                    target = [x, y, z];

                }
            }
            if (currChild.nodeName == "spot") {
                angle = parseFloat(currChild.getAttribute("angle"));
                if (!this.isValidNumber(angle)) {
                    let defAngle = 90.0 * DEGREE_TO_RAD;
                    this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid angle value, using default value angle = " + defAngle);
                    currChild.setAttribute("angle", defAngle);
                }
                angle = parseFloat(currChild.getAttribute("angle"));

                exponent = parseFloat(currChild.getAttribute("exponent"));
                if (!this.isValidNumber(exponent)) {
                    let defExponent = 1.0;
                    this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid exponent value, using default value exponent = " + defExponent);
                    currChild.setAttribute("exponent", defExponent);
                }
                exponent = parseFloat(currChild.getAttribute("exponent"));


            }
            if (currChild.nodeName == "omni") {
                this.lights[currChild.getAttribute("id")] = [lightEnabled, positionArray, ambientArray, diffuseArray, specularArray, false /*not spot*/ ];
            } else if (currChild.nodeName == "spot") {
                this.lights[currChild.getAttribute("id")] = [lightEnabled, positionArray, ambientArray, diffuseArray, specularArray, true /*spot*/ , angle, exponent, target];
            }
            i++;
        }
        while (i < children.length) return null;
    }
    checkLightRGB(currGrandchild) {
        let r = parseFloat(currGrandchild.getAttribute("r"));
        let g = parseFloat(currGrandchild.getAttribute("g"));
        let b = parseFloat(currGrandchild.getAttribute("b"));
        let a = parseFloat(currGrandchild.getAttribute("a"));
        if (!this.isValidNumber(r) || !this.isValidNumber(g) || !this.isValidNumber(b) || !this.isValidNumber(a)) {
            this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName + "' rgba values, using default value r = g = b = a = " + DEFAULT_LIGHT_VALUE);
            currGrandchild.setAttribute("r", DEFAULT_LIGHTS_LOCATION);
            currGrandchild.setAttribute("g", DEFAULT_LIGHTS_LOCATION);
            currGrandchild.setAttribute("b", DEFAULT_LIGHTS_LOCATION);
            currGrandchild.setAttribute("a", DEFAULT_LIGHTS_LOCATION);
        }
    }
    parseTextures(texturesNodes) {

        this.textures = [];
        let children = texturesNodes.children;

        var i = 0;
        var idsUsed = [];
        do {
            var currChild = children[i];

            //Check id
            try {
                if (currChild.getAttribute("id") == null) {
                    var newid = "texture" + i;
                    this.onXMLMinorError("Texture child number " + i + " does not have an id, using value id=" + newid + ".");
                    currChild.setAttribute("id", newid);
                }
            } catch (err) {
                throw "At least one Texture must exist."
            }

            //No repeated id
            if (idsUsed.indexOf(currChild.getAttribute("id")) > -1)
                throw "Repeated id in Textures, id= " + currChild.getAttribute("id");

            idsUsed.push(currChild.getAttribute("id"));

            if (currChild.getAttribute("file") == null)
                throw "A File must exist."

            let id = currChild.getAttribute("id");
            let filepath = currChild.getAttribute("file");
            this.textures[id] = new CGFtexture(this.scene, "./scenes/images/" + filepath);

            i++;
        } while (i < children.length)
        return null;
    }

    parseMaterials(materialsNodes) {
        this.materials = [];
        let children = materialsNodes.children;

        //At least one material
        var i = 0;
        var idsUsed = [];
        do {
            var currChild = children[i];

            //Check id
            try {
                if (currChild.getAttribute("id") == null) {
                    var newid = "material" + i;
                    this.onXMLMinorError("Materials child number " + i + " does not have an id, using value id=" + newid + ".");
                    currChild.setAttribute("id", newid);
                }
            } catch (err) {
                this.onXMLError("At least one Material must exist.");
            }
            let currID = currChild.getAttribute("id");
            this.materials[currID] = new CGFappearance(this.scene);
            //No repeated id
            if (idsUsed.indexOf(currChild.getAttribute("id")) > -1)
                throw "Repeated id in Materials, id= " + currChild.getAttribute("id");

            idsUsed.push(currChild.getAttribute("id"));
            var shininess = parseFloat(currChild.getAttribute("shininess"));
            this.materials[currID].setShininess(shininess);
            for (let j = 0; j < 4; j++) {
                let currGrandchild = currChild.children[j];
                this.materialCheckError(currGrandchild);
                switch (currGrandchild.nodeName) {
                    case "emission":
                        this.materials[currID].setEmission(parseFloat(currGrandchild.getAttribute("r")), parseFloat(currGrandchild.getAttribute("g")), parseFloat(currGrandchild.getAttribute("b")), parseFloat(currGrandchild.getAttribute("a")));
                        break;
                    case "ambient":
                        this.materials[currID].setAmbient(parseFloat(currGrandchild.getAttribute("r")), parseFloat(currGrandchild.getAttribute("g")), parseFloat(currGrandchild.getAttribute("b")), parseFloat(currGrandchild.getAttribute("a")));
                        break;
                    case "diffuse":
                        this.materials[currID].setDiffuse(parseFloat(currGrandchild.getAttribute("r")), parseFloat(currGrandchild.getAttribute("g")), parseFloat(currGrandchild.getAttribute("b")), parseFloat(currGrandchild.getAttribute("a")));
                        break;
                    case "specular":
                        this.materials[currID].setSpecular(parseFloat(currGrandchild.getAttribute("r")), parseFloat(currGrandchild.getAttribute("g")), parseFloat(currGrandchild.getAttribute("b")), parseFloat(currGrandchild.getAttribute("a")));
                        break;
                }
            }
            i++;
        } while (i < children.length) return null;
    }

    materialCheckError(currGrandchild) {
        if (currGrandchild.nodeName == "emission" || currGrandchild.nodeName == "ambient" || currGrandchild.nodeName == "diffuse" || currGrandchild.nodeName == "specular") {
            let r = parseFloat(currGrandchild.getAttribute("r"));
            let g = parseFloat(currGrandchild.getAttribute("g"));
            let b = parseFloat(currGrandchild.getAttribute("b"));
            let a = parseFloat(currGrandchild.getAttribute("a"));
            if (!this.isValidNumber(r) || !this.isValidNumber(g) || !this.isValidNumber(b) || !this.isValidNumber(a)) {
                this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName + "' rgba values, using default value r = g = b = a = " + DEFAULT_LIGHT_VALUE);
                currGrandchild.setAttribute("r", DEFAULT_LIGHT_VALUE);
                currGrandchild.setAttribute("g", DEFAULT_LIGHT_VALUE);
                currGrandchild.setAttribute("b", DEFAULT_LIGHT_VALUE);
                currGrandchild.setAttribute("a", DEFAULT_LIGHT_VALUE);
            }
        }
    }

    //Transformations
    parseTransformations(transformationsNodes) {
        this.transformations = [];
        let children = transformationsNodes.children;

        //At least one transformation
        var i = 0;
        var idsUsed = [];
        do {
            var currChild = children[i];

            //Check id
            try {
                if (currChild.getAttribute("id") == null) {
                    var newid = "transformation" + i;
                    this.onXMLMinorError("Transformations child number " + i + " does not have an id, using value id=" + newid + ".");
                    currChild.setAttribute("id", newid);
                }
            } catch (err) {
                throw "At least one Transformation must exist."
            }

            //No repeated id
            if (idsUsed.indexOf(currChild.getAttribute("id")) > -1)
                throw "Repeated id in Transformations, id= " + currChild.getAttribute("id");

            idsUsed.push(currChild.getAttribute("id"));

            let grandchildren = currChild.children;


            this.transformations[currChild.getAttribute("id")] = this.processTransformations(grandchildren);
            i++;
        } while (i < children.length) return null;
    }

    processTransformations(grandchildren) {
        //At least one transformation
        let j = 0;
        var matrix = mat4.create();
        do {
            let currGrandchild = grandchildren[j];
            if (currGrandchild.nodeName == "translate") {
                let x = parseFloat(currGrandchild.getAttribute("x"));
                let y = parseFloat(currGrandchild.getAttribute("y"));
                let z = parseFloat(currGrandchild.getAttribute("z"));
                if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {

                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName + "' xyz values, using default value x = y = z = " + DEFAULT_TRANSLATION_VALUE);
                    currGrandchild.setAttribute("x", DEFAULT_TRANSLATION_VALUE);
                    currGrandchild.setAttribute("y", DEFAULT_TRANSLATION_VALUE);
                    currGrandchild.setAttribute("z", DEFAULT_TRANSLATION_VALUE);
                }
                let vector = vec3.fromValues(currGrandchild.getAttribute("x"), currGrandchild.getAttribute("y"), currGrandchild.getAttribute("z"));
                mat4.translate(matrix, matrix, vector);
            } else if (currGrandchild.nodeName == "rotate") {
                let angle = parseFloat(currGrandchild.getAttribute("angle"));
                let axis = currGrandchild.getAttribute("axis");
                if (!this.isValidNumber(angle)) {
                    let defAngle = 0;
                    this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid angle value, using default value angle = " + defAngle);
                    currGrandchild.setAttribute("angle", defAngle);
                }
                if (axis != "x" && axis != "y" && axis != "z") {
                    let defAxis = "x";
                    this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid axis value, using default value axis = " + defAxis);
                    currGrandchild.setAttribute("angle", defAxis);
                }

                let vector = vec3.create();
                switch (currGrandchild.getAttribute("axis")) {
                    case "x":
                        {
                            vector = vec3.fromValues(1, 0, 0);
                            break;
                        }
                    case "y":
                        {
                            vector = vec3.fromValues(0, 1, 0);
                            break;
                        }
                    case "z":
                        {
                            vector = vec3.fromValues(0, 0, 1);
                            break;
                        }
                }
                angle = parseFloat(currGrandchild.getAttribute("angle")) * DEGREE_TO_RAD;
                mat4.rotate(matrix, matrix, angle, vector);
            } else if (currGrandchild.nodeName == "scale") {
                let x = parseFloat(currGrandchild.getAttribute("x"));
                let y = parseFloat(currGrandchild.getAttribute("y"));
                let z = parseFloat(currGrandchild.getAttribute("z"));
                if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName + "' xyz values, using default value x = y = z = " + DEFAULT_SCALE_VALUE);
                    currGrandchild.setAttribute("x", DEFAULT_SCALE_VALUE);
                    currGrandchild.setAttribute("y", DEFAULT_SCALE_VALUE);
                    currGrandchild.setAttribute("z", DEFAULT_SCALE_VALUE);
                }
                let vector = vec3.fromValues(parseFloat(currGrandchild.getAttribute("x")), parseFloat(currGrandchild.getAttribute("y")), parseFloat(currGrandchild.getAttribute("z")));
                mat4.scale(matrix, matrix, vector);
            } else {
                this.onXMLMinorError("Unknown node name in transformation id= " + currChild.getAttribute("id") + ".");
            }
            j++;

        } while (j < grandchildren.length)
        return matrix;
    }

    //Animations
    parseAnimations(animationNodes) {
        let children = animationNodes.children;


        for (let i = 0; i < children.length; i++) {
            let currChild = children[i];

            let currID = currChild.getAttribute("id");
            if (this.scene.animations[currID] != undefined) this.onXMLError("Repeated ID in animations");

            let currSpan = parseFloat(currChild.getAttribute("span"));
            if (!this.isValidNumber(currSpan)) this.onXMLError("Span attributes is invalid");

            if (currChild.nodeName == "linear") {
                let grandchildren = currChild.children;
                let controlPoints = [];
                for (let i = 0; i < grandchildren.length; i++) {
                    let currGrandchild = grandchildren[i];

                    if (currGrandchild.nodeName == "controlpoint") {
                        let x = parseFloat(currGrandchild.getAttribute("xx"));
                        let y = parseFloat(currGrandchild.getAttribute("yy"));
                        let z = parseFloat(currGrandchild.getAttribute("zz"));

                        if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                            this.onXMLError("Control point values are invalid");
                        }
                        controlPoints.push = vec3.fromValues(x, y, z);
                    } else this.onXMLError("Tag must be controlpoint");
                    this.scene.animations[currID] = new LinearAnimation(this.scene, currID, currSpan, controlPoints);
                }
            } else if (currChild.nodeName == "circular") {
                let centerString = currChild.getAttribute("center");
                let centerArray = centerString.split(" ");

                let center = vec3.fromValues(centerArray[0], centerArray[1], centerArray[2]);

                console.log("centerArray: " + center);


                let radius = parseFloat(currChild.getAttribute("radius"));
                let startang = parseFloat(currChild.getAttribute("startang"));
                let rotang = parseFloat(currChild.getAttribute("rotang"));

                if (!this.isValidNumber(radius) || !this.isValidNumber(startang) || !this.isValidNumber(rotang)) this.onXMLError("Invalid circular animation attributes");

                this.scene.animations[currID] = new CircularAnimation(this.scene, currID, currSpan, center, radius, startang, rotang);
                console.log(this.scene.animations[currID]);
            } else this.onXMLMinorError("Unknown tag " + currChild.nodeName + " in animations");
        }
    }


    //Primitives
    parsePrimitives(primitiveNodes) {

        let children = primitiveNodes.children;
        this.primitives = [];

        var i = 0;
        do {
            var currChild = children[i];

            //Check id
            try {
                if (currChild.getAttribute("id") == null) {
                    var newid = "Primitive" + i;
                    this.onXMLMinorError("Primitive child number " + i + " does not have an id, using value id=" + newid + ".");
                    currChild.setAttribute("id", newid);
                }
            } catch (err) {
                this.onXMLError("At least one Primitive must exist.");
            }

            //No repeated id
            if (this.primitives[currChild.getAttribute("id")] > -1)
                this.onXMLError("Repeated id in Primitives, id= " + currChild.getAttribute("id"));

            let grandchildren = currChild.children;

            //At least one transformation
            let currGrandchild = grandchildren[0];
            if (currGrandchild.nodeName == "rectangle") {
                let x1 = parseFloat(currGrandchild.getAttribute("x1"));
                let y1 = parseFloat(currGrandchild.getAttribute("y1"));
                let x2 = parseFloat(currGrandchild.getAttribute("x2"));
                let y2 = parseFloat(currGrandchild.getAttribute("y2"));
                if (!this.isValidNumber(x1) || !this.isValidNumber(y1) || !this.isValidNumber(x2) || !this.isValidNumber(y2)) {

                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName + "' x1y1x2y2 values, using default value x1 = y1 = z = " + DEFAULT_TRANSLATION_VALUE);
                    currGrandchild.setAttribute("x1", 1.0);
                    currGrandchild.setAttribute("y1", 1.0);
                    currGrandchild.setAttribute("x2", 2.0);
                    currGrandchild.setAttribute("y2", 2.0);
                }

                let args = [parseFloat(currGrandchild.getAttribute("x1")), parseFloat(currGrandchild.getAttribute("y1")), parseFloat(currGrandchild.getAttribute("x2")), parseFloat(currGrandchild.getAttribute("y2"))];
                this.primitives[currChild.getAttribute("id")] = new MyRectangle(this.scene, currChild.getAttribute("id"), args);
            } else if (currGrandchild.nodeName == "triangle") {
                let x1 = parseFloat(currGrandchild.getAttribute("x1"));
                let y1 = parseFloat(currGrandchild.getAttribute("y1"));
                let z1 = parseFloat(currGrandchild.getAttribute("z1"));
                let x2 = parseFloat(currGrandchild.getAttribute("x2"));
                let y2 = parseFloat(currGrandchild.getAttribute("y2"));
                let z2 = parseFloat(currGrandchild.getAttribute("z2"));
                let x3 = parseFloat(currGrandchild.getAttribute("x3"));
                let y3 = parseFloat(currGrandchild.getAttribute("y3"));
                let z3 = parseFloat(currGrandchild.getAttribute("z3"));
                if (!this.isValidNumber(x1) || !this.isValidNumber(y1) || !this.isValidNumber(z1) ||
                    !this.isValidNumber(x2) || !this.isValidNumber(y2) || !this.isValidNumber(z2) ||
                    !this.isValidNumber(x3) || !this.isValidNumber(y3) || !this.isValidNumber(z3)) {

                    this.onXMLMinorError("Primitive nº " + i + " has one or more invalid 'triangle' x1y1z1x2y2z2x3y3z3 values, using default values");
                    currGrandchild.setAttribute("x1", 1.0);
                    currGrandchild.setAttribute("y1", 1.0);
                    currGrandchild.setAttribute("z1", 1.0);
                    currGrandchild.setAttribute("x2", 2.0);
                    currGrandchild.setAttribute("y2", 2.0);
                    currGrandchild.setAttribute("z2", 2.0);
                    currGrandchild.setAttribute("x3", 2.0);
                    currGrandchild.setAttribute("y3", 3.0);
                    currGrandchild.setAttribute("z3", 4.0);
                }

                let args = [parseFloat(currGrandchild.getAttribute("x1")), parseFloat(currGrandchild.getAttribute("y1")), parseFloat(currGrandchild.getAttribute("z1")),
                    parseFloat(currGrandchild.getAttribute("x2")), parseFloat(currGrandchild.getAttribute("y2")), parseFloat(currGrandchild.getAttribute("z2")),
                    parseFloat(currGrandchild.getAttribute("x3")), parseFloat(currGrandchild.getAttribute("y3")), parseFloat(currGrandchild.getAttribute("z3"))
                ];

                this.primitives[currChild.getAttribute("id")] = new MyTriangle(this.scene, currChild.getAttribute("id"), args);

            } else if (currGrandchild.nodeName == "cylinder") {
                let base = parseFloat(currGrandchild.getAttribute("base"));
                let top = parseFloat(currGrandchild.getAttribute("top"));
                let height = parseFloat(currGrandchild.getAttribute("height"));
                let slices = parseInt(currGrandchild.getAttribute("slices"));
                let stacks = parseInt(currGrandchild.getAttribute("stacks"));
                console.log(base + " " + top + " " + height);
                if (!this.isValidNumber(base) || !this.isValidNumber(top) || !this.isValidNumber(height)) {
                    this.onXMLMinorError("Primitive nº " + i + " has one or more invalid 'cylinder' base/top/height values, using default 1.0")
                    currGrandchild.setAttribute("base", 1.0);
                    currGrandchild.setAttribute("top", 1.0);
                    currGrandchild.setAttribute("height", 1.0);

                }
                if (!this.isValidNumber(slices) || !this.isValidNumber(stacks)) {
                    this.onXMLMinorError("Primitive nº " + i + " has one or more invalid 'cylinder' slices/stacks values, using default values slices = 5, stacks = 2");
                    currGrandchild.setAttribute("slices", 5);
                    currGrandchild.setAttribute("stacks", 2);
                }
                this.primitives[currChild.getAttribute("id")] = new MyCylinder(this.scene, currChild.getAttribute("id"),
                    parseFloat(currGrandchild.getAttribute("base")), parseFloat(currGrandchild.getAttribute("top")), parseFloat(currGrandchild.getAttribute("height")),
                    parseInt(currGrandchild.getAttribute("slices")), parseInt(currGrandchild.getAttribute("stacks")));
            } else if (currGrandchild.nodeName == "sphere") {
                let radius = parseFloat(currGrandchild.getAttribute("radius"));
                let slices = parseInt(currGrandchild.getAttribute("slices"));
                let stacks = parseInt(currGrandchild.getAttribute("stacks"));
                if (!this.isValidNumber(radius)) {
                    this.onXMLMinorError("Primitive nº " + i + " has invalid 'sphere' radius value, using default 1.0")
                    currGrandchild.setAttribute("radius", 1.0);

                }
                if (!this.isValidNumber(slices) || !this.isValidNumber(stacks)) {
                    this.onXMLMinorError("Primitive nº " + i + " has one or more invalid 'sphere' slices/stacks values, using default values slices = 5, stacks = 2");
                    currGrandchild.setAttribute("slices", 5);
                    currGrandchild.setAttribute("stacks", 2);
                }
                this.primitives[currChild.getAttribute("id")] = new MySphere(this.scene, currChild.getAttribute("id"),
                    parseFloat(currGrandchild.getAttribute("radius")),
                    parseInt(currGrandchild.getAttribute("slices")), parseInt(currGrandchild.getAttribute("stacks")));
            } else if (currGrandchild.nodeName == "SemiSphere") {
                let slices = parseInt(currGrandchild.getAttribute("slices"));
                let stacks = parseInt(currGrandchild.getAttribute("stacks"));
                if (!this.isValidNumber(slices) || !this.isValidNumber(stacks)) {
                    this.onXMLMinorError("Primitive nº " + i + " has one or more invalid 'SemiSphere' slices/stacks values, using default values slices = 5, stacks = 2");
                    currGrandchild.setAttribute("slices", 5);
                    currGrandchild.setAttribute("stacks", 2);
                }
                this.primitives[currChild.getAttribute("id")] = new MySemiSphere(this.scene, currChild.getAttribute("id"),
                    parseInt(currGrandchild.getAttribute("slices")), parseInt(currGrandchild.getAttribute("stacks")));
            } else if (currGrandchild.nodeName == "Dome") {
                let slices = parseInt(currGrandchild.getAttribute("slices"));
                let stacks = parseInt(currGrandchild.getAttribute("stacks"));
                if (!this.isValidNumber(slices) || !this.isValidNumber(stacks)) {
                    this.onXMLMinorError("Primitive nº " + i + " has one or more invalid 'Dome' slices/stacks values, using default values slices = 5, stacks = 2");
                    currGrandchild.setAttribute("slices", 5);
                    currGrandchild.setAttribute("stacks", 2);
                }
                this.primitives[currChild.getAttribute("id")] = new MyDome(this.scene, currChild.getAttribute("id"),
                    parseInt(currGrandchild.getAttribute("slices")), parseInt(currGrandchild.getAttribute("stacks")));
            } else if (currGrandchild.nodeName == "Circle") {
                let slices = parseInt(currGrandchild.getAttribute("slices"));
                if (!this.isValidNumber(slices)) {
                    this.onXMLMinorError("Primitive nº " + i + " has one or more invalid 'Circle' slices values, using default values slices = 5");
                    currGrandchild.setAttribute("slices", 5);
                }
                this.primitives[currChild.getAttribute("id")] = new MyBase(this.scene, currChild.getAttribute("id"),
                    parseInt(currGrandchild.getAttribute("slices")));
            } else if (currGrandchild.nodeName == "torus") {
                let inner = parseFloat(currGrandchild.getAttribute("inner"));
                let outer = parseFloat(currGrandchild.getAttribute("outer"));
                let slices = parseInt(currGrandchild.getAttribute("slices"));
                let loops = parseInt(currGrandchild.getAttribute("loops"));
                if (!this.isValidNumber(inner)) {
                    this.onXMLMinorError("Primitive nº " + i + " has invalid 'torus' inner value, using default 1.0")
                    currGrandchild.setAttribute("inner", 1.0);
                }
                if (!this.isValidNumber(outer)) {
                    this.onXMLMinorError("Primitive nº " + i + " has invalid 'torus' outer value, using default 2.0")
                    currGrandchild.setAttribute("outer", 2.0);
                }
                if (!this.isValidNumber(slices) || !this.isValidNumber(loops)) {
                    this.onXMLMinorError("Primitive nº " + i + " has one or more invalid 'torus' slices/loops values, using default values slices = 5, loops = 2");
                    currGrandchild.setAttribute("slices", 5);
                    currGrandchild.setAttribute("loops", 2);
                }
                this.primitives[currChild.getAttribute("id")] = new Torus(this.scene, currChild.getAttribute("id"),
                    parseFloat(currGrandchild.getAttribute("inner")), parseFloat(currGrandchild.getAttribute("outer")),
                    parseInt(currGrandchild.getAttribute("slices")), parseInt(currGrandchild.getAttribute("loops")));
            } else if (currGrandchild.nodeName == "patch") {
                let npointsU = parseInt(currGrandchild.getAttribute("npointsU"));
                let npointsV = parseInt(currGrandchild.getAttribute("npointsV"));
                let npartsU = parseInt(currGrandchild.getAttribute("npartsU"));
                let npartsV = parseInt(currGrandchild.getAttribute("npartsV"));
                if (!this.isValidNumber(npointsU) || !this.isValidNumber(npointsV) || !this.isValidNumber(npartsU) || !this.isValidNumber(npartsV)) {
                    this.onXMLError("Primitive nº " + i + " has invalid values.");
                }
                let greatchildren = currGrandchild.children;
                let controlPoints = [];
                for (let u = 0; u < npointsU; u++) {
                    let vPoints = [];
                    for (let v = 0; v < npointsV; v++) {
                        let currGreatchild = greatchildren[npointsV * u + v];
                        if (currGreatchild.nodeName == "controlpoint") {
                            let x = parseFloat(currGreatchild.getAttribute("xx"));
                            let y = parseFloat(currGreatchild.getAttribute("yy"));
                            let z = parseFloat(currGreatchild.getAttribute("zz"));

                            if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                                this.onXMLError("Primitive nº " + i + " has invalid control point values");
                            }
                            vPoints.push(vec4.fromValues(x, y, z, 1));
                        } else {
                            this.onXMLError("Invalid tag " + greatchildren.nodeName);
                        }
                    }
                    controlPoints.push(vPoints);
                }
                let temp = new MyPatch(this.scene, npointsU, npointsV, npartsU, npartsV, controlPoints);
                console.log(this.primitives[currChild.getAttribute("id")]);
            } else if (currGrandchild.nodeName == "plane") {
                let npartsU = parseInt(currGrandchild.getAttribute("npartsU"));
                let npartsV = parseInt(currGrandchild.getAttribute("npartsV"));
                if (!this.isValidNumber(npartsU) || !this.isValidNumber(npartsV)) {
                    this.onXMLError("Primitive nº " + i + " has invalid values.");
                }

                let temp = new MyPlane(this.scene, npartsU, npartsV);
            } else this.onXMLError("Unknown node name " + currGrandchild.nodeName)
            i++;
        } while (i < children.length)
    }

    //Components
    parseComponents(componentNodes) {

        let children = componentNodes.children;
        let i = 0;
        do {
            let currChild = children[i];
            let currID = currChild.getAttribute("id");
            if (currID == null) //id not defined
            {
                let newid = "component" + i;
                this.onXMLMinorError("Component nº " + i + " does not have a defined id, setting id to" + newid);
                currChild.setAttribute("id", newid);
            }
            if (this.components[currID] > -1) //repeated ID
            {
                this.onXMLError("Component nº " + i + "has the repeated id" + currID);
            }

            let l = 0;
            let grandchildren = currChild.children;

            currID = currChild.getAttribute("id");
            this.components[currID] = new MyNode(this, currID);
            do {
                let currGrandchild = grandchildren[l];
                if (currGrandchild.nodeName == "transformation") {

                    let currGreatchildren = currGrandchild.children;

                    let matrix = mat4.create();
                    let currGreatchild = currGreatchildren[0];
                    if (currGreatchild != undefined) {
                        if (currGreatchild.nodeName == "transformationref") {
                            let idTrans = currGreatchild.getAttribute("id");
                            if (this.transformations[idTrans] == undefined)
                                this.onXMLError("Transformation ID not found on component id=" + currID);
                            mat4.multiply(matrix, matrix, this.transformations[idTrans]);
                        } else {
                            mat4.multiply(matrix, matrix, this.processTransformations(currGreatchildren));
                        }
                    }
                    mat4.copy(this.components[currID].transformationMatrix, matrix);

                } else if (currGrandchild.nodeName == "materials") {
                    let currGreatchildren = currGrandchild.children;
                    for (let z = 0; z < currGreatchildren.length; z++) {
                        let materialID = currGreatchildren[z].getAttribute("id");
                        let mater = this.materials[materialID];
                        if (materialID != "inherit" && mater == undefined)
                            this.onXMLError("Material ID not found on component id=" + currID);
                        this.components[currID].materialRefList.push(materialID);
                    }
                } else if (currGrandchild.nodeName == "texture") {
                    let textID = currGrandchild.getAttribute("id");
                    if (textID != "inherit" && textID != "none" && this.textures[textID] == undefined) {
                        this.onXMLError("Texture ID not found on component id=" + currID);
                    }
                    this.components[currID].textureref = textID;
                    if (textID != "none") {
                        this.components[currID].texS = parseFloat(currGrandchild.getAttribute("length_s"));
                        this.components[currID].texT = parseFloat(currGrandchild.getAttribute("length_t"));
                    }

                } else if (currGrandchild.nodeName == "animations") {
                    let greatchildren = currGrandchild.children;
                    for (let i = 0; i < greatchildren.length; i++) {
                        let greatchild = greatchildren[i];
                        if (greatchild.nodeName == "animationref") {
                            let animationID = greatchild.getAttribute("id");
                            if (this.scene.animations[animationID] == -1) {
                                this.onXMLError("Animation ID" + animationID + " does not exist.");
                                break;
                            }
                            this.components[currID].animations.push(animationID);
                        }
                    }

                } else if (currGrandchild.nodeName == "children") {
                    //nothing yet
                } else {
                    this.onXMLMinorError("Unknown tag");
                }
                l++;
            } while (l < grandchildren.length)
            i++;
        } while (i < children.length)

        this.processNodesAux(componentNodes);
        this.assignFirstMaterial();
        this.assignFirstAnimation();
        return null;
    }

    assignFirstMaterial() {
        for (var comp in this.components)
            this.components[comp].assignFirstMat();
    }
    assignFirstAnimation() {
        for (var comp in this.components)
            this.components[comp].assignFirstAni();
    }

    componentsNextMaterial() {
        for (var comp in this.components)
            this.components[comp].nextMaterial();
    }

    processNodesAux(componentNodes) {
        //CHILDREN
        let children = componentNodes.children;
        let i = 0;
        do {
            let currChild = children[i];
            let j = 0;
            let grandchildren = currChild.children;

            let currID = currChild.getAttribute("id");
            do {
                let currGrandchild = grandchildren[j];
                if (currGrandchild.nodeName == "children") {
                    let greatchildren = currGrandchild.children;
                    let k = 0;
                    do {
                        let currGreatchild = greatchildren[k];
                        if (currGreatchild.nodeName == "primitiveref") {
                            let idPrimitive = currGreatchild.getAttribute("id");
                            if (this.primitives[idPrimitive] < 0)
                                this.onXMLError("Component id primitve not found");
                            else
                                this.components[currID].addLeaf(this.primitives[idPrimitive]);

                        } else if (currGreatchild.nodeName == "componentref") {
                            let idChild = currGreatchild.getAttribute("id");
                            if (this.components[idChild] < 0)
                                this.onXMLError("Component id child not found");
                            this.components[currID].addChild(this.components[idChild]);
                        }
                        k++;
                    } while (k < greatchildren.length)
                }
                j++;
            }
            while (j < grandchildren.length)
            i++;
        } while (i < children.length)
    }



    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {

        var rootComponent = this.components[this.rootID];
        if (this.textures[rootComponent.textureref] != null)
            this.processComponent(rootComponent, rootComponent.textureref, rootComponent.materialref, rootComponent.texS, rootComponent.texT);
        else
            this.processComponent(rootComponent, null, rootComponent.materialref, 1, 1);
    }

    processComponent(component, tex, mat, textureS, textureT) {

        let textura = tex;
        let material = mat;
        this.scene.setDefaultAppearance();
        this.scene.defaultAppearance.apply();

        this.scene.pushMatrix();
        this.scene.multMatrix(component.transformationMatrix);
        if (component.hasAnimation)
             this.scene.multMatrix(component.animationMatrix);

        let texS = textureS;
        let texT = textureT;

        if (component.textureref == 'none')
            textura = null;
        else {

            if (!isNaN(component.texS))
                texS = component.texS;
            if (!isNaN(component.texT))
                texT = component.texT;
            if (component.textureref != "inherit") {
                textura = component.textureref;
            }
        }

        if (component.materialref != "inherit") {
            material = component.materialref;
        }

        for (var i = 0; i < component.children.length; i++) {
            this.processComponent(this.components[component.children[i].nodeID], textura, material, texS, texT);
        }


        if (this.scene.changeMaterial) {
            component.nextMaterial();
        }
        if (material != null) {
            this.materials[material].setTexture(null);
            if (textura != null) {
                this.materials[material].setTexture(this.textures[textura]);
            }
            this.materials[material].apply();
        }
        for (var j = 0; j < component.leaves.length; j++) {
            component.leaves[j].updateTexCoords(texS, texT);
            component.leaves[j].display();
        }
        this.scene.popMatrix();
    }


    isValidNumber(attribute) {
        return !(attribute == null || isNaN(attribute));
    }
}
