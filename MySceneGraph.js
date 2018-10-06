var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var AMBIENT_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var PRIMITIVES_INDEX = 7;
var COMPONENTS_INDEX = 8;

//Default Values
var DEFAULT_SCENE_ROOT = "rootScene";
var DEFAULT_SCENE_AXIS_LENGTH = 5.0;

var DEFAULT_VIEWS_DEFAULT = "defaultViews";
var DEFAULT_PERSPECTIVE_NEAR = 0.1;
var DEFAULT_PERSPECTIVE_FAR = 900;
var DEFAULT_PERSPECTIVE_ANGLE = 0.0;
var DEFAULT_PERSPECTIVE_FROM = 1.0;
var DEFAULT_PERSPECTIVE_TO = 40.0;
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

        this.nodes = [];

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

    //SCENE DONE? TODO APAGAR
    parseScene(sceneNodes) {
        //Root
        if (sceneNodes.getAttribute("root") == null) {
            this.onXMLMinorError("Root does not have a name, using default name " + DEFAULT_SCENE_ROOT + ".");
            sceneNodes.setAttribute("root", DEFAULT_SCENE_ROOT);
        }

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

    //Views DONE TODO GUARDAR INFO  APAGAR
    parseViews(viewsNodes) {

        //Default
        if (viewsNodes.getAttribute("default") == null) {
            this.onXMLMinorError("Views does not have a default attribute, using value " + DEFAULT_VIEWS_DEFAULT + ".");
            viewsNodes.setAttribute("default", DEFAULT_VIEWS_DEFAULT);
        }
        console.log("Views: default= " + viewsNodes.getAttribute("default"));

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
                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'from' xyz values, using default value x = y = z = " + DEFAULT_PERSPECTIVE_FROM);
                    currGrandchild.setAttribute("x", DEFAULT_PERSPECTIVE_FROM);
                    currGrandchild.setAttribute("y", DEFAULT_PERSPECTIVE_FROM);
                    currGrandchild.setAttribute("z", DEFAULT_PERSPECTIVE_FROM);
                }

                //To Attribute
                var currGrandchild = currChild.children[1];

                x = parseFloat(currGrandchild.getAttribute("x"));
                y = parseFloat(currGrandchild.getAttribute("y"));
                z = parseFloat(currGrandchild.getAttribute("z"));
                if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'to' xyz values, using default value x = y = z = " + DEFAULT_PERSPECTIVE_TO);
                    currGrandchild.setAttribute("x", DEFAULT_PERSPECTIVE_TO);
                    currGrandchild.setAttribute("y", DEFAULT_PERSPECTIVE_TO);
                    currGrandchild.setAttribute("z", DEFAULT_PERSPECTIVE_TO);
                }
            } else if (currChild.nodeName == "ortho") {
                var left = parseFloat(currChild.getAttribute("left"));
                var right = parseFloat(currChild.getAttribute("right"));
                if (!this.isValidNumber(left) || !this.isValidNumber(right) || right < left) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has the attribute left and/or right invalid, using value right = -left = " + DEFAULT_ORTHO_SIDE);
                    currChild.setAttribute("left", DEFAULT_ORTHO_SIDE * -1);
                    currChild.setAttribute("right", DEFAULT_ORTHO_SIDE);
                }
                var top = parseFloat(currChild.getAttribute("top"));
                var bottom = parseFloat(currChild.getAttribute("bottom"));
                if (!this.isValidNumber(bottom) || !this.isValidNumber(top) || top < bottom) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has the attribute left and/or right invalid, using value top = -bottom = " + DEFAULT_ORTHO_SIDE);
                    currChild.setAttribute("bottom", DEFAULT_ORTHO_SIDE * -1);
                    currChild.setAttribute("top", DEFAULT_ORTHO_SIDE);
                }
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
        //Ambient TODO Test this GUARDAR INFO
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

    //Lights TODO GUARDAR INFO
    parseLights(ligthsNodes) {
        let children = ligthsNodes.children;

        //At least one light
        var i = 0;
        var idsUsed = [];
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
            if (idsUsed.indexOf(currChild.getAttribute("id")) > -1)
                throw "Repeated id in Lights, id= " + currChild.getAttribute("id");

            idsUsed.push(currChild.getAttribute("id"));
            var near = parseFloat(currChild.getAttribute("near"));
            var far = parseFloat(currChild.getAttribute("far"));

            //Enabled TODO confirmar se tt e true ou 1
            let ena = currChild.getAttribute("enabled");
            if (ena != 0 && ena != 1) {
                this.onXMLMinorError("Lights child id= " + currChild.getAttribute("id") + " has not a valid 'enabled' value, using 1.");
            }
            for (let j = 0; j < 4; j++) {
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
                    } else if (currGrandchild.nodeName == "ambient" || currGrandchild.nodeName == "diffuse" || currGrandchild.nodeName == "specular") {
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
                    if (currChild.nodeName == "spot" && currGrandchild.nodeName == "target") {
                        let x = parseFloat(currGrandchild.getAttribute("x"));
                        let y = parseFloat(currGrandchild.getAttribute("y"));
                        let z = parseFloat(currGrandchild.getAttribute("z"));

                        if (!this.isValidNumber(x) || !this.isValidNumber(y) || !this.isValidNumber(z)) {
                            this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName + "' xyz values, using default value x = y = z = " + DEFAULT_SPOT_TARGET);
                            currGrandchild.setAttribute("x", DEFAULT_SPOT_TARGET);
                            currGrandchild.setAttribute("y", DEFAULT_SPOT_TARGET);
                            currGrandchild.setAttribute("z", DEFAULT_SPOT_TARGET);
                        }
                    }
                }
                if (currChild.nodeName == "spot") {
                    let a = currChild.getAttribute("angle");
                    if (!this.isValidNumber(a)) {
                        let defAngle = 90.0 * DEGREE_TO_RAD;
                        this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid angle value, using default value angle = " + defAngle);
                        currChild.setAttribute("angle", defAngle);
                    }
                    a = currChild.getAttribute("exponent");
                    if (!this.isValidNumber(a)) {
                        let defExponent = 1.0;
                        this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid exponent value, using default value exponent = " + defExponent);
                        currChild.setAttribute("exponent", defExponent);
                    }
                }

            }
            i++;
        } while (i < children.length) return null;
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

            this.id = currChild.getAttribute("id");
            this.filepath = currChild.getAttribute("file");
            this.textures[this.id] = this.filepath;

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

            for (let j = 0; j < 4; j++) {
                let currGrandchild = currChild.children[j];
                this.materialCheckError(currGrandchild);
                switch(currGrandchild.nodeName){
                    case "emission": this.materials[currID].setEmission(currGrandchild.getAttribute("r"), currGrandchild.getAttribute("b"), currGrandchild.getAttribute("b"), currGrandchild.getAttribute("a")); break;
                    case "ambient" : this.materials[currID].setAmbient(currGrandchild.getAttribute("r"), currGrandchild.getAttribute("b"), currGrandchild.getAttribute("b"), currGrandchild.getAttribute("a")); break;
                    case "diffuse" : this.materials[currID].setDiffuse(currGrandchild.getAttribute("r"), currGrandchild.getAttribute("b"), currGrandchild.getAttribute("b"), currGrandchild.getAttribute("a")); break;
                    case "specular": this.materials[currID].setSpecular(currGrandchild.getAttribute("r"), currGrandchild.getAttribute("b"), currGrandchild.getAttribute("b"), currGrandchild.getAttribute("a")); break;
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
                currGrandchild.setAttribute("r", DEFAULT_LIGHTS_LOCATION);
                currGrandchild.setAttribute("g", DEFAULT_LIGHTS_LOCATION);
                currGrandchild.setAttribute("b", DEFAULT_LIGHTS_LOCATION);
                currGrandchild.setAttribute("a", DEFAULT_LIGHTS_LOCATION);
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
            var matrix = mat4.create();
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

            //At least one transformation
            let j = 0;
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
                    let vector = vec3.create(currGrandchild.getAttribute("x"), currGrandchild.getAttribute("y"), currGrandchild.getAttribute("z"));
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
                            }
                        case "y":
                            {
                                vector = vec3.fromValues(0, 1, 0);
                            }
                        case "z":
                            {
                                vector = vec3.fromValues(0, 0, 1);
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
                    let vector = vec3.create(currGrandchild.getAttribute("x"), currGrandchild.getAttribute("y"), currGrandchild.getAttribute("z"));
                    mat4.scale(matrix, matrix, vector);
                } else {
                    this.onXMLMinorError("Unknown node name in transformation id= " + currChild.getAttribute("id") + ".");
                }
                j++;
                this.transformations[currChild.getAttribute("id")] = matrix;
            } while (j < grandchildren.length) i++;
        } while (i < children.length) return null;
    }

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
                this.primitives[currChild.getAttribute("id")] = new MyRectangle(this.scene, currChild.getAttribute("id"), parseFloat(currGrandchild.getAttribute("x1")), parseFloat(currGrandchild.getAttribute("y1")), parseFloat(currGrandchild.getAttribute("x2")), parseFloat(currGrandchild.getAttribute("y2")));
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
                this.primitives[currChild.getAttribute("id")] = new MyTriangle(this.scene, currChild.getAttribute("id"),
                    parseFloat(currGrandchild.getAttribute("x1")), parseFloat(currGrandchild.getAttribute("y1")), parseFloat(currGrandchild.getAttribute("z1")),
                    parseFloat(currGrandchild.getAttribute("x2")), parseFloat(currGrandchild.getAttribute("y2")), parseFloat(currGrandchild.getAttribute("z2")),
                    parseFloat(currGrandchild.getAttribute("x3")), parseFloat(currGrandchild.getAttribute("y3")), parseFloat(currGrandchild.getAttribute("z3")));
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
            }
            i++;
        } while (i < children.length)
    }

    parseComponents(componentNodes) {
        this.components = [];

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

            let j = 0;
            let grandchildren = currChild.children;
            do {
                let currGrandchild = grandchildren[j];
                if (currGrandchild.nodeName == "children") {
                    let greatchildren = currGrandchild.children;
                    let k = 0;
                    do {
                        let currGreatchild = greatchildren[k];
                        if (currGreatchild.nodeName == "primitiveref") {
                            let idPrimitive = currGreatchild.getAttribute("id");
                            //TODO check if id is in list
                            if (this.primitives[idPrimitive] < 0) {
                                this.onXMLError("Component id primitve not found");
                            }
                            //TODO
                        } else if (currGreatchild.nodeName == "componentref") {
                            //TODO
                        }

                        k++;
                    } while (k < greatchildren.length)
                }

                j++;
            } while (j < grandchildren.length)
            i++;
        } while (i < children.length)
        return null;
    }

    /**
     * Parses the <INITIALS> block.
     */

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
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
        this.defaultAppearance = new CGFappearance(this.scene);
        this.setDefaultAppearance();
        this.defaultAppearance.apply();

        this.primitives["rec"].display();
        this.primitives["tri"].display();

        this.materials["materialID"].apply();
        this.primitives["cyl"].display();
    }

    isValidNumber(attribute) {
        return !(attribute == null || isNaN(attribute));
    }

    setDefaultAppearance() {
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setShininess(10.0);
    }
}