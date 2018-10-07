class MyLeaf {
    constructor(graph, type, args) {

        this.graph = graph;
        this.type = type;
        this.args = args;

        this.primitive = null;

        switch (this.type) {
            case 'rectangle':
                this.primitive = new MyRectangle(this.graph.scene, this.args);
                break;

            case 'sphere':
                this.primitive = new MySphere(this.graph.scene, this.args);
                break;

            case 'cylinder':
                this.primitive = new MyCylinder(this.graph.scene, this.args);
                break;

            case 'triangle':
                this.primitive = new MyTriangle(this.graph.scene, this.args);
                break;
        }
    }

    display() {
        this.primitive.display();
    }

    updateTexCoords(sFactor, tFactor) {
        this.primitive.updateTexCoords(sFactor, tFactor);
    }
}