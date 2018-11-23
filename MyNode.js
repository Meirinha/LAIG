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
        this.currAnimation = 0;
        this.texS = 1.0;
        this.texT = 1.0;

        this.time = 0;
        this.currentSection = 0;

        this.transformationMatrix = mat4.create();
        mat4.identity(this.transformationMatrix);

        this.animationMatrix = mat4.create();
        mat4.identity(this.animationMatrix);
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

    assignFirstAni(){ //Assigns first animation in array
        if(this.animations.length == 0) this.hasAnimation = false;
        else {
        this.currentAnimation = this.animations[0];
        this.hasAnimation = true;
        }
    }

    updateAnimation(deltaT){

      this.time += deltaT/1000;
      if(this.currAnimation < this.animations.length){
        this.animationMatrix =  this.graph.scene.animations[this.currentAnimation].getTransformationMatrix(this.time);
        if(this.time >= this.graph.scene.animations[this.currentAnimation].duration){
          this.time = 0;
          this.currAnimation++;
        }
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
