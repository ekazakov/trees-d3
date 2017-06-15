export default class Vertex {
    constructor(key) {
        this.id = key;
        this.connectedTo = {};
        this.color = 'white';
        this.distance = 0;
        this.predecessor = null;
    }

    addNeighbor(neighbor, weight = 0) {
        this.connectedTo[neighbor] = weight;
    }

    hasNeighbor(neighbor) {
        return this.connectedTo[neighbor] != null;
    }

    getConnections() {
        return Object.keys(this.connectedTo);
    }

    getWeight(neighbor) {
        return this.connectedTo[neighbor];
    }

    toVisNode() {
        const { id, color, distance } = this;
        return {
            id,
            color: {
                background: color,
            },
            font: {
                color: (color === 'black' ? 'white' : 'black')
            },
            label: ` ${id} (${distance}) `,
        }
    }
}