export default class Vertex {
    constructor(key) {
        this.id = key;
        this.connectedTo = {};
    }

    addNeighbor(neighbor, weight = 0) {
        this.connectedTo[neighbor] = weight;
    }

    getConnections() {
        return Object.keys(this.connectedTo);
    }

    getWeight(neighbor) {
        return this.connectedTo[neighbor];
    }
}