import {
    map,
    flatMap,
} from 'lodash';
import Vertex from './Vertex';
export default class Graph {
    constructor() {
        this.vertList = {};
        this.numVertices = 0;
    }

    addVertex(key) {
        this.numVertices++;
        const newVertex = new Vertex(key);
        this.vertList[key] = newVertex;

        return newVertex;
    }

    getVertex(key) {
        return this.vertList[key];
    }

    addEdge(from, to, weight = 0) {
        if (!this.vertList[from]) {
            this.addVertex(from);
        }

        if (!this.vertList[to]) {
            this.addVertex(to);
        }

        this.vertList[from].addNeighbor(this.vertList[to].id, weight)
    }

    getVertices() {
        return Object.keys(this.vertList);
    }

    getValues() {
        return Object.values(this.vertList);
    }

    getNodesSet() {
        return map(this.vertList, (vertex) => ({ id: vertex.id, label: ` ${vertex.id} ` }));
    }

    getEdgesSet() {
        return flatMap(this.vertList, (vertex) => {
            const connections = vertex.getConnections();
            const from = vertex.id;
            return map(connections, (connection) => ({ from, to: connection }))
        })
    }
}