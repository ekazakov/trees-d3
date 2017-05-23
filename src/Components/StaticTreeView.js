import React, { Component } from 'react';
import * as d3 from 'd3';

function diagonal({ source: s, target: t }) {
    return `M ${t.x},${t.y}
            C ${t.x},${(t.y + s.y) / 2}
              ${s.x},${(t.y + s.y) / 2}
              ${s.x},${s.y}`
        ;
}

const margin = { top: 20, right: 20, bottom: 20, left: 20 };

export default class StaticTreeView extends Component {
    _ref = (node) => {
        this._node = node
    };

    componentDidMount() {
        const {
            width,
            height,
            data,
        } = this.props;

        this._svg = d3
            .select(this._node)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        ;

        const diagramHeight = height - margin.top - margin.bottom;
        const diagramWidth = width - margin.left - margin.right;
        this._treeLayout = d3
            .tree()
            .size([diagramWidth, diagramHeight])
        ;
        this._renderTree(data);
    }

    _renderTree(data) {
        if (!data) {
            return;
        }

        this._svg
            .select('g.container')
            .remove()
        ;

        const container = this._svg
            .append('g')
            .attr('class', 'container')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        ;

        const tree = this._treeLayout(data);
        const nodes = tree.descendants();
        const links = tree.links();
        const node = container
            .selectAll('g.node')
            .data(nodes)
        ;

        const nodeEnter = node
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d) => `translate(${d.x},${d.y})`)
        ;

        nodeEnter
            .append('circle')
            .attr('class', 'node')
            .attr('r', 15)
            .style('fill', '#fff')
        ;

        nodeEnter
            .append('text')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .text((d) => d.data.value)
        ;

        const link = container
            .selectAll('path.link')
            .data(links)
        ;

        const linkEnter = link
            .enter()
            .insert('path', 'g')
            .attr('class', 'link')
            .attr('d', diagonal);


    }

    componentDidUpdate() {
        const { data } = this.props;

        this._renderTree(data);
    }

    render() {
        return (
            <div ref={this._ref}></div>
        );
    }
}