import React from 'react';
import { edges, iterate, prepareTree } from '../../TreeFn';
import classNames from 'classnames';
import { noop } from 'lodash';

export function Node({ x, y, value, balanceFactor, className = '' }) {
    return (
        <g className={classNames('node', className)} transform={`translate(${x}, ${y})`}>
            <circle className="node" r="10" />
            <text dy=".35em" textAnchor="middle">
                {value}
            </text>
            <text
                className="balance"
                transform={`translate(15, 0)`}
            >
                {balanceFactor}
                </text>
        </g>
    );
}

function diagonal({ from, to }) {
    return `M ${to.x},${to.y}
            C ${to.x},${(to.y + from.y) / 2}
              ${from.x},${(to.y + from.y) / 2}
              ${from.x},${from.y}`
        ;
}

export function Edge({ from, to }) {
    return <path className="link" d={diagonal({ from, to })} />;
}

export function Tree(props) {
    const {
        width,
        height,
        tree,
        visitor = noop,
    } = props;
    prepareTree(tree, width, height);
    const items = [...iterate(tree.root, (node) => node)];
    const _edges = edges(tree.root);

    return <svg width={width + 20} height={height + 20}>
        <g transform={`translate(${10}, ${10})`}>
            {_edges.map((item, key) => {
                return <Edge key={`edge-${key}`} {...item}/>
            })}
            {items.map((item, index) => {
                return <Node
                    key={`node-${index}`}
                    className={visitor(item, index)}
                    {...item}
                />;
            })}
        </g>
    </svg>;
}