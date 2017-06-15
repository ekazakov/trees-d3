import vis from 'vis';
import 'vis/dist/vis.css';
import React, { Component } from 'react';

const options = {
    layout: {
        randomSeed: 598617
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
            to: { scaleFactor: 0.5 },
            from: { scaleFactor: 0.5 },

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
    // static defaultProps = {
    //     edges,
    //     nodes,
    // };

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
        const { width, height, className } = this.props;
        const style = {
            width,
            height,
            border: '1px solid #323232',
        };

        return <div style={style} className={className} ref={this._ref} />;
    }
}