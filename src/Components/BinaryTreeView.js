import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import find from 'lodash/find';

import '../index.css';

window.d3 = d3;

const margin = { top: 20, right: 20, bottom: 230, left: 20 };
const duration = 750;

function diagonal({ source: s, target: t }) {
    return `M ${t.x},${t.y}
            C ${t.x},${(t.y + s.y) / 2}
              ${s.x},${(t.y + s.y) / 2}
              ${s.x},${s.y}`
        ;
}

function drawNodes(svg, nodes, onStepOver) {
    const node = svg
        .selectAll('g.node')
        .data(nodes, (d) => d.id)
    ;

    const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('id', (d) => d.id)
        .attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        })
    ;

    // Add Circle for the nodes
    nodeEnter
        .append('circle')
        .attr('class', 'node')
        .attr('r', 1)
        .style('fill', '#fff')
    ;

    nodeEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .text((d) => d.data.value)
    ;

    // UPDATE
    const nodeUpdate = nodeEnter.merge(node);

    let transitionCounter  = 0;
    nodeUpdate
        .transition()
        .on('end', () => {
            transitionCounter++;

            if (nodes.length === transitionCounter) {
                onStepOver();
            }
        })
        .duration(duration)
        .attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        })
    ;

    nodeUpdate
        .select('circle.node')
        .transition()
        .duration(duration)
        .attr('r', 15)
    ;

}

function drawLinks(svg, links, prevNodes) {
    const link = svg
        .selectAll('path.link')
        .data(links, (d) => d.id || `${d.source.id}-${d.target.id}`)
    ;

    const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', (d) => {
            // console.log(find(prevNodes, { id: d.source.id }));
            return diagonal({
                source: find(prevNodes, { id: d.source.id }),
                target: d.target,
            });
        });

    // UPDATE
    const linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate
        .transition()
        .on('end', () => {})
        .duration(duration)
        .attr('d', diagonal)
    ;
}

function convertTreeToHierarchy(treeData) {
    return d3.hierarchy(treeData, (d) => {
        const children = [];
        if (d.left) children.push(d.left);
        if (d.right) children.push(d.right);

        return children.length > 0 ? children : null
    });
}

function stringifyTree(tree) {
    const replacer = (key, value) => {
        if (key === 'parent') {
            return;
        }

        return value;
    };

    return JSON.stringify(tree, replacer, '\t');
}

function update(tree, prevTree, svg, onStepOver) {
    console.log('---------------------------------');

    const nodes = tree.descendants();
    nodes.forEach((d) => {
        d.y = d.depth * 80;
        d.id = d.data.value;
    });

    const links = tree.links();
    let prevNodes;
    if (prevTree) {
        prevTree
            .descendants()
            .forEach((d) => {
                d.y = d.depth * 80;
                d.id = d.data.value;
            })
        ;

        prevNodes = prevTree.descendants();
    }

    drawLinks(svg, links, prevNodes);
    drawNodes(svg, nodes, onStepOver);
}

export default class BinaryTreeView extends Component {
    static propTypes = {
        treeData: PropTypes.object,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    };

    _ref = (node) => {
        this.node = node;
    };

    componentDidMount() {
        const {
            width,
            height,
            treeData,
        } = this.props;
        this.svg = d3
            .select(this.node)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        ;

        const diagramHeight = height - margin.top - margin.bottom;
        const diagramWidth = width - margin.left - margin.right;
        this.treemap = d3
            .tree()
            .size([diagramHeight, diagramWidth])
        ;

        if (!treeData) {
            return;
        }

        const root = convertTreeToHierarchy(treeData);
        const tree = this.treemap(root);

        update(tree, null, this.svg, this.props.onStepOver);
    }

    componentWillUpdate(nextProps) {
        const { treeData } = nextProps;
        const { treeData: prevTreeData } = this.props;

        if (!treeData) {
            return;
        }

        const root = convertTreeToHierarchy(treeData);
        const tree = this.treemap(root);

        let prevTree;
        if (prevTreeData) {
            prevTree = this.treemap(convertTreeToHierarchy(prevTreeData));
        }

        update(tree, prevTree, this.svg, this.props.onStepOver);
    }

    render() {
        return <div ref={this._ref}></div>;
    }
}