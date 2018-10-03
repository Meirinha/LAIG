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
var DEFAULT_SCENE_AXIS_LENGTH = 1.0;

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

var ID_MATRIX = [[1,0,0,0]
                 [0,1,0,0]
                 [0,0,1,0]
                 [0,0,0,1]];
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

        this.idRoot = null;                    // The id of the root element.

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
	DONE TODO APAGAR

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
            if ((error = this.newparseLights(nodes[index])) != null)
                return error;
        }

        // <TEXTURES>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse TEXTURES block
            if ((error = this.newparseTextures(nodes[index])) != null)
                return error;
        }

        // <MATERIALS>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse MATERIALS block
            if ((error = this.newparseMaterials(nodes[index])) != null)
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
        if(sceneNodes.getAttribute("root") == null){
            this.onXMLMinorError("Root does not have a name, using default name " + DEFAULT_SCENE_ROOT + ".");
            sceneNodes.setAttribute("root", DEFAULT_SCENE_ROOT);
        }

        //Axis Length
        var sceneAxisLength = parseFloat(sceneNodes.getAttribute("axis_length"));

        if(!this.isValidFloat(sceneAxisLength) || sceneAxisLength < 0) {
		    this.onXMLMinorError("Scene does not have a valid axis_length, using default value " + DEFAULT_SCENE_AXIS_LENGTH + ".");
		    sceneNodes.setAttribute("axis_length", DEFAULT_SCENE_AXIS_LENGTH);
		}
        console.log("Scene: Root= " + sceneNodes.getAttribute("root") + " Axis_Length= " + sceneNodes.getAttribute("axis_length"));
			return;
	}

    //Views DONE TODO APAGAR
    parseViews(viewsNodes){

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
            try{
            if (currChild.getAttribute("id") == null) {
                var newid = "view" + i;
                this.onXMLMinorError("Views child number " + i + " does not have an id, using value id=" + newid + ".");
                currChild.setAttribute("id", newid);
            }
            }catch(err)
            {
                throw "At least one View (perspective or ortho) must exist."
            }

            if (idsUsed.indexOf(currChild.getAttribute("id")) > -1)
                throw "Repeated id in Views, id= " + currChild.getAttribute("id");

            idsUsed.push(currChild.getAttribute("id"));
            var near = parseFloat(currChild.getAttribute("near"));
            var far = parseFloat(currChild.getAttribute("far"));

            //Near
            if (!this.isValidFloat(near) || near < 0) {
                this.onXMLMinorError(currChild.getAttribute("id") + " does not have a near attribute, using default value near= " + DEFAULT_PERSPECTIVE_NEAR);
                currChild.setAttribute("near", DEFAULT_PERSPECTIVE_NEAR);
            }

            //Far
            if (!this.isValidFloat(far) || far < 0) {
                this.onXMLMinorError(currChild.getAttribute("id") + " does not have a far attribute, using default value far= " + DEFAULT_PERSPECTIVE_FAR);
                currChild.setAttribute("far", DEFAULT_PERSPECTIVE_FAR);
            }

            //Type Specific Attributes
            if (currChild.nodeName == "perspective") {
                var angle = parseFloat(currChild.getAttribute("angle"));
                if (!this.isValidFloat(angle)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " does not have an angle attribute, using default value angle= " + DEFAULT_PERSPECTIVE_ANGLE);
                    currChild.setAttribute("angle", DEFAULT_PERSPECTIVE_ANGLE);
                }

                //From Attribute
                var currGrandchild = currChild.children[0];

                var x = parseFloat(currGrandchild.getAttribute("x"));
                var y = parseFloat(currGrandchild.getAttribute("y"));
                var z = parseFloat(currGrandchild.getAttribute("z"));
                if (!this.isValidFloat(x) || !this.isValidFloat(y) || !this.isValidFloat(z)) {
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
                if (!this.isValidFloat(x) || !this.isValidFloat(y) || !this.isValidFloat(z)) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'to' xyz values, using default value x = y = z = " + DEFAULT_PERSPECTIVE_TO);
                    currGrandchild.setAttribute("x", DEFAULT_PERSPECTIVE_TO);
                    currGrandchild.setAttribute("y", DEFAULT_PERSPECTIVE_TO);
                    currGrandchild.setAttribute("z", DEFAULT_PERSPECTIVE_TO);
                }
            }
            else if (currChild.nodeName == "ortho") {
                var left = parseFloat(currChild.getAttribute("left"));
                var right = parseFloat(currChild.getAttribute("right"));
                if (!this.isValidFloat(left) || !this.isValidFloat(right) || right < left) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has the attribute left and/or right invalid, using value right = -left = " + DEFAULT_ORTHO_SIDE);
                    currChild.setAttribute("left", DEFAULT_ORTHO_SIDE * -1);
                    currChild.setAttribute("right", DEFAULT_ORTHO_SIDE);
                }
                var top = parseFloat(currChild.getAttribute("top"));
                var bottom = parseFloat(currChild.getAttribute("bottom"));
                if (!this.isValidFloat(bottom) || !this.isValidFloat(top) || top < bottom) {
                    this.onXMLMinorError(currChild.getAttribute("id") + " has the attribute left and/or right invalid, using value top = -bottom = " + DEFAULT_ORTHO_SIDE);
                    currChild.setAttribute("bottom", DEFAULT_ORTHO_SIDE * -1);
                    currChild.setAttribute("top", DEFAULT_ORTHO_SIDE);
                }
            }
            else {
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
        //Ambient TODO Test this
        var currChild = children[0];
        if (currChild.nodeName == "ambient") {

            var colorsArray = ["r","g","b"];
            for(let i = 0; i < 3; i++)
            {
                let color = colorsArray[i];
                let colorValue = parseFloat(currChild.getAttribute(color));
                if(!this.isValidFloat(colorValue) || colorValue < 0 || colorValue > 1)
                {
                    this.onXMLMinorError("The value " + color + "of the child ambient of Ambient is not valid, using default value " + DEFAULT_AMBIENT_RGB);
                    currChild.setAttribute(color, DEFAULT_AMBIENT_RGB);
                }
            }
            var alpha = parseFloat(currChild.getAttribute("a"));
            if (!this.isValidFloat(alpha) || alpha < 0 || alpha > 1) {
                this.onXMLMinorError("The value alpha of the child ambient of Ambient is not valid, using default value " + DEFAULT_AMBIENT_ALPHA);
                currChild.setAttribute("a", DEFAULT_AMBIENT_ALPHA);
            }
        }
        else
            throw "Ambient must have ambient and background children, in this order";
        if (currChild.nodeName == "background") {
            var colorsArray = ["r", "g", "b"];
            for (let i = 0; i < 3; i++) {
                let color = colorsArray[i];
                let colorValue = parseFloat(currChild.getAttribute(color));
                if (!this.isValidFloat(colorValue) || colorValue < 0 || colorValue > 1) {
                    this.onXMLMinorError("The value " + color + "of the child ambient of Ambient is not valid, using default value " + DEFAULT_BACKGROUND_RGB);
                    currChild.setAttribute(color, DEFAULT_BACKGROUND_RGB);
                }
            }
            var alpha = parseFloat(currChild.getAttribute("a"));
            if (!this.isValidFloat(alpha) || alpha < 0 || alpha > 1) {
                this.onXMLMinorError("The value alpha of the child ambient of Ambient is not valid, using default value " + DEFAULT_BACKGROUND_ALPHA);
                currChild.setAttribute("a", DEFAULT_BACKGROUND_ALPHA);
            }
        }
        else
            throw "Ambient must have ambient and background children, in this order";
    }

    //Lights TODO finish function
    newparseLights(ligthsNodes) {
        let children = ligthsNodes.children;

        //At least one light
        var i = 0;
        var idsUsed = [];
        do {
            var currChild = children[i];

            //Check id
            try{
                if (currChild.getAttribute("id") == null) {
                    var newid = "light" + i;
                    this.onXMLMinorError("Lights child number " + i + " does not have an id, using value id=" + newid + ".");
                    currChild.setAttribute("id", newid);
                }
            }catch(err)
            {
                throw "At least one Light (omni or spot) must exist."
            }

            //No repeated id
            if (idsUsed.indexOf(currChild.getAttribute("id")) > -1)
                throw "Repeated id in Lights, id= " + currChild.getAttribute("id");

            idsUsed.push(currChild.getAttribute("id"));
            var near = parseFloat(currChild.getAttribute("near"));
            var far = parseFloat(currChild.getAttribute("far"));

            //Enabled TODO confirmar se tt e true ou 1
            let ena = currChild.getAttribute("enabled");
            if(ena != 0 && ena != 1){
                this.onXMLError("Lights child id= " + currChild.getAttribute("id") + " has not a valid 'enabled' value, using 1.");
              }
              for( let i = 0; i < 3 ; i++)
              {
              let currGrandchild = currChild.children[i];
              if(currGrandchild.nodeName == "location"){
              let x = parseFloat(currGrandchild.getAttribute("x"));
              let y = parseFloat(currGrandchild.getAttribute("y"));
              let z = parseFloat(currGrandchild.getAttribute("z"));
              let w = parseFloat(currGrandchild.getAttribute("w"));
              if(!this.isValidFloat(x) || !this.isValidFloat(y) || !this.isValidFloat(z) || !this.isValidFloat(w)){
                this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid 'location' xyzw values, using default value x = y = z = w = " + DEFAULT_LIGHTS_LOCATION);
                currGrandchild.setAttribute("x", DEFAULT_LIGHTS_LOCATION);
                currGrandchild.setAttribute("y", DEFAULT_LIGHTS_LOCATION);
                currGrandchild.setAttribute("z", DEFAULT_LIGHTS_LOCATION);
                currGrandchild.setAttribute("w", DEFAULT_LIGHTS_LOCATION);
              }
              else if(currGrandchild.nodeName == "ambient" || currGrandchild.nodeName == "diffuse" || currGrandchild.nodeName == "specular"){
                let r = parseFloat(currGrandchild.getAttribute("r"));
                let g = parseFloat(currGrandchild.getAttribute("g"));
                let b = parseFloat(currGrandchild.getAttribute("b"));
                let a = parseFloat(currGrandchild.getAttribute("a"));
                if(!this.isValidFloat(r) || !this.isValidFloat(g) || !this.isValidFloat(b) || !this.isValidFloat(a)){
                  this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName "' rgba values, using default value r = g = b = a = " + DEFAULT_LIGHT_VALUE);
                  currGrandchild.setAttribute("r", DEFAULT_LIGHTS_LOCATION);
                  currGrandchild.setAttribute("g", DEFAULT_LIGHTS_LOCATION);
                  currGrandchild.setAttribute("b", DEFAULT_LIGHTS_LOCATION);
                  currGrandchild.setAttribute("a", DEFAULT_LIGHTS_LOCATION);
              }
            }
            if(currChild.nodeName == "spot" && currGrandchild.nodeName == "target"){
              let x = parseFloat(currGrandchild.getAttribute("x"));
              let y = parseFloat(currGrandchild.getAttribute("y"));
              let z = parseFloat(currGrandchild.getAttribute("z"));

              if(!this.isValidFloat(x) || !this.isValidFloat(y) || !this.isValidFloat(z){
                this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName "' xyz values, using default value x = y = z = " + DEFAULT_SPOT_TARGET);
                currGrandchild.setAttribute("x", DEFAULT_SPOT_TARGET);
                currGrandchild.setAttribute("y", DEFAULT_SPOT_TARGET);
                currGrandchild.setAttribute("z", DEFAULT_SPOT_TARGET);
          }
        }
        if(currChild.nodeName == "spot"){
          let a = currChild.getAttribute("angle");
          if(!this.isValidFloat(a)){
          let defAngle = 90.0 * DEGREE_TO_RAD;
          this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid angle value, using default value angle = " + defAngle);
          currChild.setAttribute("angle", defAngle);
        }
        a = currChild.getAttribute("exponent");
        if(!this.isValidFloat(a)){
        let defExponent = 1.0;
        this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid exponent value, using default value exponent = " + defExponent);
        currChild.setAttribute("exponent", defExponent);
      }


      }

        }while(i < children.length)
        return null;
    }

    parseTransformations(tranformationsNodes)
    {
      let children = transformationNodes.children;

      //At least one transformation
      var matrix = ID_MATRIX;
      var i = 0;
      var idsUsed = [];
      do {
          var currChild = children[i];

          //Check id
          try{
              if (currChild.getAttribute("id") == null) {
                  var newid = "tranformation" + i;
                  this.onXMLMinorError("Transformations child number " + i + " does not have an id, using value id=" + newid + ".");
                  currChild.setAttribute("id", newid);
              }
          }catch(err)
          {
              throw "At least one Transformation must exist."
          }

          //No repeated id
          if (idsUsed.indexOf(currChild.getAttribute("id")) > -1)
              throw "Repeated id in Transformations, id= " + currChild.getAttribute("id");

          idsUsed.push(currChild.getAttribute("id"));

          let grandchildren = currChild.children;

          //At least one tranformation
          let j = 0;
          do{
            currGrandchild = grandchildren[j];
            if(currGrandchild.nodeName == "translate"){
              let x = parseFloat(currGrandchild.getAttribute("x"));
              let y = parseFloat(currGrandchild.getAttribute("y"));
              let z = parseFloat(currGrandchild.getAttribute("z"));
              if(!this.isValidFloat(x) || !this.isValidFloat(y) || !this.isValidFloat(z)){

                this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName "' xyz values, using default value x = y = z = " + DEFAULT_TRANSLATION_VALUE);
                currGrandchild.setAttribute("x", DEFAULT_TRANSLATION_VALUE);
                currGrandchild.setAttribute("y", DEFAULT_TRANSLATION_VALUE);
                currGrandchild.setAttribute("z", DEFAULT_TRANSLATION_VALUE);
                
            }
          }
          else if(currGrandchild.nodeName == "rotate"){
              let angle = parseFloat(currGrandchild.getAttribute("angle"));
              let axis = currGrandchild.getAttribute("axis");
              if(!this.isValidFloat(angle)){
                let defAngle = 0;
                this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid angle value, using default value angle = " + defAngle);
                currGrandchild.setAttribute("angle", defAngle);
            }
            if(axis != "x" && axis != "y" && axis != "z")
            {
              let defAxis = "x";
              this.onXMLMinorError(currChild.getAttribute("id") + " has an invalid axis value, using default value axis = " + defAxis);
              currGrandchild.setAttribute("angle", defAngle);
            }
          }
          else if(currGrandchild.nodeName == "scale"){
            let x = parseFloat(currGrandchild.getAttribute("x"));
            let y = parseFloat(currGrandchild.getAttribute("y"));
            let z = parseFloat(currGrandchild.getAttribute("z"));
            if(!this.isValidFloat(x) || !this.isValidFloat(y) || !this.isValidFloat(z)){
              this.onXMLMinorError(currChild.getAttribute("id") + " has one or more invalid '" + currGrandchild.nodeName "' xyz values, using default value x = y = z = " + DEFAULT_SCALE_VALUE);
              currGrandchild.setAttribute("x", DEFAULT_SCALE_VALUE);
              currGrandchild.setAttribute("y", DEFAULT_SCALE_VALUE);
              currGrandchild.setAttribute("z", DEFAULT_SCALE_VALUE);
          }
        }
            else {
              this.onXMLMinorError("Unknown node name in tranformation id= " + currChild.getAttribute("id") + ".");
            }
            j++;
          }while(j < grandchildren.length)

        }while(i < children.length)
        return null;
    }


    /**
     * Parses the <INITIALS> block.
     */
    parseInitials(initialsNode) {

        var children = initialsNode.children;

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        // Frustum planes
        // (default values)
        this.near = 0.1;
        this.far = 500;
        var indexFrustum = nodeNames.indexOf("frustum");
        if (indexFrustum == -1) {
            this.onXMLMinorError("frustum planes missing; assuming 'near = 0.1' and 'far = 500'");
        }
        else {
            this.near = this.reader.getFloat(children[indexFrustum], 'near');
            this.far = this.reader.getFloat(children[indexFrustum], 'far');

            if (!(this.near != null && !isNaN(this.near))) {
                this.near = 0.1;
                this.onXMLMinorError("unable to parse value for near plane; assuming 'near = 0.1'");
            }
            else if (!(this.far != null && !isNaN(this.far))) {
                this.far = 500;
                this.onXMLMinorError("unable to parse value for far plane; assuming 'far = 500'");
            }

            if (this.near >= this.far)
                return "'near' must be smaller than 'far'";
        }

        // Checks if at most one translation, three rotations, and one scaling are defined.
        if (initialsNode.getElementsByTagName('translation').length > 1)
            return "no more than one initial translation may be defined";

        if (initialsNode.getElementsByTagName('rotation').length > 3)
            return "no more than three initial rotations may be defined";

        if (initialsNode.getElementsByTagName('scale').length > 1)
            return "no more than one scaling may be defined";

        // Initial transforms.
        this.initialTranslate = [];
        this.initialScaling = [];
        this.initialRotations = [];

        // Gets indices of each element.
        var translationIndex = nodeNames.indexOf("translation");
        var thirdRotationIndex = nodeNames.indexOf("rotation");
        var secondRotationIndex = nodeNames.indexOf("rotation", thirdRotationIndex + 1);
        var firstRotationIndex = nodeNames.lastIndexOf("rotation");
        var scalingIndex = nodeNames.indexOf("scale");

        // Checks if the indices are valid and in the expected order.
        // Translation.
        this.initialTransforms = mat4.create();
        mat4.identity(this.initialTransforms);

        if (translationIndex == -1)
            this.onXMLMinorError("initial translation undefined; assuming T = (0, 0, 0)");
        else {
            var tx = this.reader.getFloat(children[translationIndex], 'x');
            var ty = this.reader.getFloat(children[translationIndex], 'y');
            var tz = this.reader.getFloat(children[translationIndex], 'z');

            if (tx == null || ty == null || tz == null) {
                tx = 0;
                ty = 0;
                tz = 0;
                this.onXMLMinorError("failed to parse coordinates of initial translation; assuming zero");
            }

            //TODO: Save translation data
        }

        //TODO: Parse Rotations

        //TODO: Parse Scaling

        //TODO: Parse Reference length

        this.log("Parsed initials");

        return null;
    }

    /**
     * Parses the <ILLUMINATION> block.
     * @param {illumination block element} illuminationNode
     */
    parseIllumination(illuminationNode) {
        // TODO: Parse Illumination node

        this.log("Parsed illumination");

        return null;
    }

    /**
     * Parses the <TEXTURES> block.
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
        // TODO: Parse block

        console.log("Parsed textures");

        return null;
    }

    /**
     * Parses the <MATERIALS> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        // TODO: Parse block
        this.log("Parsed materials");
        return null;

    }

    /**
     * Parses the <NODES> block.
     * @param {nodes block element} nodesNode
     */
    parseNodes(nodesNode) {
        // TODO: Parse block
        this.log("Parsed nodes");
        return null;
    }

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
        // entry point for graph rendering
        //TODO: Render loop starting at root of graph
    }

    isValidFloat(attribute) {
        return !(attribute == null || isNaN(attribute));
    }
}
