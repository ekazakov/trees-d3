import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {
    times,
    shuffle,
    flowRight,
    cloneDeep,
} from 'lodash';
import StaticTreeView from '../src/Components/StaticTreeView';
import {
    createBst,
    arrayToBst,
    bstToHierarchy, put,
} from '../src/binarySearchTree';

const buildTreeHierarchy = flowRight(
    bstToHierarchy,
    arrayToBst,
);


function inorder(tree, depth) {

}

storiesOf('BST', module)
    .add('foo', () => {
        const data = [7, 22, 45, 5, 8, 32, 9, 11, 16, 7, 2];
        const treeData = buildTreeHierarchy(data);
        console.log(treeData);
        return <div>

        </div>;
    })
    .add('put', () => {
        const tree = createBst();
        const data = [7, 22, 45, 5, 8, 32, 9, 11, 16, 7, 2];

        const items = data.map((datum, index) => {
            put(tree, datum, datum);
            const treeData = bstToHierarchy(cloneDeep(tree));
            return <div className="Step">
                <StaticTreeView
                    key={index}
                    data={treeData}
                    width={200}
                    height={200}
                />
            </div>
        });

        return <div className="Steps">
            {items}
        </div>
    })

;