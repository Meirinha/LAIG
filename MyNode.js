
function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    this.children = [];

    this.leaves = [];

    this.materialref = null ;

    this.textureref = null ;

    this.transformationMatrix = mat4.create();
    mat4.identity(this.transformationMatrix);
}

/**
 * Adds the reference (ID) of another node
 */
MyGraphNode.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf
 */
MyGraphNode.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}
