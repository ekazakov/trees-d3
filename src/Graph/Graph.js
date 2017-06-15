import {
    map,
    flatMap,
    forEach,
    identity,
    reduce,
    find,
    isEqual,
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

    isVerticesConnected(vertexA, vertexB) {
        const conds = [
            this.vertList[vertexA] && this.vertList[vertexA].hasNeighbor(vertexB),
            this.vertList[vertexB] && this.vertList[vertexB].hasNeighbor(vertexA),
        ];

        return conds.some(identity);
    }

    getNodesSet() {
        return map(this.vertList, (vertex) => vertex.toVisNode());
    }

    getEdgesSet() {
        return flatMap(this.vertList, (vertex) => {
            const connections = vertex.getConnections();
            const from = vertex.id;
            return map(connections, (connection) => ({ from, to: connection }))
        })
    }
}

export function buildGraph(words) {
    const buckets = {};
    const graph = new Graph();

    forEach(words, (word) => {
        map(word, (_, index) => {
            const pattern = word.slice(0, index) + '_' + word.slice(index + 1);
            if (pattern in buckets) {
                buckets[pattern].push(word);
            } else {
                buckets[pattern] = [word];
            }
        })
    });

    forEach(buckets, (bucket) => {
        forEach(bucket, (wordA) => {
            forEach(bucket, (wordB) => {
                //!graph.isVerticesConnected(wordA, wordB)
                if (wordA !== wordB) {
                    graph.addEdge(wordA, wordB);
                }
            })
        });
    });

    return graph;
}

export function filterEdges(edges) {
    function reverse(edge) {
        return { from: edge.to, to: edge.from };
    }

    function containsReversed(edges, edge) {
        const reversed = reverse(edge);
        return find(edges, isEqual.bind(null, reversed)) != null;
    }

    return reduce(edges, (newEdges, edge) => {
        if (!containsReversed(newEdges, edge)) {
            newEdges.push(edge);
        }

        return newEdges;
    }, []);
}

export function breadthFirstSearch(graph, start, end) {
    const queue = [graph.getVertex(start)];
    let isFound = false;
    while (queue.length > 0 && !isFound) {
        const currentVertex = queue.shift();

        for (let neighbourId of currentVertex.getConnections()){
            const neighbour = graph.getVertex(neighbourId);
            if (neighbour.color === 'white') {
                neighbour.color = 'gray';
                neighbour.distance = currentVertex.distance + 1;
                neighbour.predecessor = currentVertex;

                if (neighbourId === end) {
                    isFound = true;
                    break;
                }

                queue.push(neighbour);
            }
        }

        currentVertex.color = 'black';
    }
}

export function breadthFirstSearchIterator(graph, start, end) {
    const snapshots = [];
    const queue = [graph.getVertex(start)];
    let isFound = false;
    while (queue.length > 0 && !isFound) {
        const currentVertex = queue.shift();

        if (currentVertex.id === end) {
            snapshots.push({
                nodes: graph.getNodesSet().map((node) => {
                    if (node.id === currentVertex.id) {
                        node.color.background = 'red';
                    }
                    return node;
                }),
                edges: filterEdges(graph.getEdgesSet()),
            });
            break;
        }


        for (let neighbourId of currentVertex.getConnections()){
            const neighbour = graph.getVertex(neighbourId);
            if (neighbour.color === 'white') {
                neighbour.color = 'gray';
                neighbour.distance = currentVertex.distance + 1;
                neighbour.predecessor = currentVertex;

                // if (neighbourId === end) {
                //     isFound = true;
                //     break;
                // }

                queue.push(neighbour);
            }
        }

        currentVertex.color = 'black';

        snapshots.push({
            nodes: graph.getNodesSet().map((node) => {
                if (node.id === currentVertex.id) {
                    node.color.background = 'red';
                }
                return node;
            }),
            edges: filterEdges(graph.getEdgesSet()),
        });

    }

    return snapshots;
}

export function traverse(graph, key, callback) {
    let current = graph.getVertex(key);

    while (current.predecessor) {
        callback(current);
        current = current.predecessor;
    }

    callback(current);
}