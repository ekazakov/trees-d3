import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
    arrayToAvl, createAvl,
    put, rotateLeft, rotateRight,
} from '../src/avlTree';
import { Tree } from '../src/Components/Tree/Tree';
import { cloneDeep } from 'lodash';

function Map({ data, children, ...restProps }) {
    return <div {...restProps}>
        {data.map(children)}
    </div>;
}

const width = 400;
const height = 200;

storiesOf('AVL Tree', module)
    .add('put', () => {
        // const trees = [
        //     arrayToAvl([18, 11, 10]),
        //     arrayToAvl([18, 20, 11, 10]),
        //     arrayToAvl([18, 20, 22, 11, 10]),
        //     arrayToAvl([18, 20, 22, 11, 10, 12]),
        //     arrayToAvl([18, 20, 22, 11, 10, 12, 9]),
        //     arrayToAvl([18, 20, 22, 11, 10, 12, 9, 8, 7, 6]),
        // ];
        const tree = createAvl();
        const data = [18, 20, 22, 24, 23, 25, 28, 29, 30]; //25, 28, 29

        return <Map data={data} className="Steps">
            {(datum, index) => {
                if (datum === 23) {
                    debugger;
                }
                put(tree, datum, datum);
                const treeCopy = cloneDeep(tree);
                return <div className="Step" key={index}>
                    <div>balance: {treeCopy.root.balanceFactor}</div>
                    <Tree
                        tree={treeCopy}
                        width={width}
                        height={height}
                    />
                </div>
            }}
        </Map>
    })
    .add('left rotation', () => {
        const trees = [
            arrayToAvl([10, 12, 14]),
            arrayToAvl([10, 12, 14, 11]),
            arrayToAvl([10, 12, 14, 11, 16]),
            arrayToAvl([10, 12, 14, 11, 16, 17, 18]),
            arrayToAvl([10, 12, 14, 11, 8]),
            arrayToAvl([10, 12, 11]),
        ];

        return <Map data={trees} className="Steps">
            {(tree, index) => {
                const treeCopy = cloneDeep(tree);
                rotateLeft(treeCopy.root);
                return <div key={index} style={{ display: 'flex' }}>
                    <div className="Step">
                        <Tree
                            tree={tree}
                            width={width}
                            height={height}
                        />
                    </div>
                    <div className="Step">
                        <Tree
                            tree={treeCopy}
                            width={width}
                            height={height}
                        />
                    </div>
                </div>
            }}
        </Map>
    })
    .add('right rotation', () => {
        const trees = [
            arrayToAvl([14, 12, 10]),
            arrayToAvl([14, 12, 10, 16, 9]),
            arrayToAvl([14, 12, 10, 13, 16, 9]),
            arrayToAvl([14, 12, 13 ]),
        ];

        return <Map data={trees} className="Steps">
            {(tree, index) => {
                const treeCopy = cloneDeep(tree);
                rotateRight(treeCopy.root);
                return <div key={index} style={{ display: 'flex' }}>
                    <div className="Step">
                        <Tree
                            tree={tree}
                            width={width}
                            height={height}
                        />
                    </div>
                    <div className="Step">
                        <Tree
                            tree={treeCopy}
                            width={width}
                            height={height}
                        />
                    </div>
                </div>
            }}
        </Map>;
    })
;
