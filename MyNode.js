class MyNode {
    constructor(graph, nodeID) {
        this.graph = graph;

        this.nodeID = nodeID;

        this.children = [];

        this.leaves = [];

        this.materialref = null;
        this.materialRefList = [];
        this.textureref = null;

        this.animations = [];
        this.currentAnimation;
        this.texS = 1.0;
        this.texT = 1.0;

        this.transformationMatrix = mat4.create();
        mat4.identity(this.transformationMatrix);
    }

    /**
     * Adds the reference (ID) of another node
     */
    addChild(nodeID) {
        this.children.push(nodeID);
    }

    /**
     * Adds a leaf
     */
    addLeaf(leaf) {
        this.leaves.push(leaf);
    }

    assignFirstMat() { //Assigns first material in array
        for (var mat in this.materialRefList) {
            this.materialref = this.materialRefList[mat];
            break;
        }
    }

    assignFirstAnimation(){ //Assigns first animation in array
        if(this.animations.length == 0) this.hasAnimation = false;
        else {
        this.animation = this.animations[0];
        this.hasAnimation = true;
        }
    }

    nextMaterial() {
        let flag = false;
        for (var mate in this.materialRefList) {
            if (this.materialref == this.materialRefList[mate])
                flag = true;
            else if (flag) {
                this.materialref = this.materialRefList[mate];
                flag = false;
                break;
            }
        }
        if (flag)
            this.assignFirstMat();
    }
}