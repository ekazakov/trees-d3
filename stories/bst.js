import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
    cloneDeep,
} from 'lodash';
import {
    createBst,
    arrayToBst,
    put,
    get, findSuccessor, findNode, remove,
} from '../src/binarySearchTree';
import { Tree } from '../src/Components/Tree/Tree';

function Map({ data, children, ...restProps }) {
    return <div {...restProps}>
        {data.map(children)}
    </div>;
}

const width = 400;
const height = 200;

storiesOf('BST', module)
    .add('put', () => {
        const tree = createBst();
        const data = [7, 22, 45, 5, 8, 32, 9, 11, 16, 7, 2, 31];

        return <Map data={data} className="Steps">
            {(datum, index) => {
                put(tree, datum, datum);
                const treeCopy = cloneDeep(tree);

                return <div className="Step">
                    <Tree
                        key={index}
                        tree={treeCopy}
                        width={width}
                        height={height}
                    />
                </div>
            }}
        </Map>
    })
    .add('get', () => {
        const tree = arrayToBst([7, 22, 45, 5, 8, 32]);
        const foundKey = get(tree, 8);
        const visitor = (node) => (foundKey === node.key ? 'found' : '');

        return <Tree
            tree={tree}
            width={width}
            height={height}
            visitor={visitor}
        />
    })
    .add('findSuccessor', () => {
        const tree = arrayToBst([ 17, 5, 35, 29, 38, 2, 11, 9, 7, 8, 16]);
        const data = [17, 5, 35, 11]; //

        return <Map data={data} className="Steps">
            {(datum, index) => {
                const foundNode = findSuccessor(findNode(tree, datum));
                console.log('datum:', datum, 'foundNode:', foundNode);
                const visitor = (node) => (foundNode === node ? 'found' : '');
                return <div className="Step" key={index}>
                    <div>
                        Successor for: {datum}
                    </div>
                    <Tree
                        tree={tree}
                        width={width}
                        height={height}
                        visitor={visitor}
                    />
                </div>
            }}
        </Map>
    })
    .add('remove', () => {
        const tree = arrayToBst([ 17, 5, 35, 29, 38, 2, 11, 9, 7, 8, 16, 31]);
        const itemsToRemove = [null, 5, 35, 17, 11, 16];

        return <Map data={itemsToRemove} className="Steps">
            {(datum, index) => {
                if (datum != null) {
                    remove(tree, datum);
                }

                return <div className="Step" key={index}>
                    {datum != null && <div>Remove: {datum} </div>}
                    <Tree
                        tree={cloneDeep(tree)}
                        width={width}
                        height={height}
                    />
                </div>
            }}
        </Map>

    })
;
