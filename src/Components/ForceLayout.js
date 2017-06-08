import vis from 'vis';
import 'vis/dist/vis.css';
import React, { Component } from 'react';

const nodes = new vis.DataSet([
    {
        id: 1, label: 'Node 1',
        color: {
            border: 'red'
        }
    },
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
]);

// create an array with edges
const edges = new vis.DataSet([
    // {from: 1, to: 3},
    // {from: 2, to: 3},
    // {from: 0, to: 1},
    // {from: 2, to: 0},
]);

const options = {
    layout: {
        randomSeed: 634765
    },
    nodes: {
        borderWidth: 1,
        size: 30,
        shape: 'circle',
        color: {
            border: '#222222',
            background: '#eee'
        },
        font: {
            color:'#333',
            size: 14
        }
    },
    edges: {
        arrows: {
            to: true
        },
        color: {
            color: '#222'
        }
    },
    interaction: {
        dragNodes: false,
        dragView: false,
        selectable: false,
        selectConnectedEdges: false,
        tooltipDelay: 300,
        zoomView: false
    }
};

export default class ForceLayout extends Component {
    static defaultProps = {
        edges,
        nodes,
    };

    componentDidMount() {
        const { nodes, edges } = this.props;
        const data = { nodes, edges };

        this._network = new vis.Network(this._mountPoint, data, options);
        console.log('Seed:', this._network.getSeed());
    }

    componentDidUpdate() {
        const { nodes, edges } = this.props;
        this._network.setData({ nodes, edges })
    }


    _ref = (mountPoint) => {
        this._mountPoint = mountPoint;
    };

    render() {
        const { width, height } = this.props;
        const style = {
            width,
            height,
            border: '1px solid #323232',
        };

        return <div style={style} ref={this._ref} />;
    }
}