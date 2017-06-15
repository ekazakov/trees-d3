import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ForceLayout from '../src/Components/ForceLayout';
import Graph, {
    breadthFirstSearch, breadthFirstSearchIterator, buildGraph, filterEdges,
    traverse
} from '../src/Graph/Graph';
import { times, map } from 'lodash';

const stories = storiesOf('Graphs', module);

function Map({ data, children, ...restProps }) {
    return <div {...restProps}>
        {data.map(children)}
    </div>;
}

stories.add('Simple graph', () => {
    const graph = new Graph();
    times(4, (n) => graph.addVertex(n));
    graph.addEdge(0, 1);
    graph.addEdge(1, 0);
    graph.addEdge(1, 3);
    graph.addEdge(2, 3);
    graph.addEdge(2, 0);
    console.log(graph);
    const edges = graph.getEdgesSet();
    console.log(edges);

/*    {from: 1, to: 3},
    {from: 2, to: 3},
    {from: 0, to: 1},
    {from: 2, to: 0},*/

    const nodes = graph.getNodesSet();

    return (
        <div>
            <ForceLayout
                width={400}
                height={330}
                nodes={nodes}
                edges={edges}
            />
        </div>
    );
});

stories.add('Word ladder', () => {
    const words = [
        'poll',
        'foul',
        'fool',
        'pool',
        'faul',
        'fail',
        'fall',
        'pall',
        'pole',
        'cool',
        'pope',
        'pale',
        'sale',
        'page',
        'sage',
    ];
    const data = [];
    const graph = buildGraph(words);
    data.push({
        nodes: graph.getNodesSet(),
        edges: filterEdges(graph.getEdgesSet()),
    });

    // breadthFirstSearch(graph, 'fool', 'sage');
    const snapshots = breadthFirstSearchIterator(graph, 'fool', 'sage');
    // for (let g of iterator) {
    //     data.push({
    //         nodes: g.getNodesSet(),
    //         edges: filterEdges(g.getEdgesSet()),
    //     });
    // }
    // traverse(graph, 'sage', (vertex) => { });

    // for (let i = 0; i < 1; i++) {
    //     data.push({
    //         nodes: graph.getNodesSet(),
    //         edges: filterEdges(graph.getEdgesSet()),
    //     });
    // }



    return <Map data={data.concat(snapshots)} className="Steps" >
        {({ nodes, edges }) => {
            return (
                <ForceLayout
                    className="Step"
                    width={600}
                    height={450}
                    nodes={nodes}
                    edges={edges}
                />
            );
        }}
    </Map>;
});