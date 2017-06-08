import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ForceLayout from '../src/Components/ForceLayout';
import Graph from '../src/Graph/Graph';
import { times } from 'lodash';

const stories = storiesOf('Graphs', module);

stories.add('Force Layout', () => {
    const graph = new Graph();
    times(4, (n) => graph.addVertex(n));
    graph.addEdge(0, 1);
    // graph.addEdge(1, 0);
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