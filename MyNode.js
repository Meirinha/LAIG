class MyNode {
    constructor(graph, nodeID) {
        this.graph = graph;

        this.nodeID = nodeID;

        this.children = [];

        this.leaves = [];

        this.materialref = null;

        this.textureref = null;

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

}