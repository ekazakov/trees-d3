import React  from 'react';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import {
    deleteMin,
    heapFromArray, toBinaryTree,
} from '../BinaryHeap';
import { toHierarchy } from '../TreeFn';
import StaticTreeView from './StaticTreeView';

const buildTreeHierarchy = compose(
    toHierarchy,
    toBinaryTree,
);

const enhancer = compose(
    withState('heap', 'updater', (props) => {
        // debugger;
        return heapFromArray(props.data);
    }),
    withHandlers({
        deleteMin: (props) => () => {
            const { heap, updater } = props;
            deleteMin(heap);
            updater({ items: heap.items });
        }
    })
);

function BinaryHeap({ data, heap, deleteMin }) {
    const treeData = buildTreeHierarchy(heap);
    return (
        <div>
            <div>
                <h4>data</h4>
                <pre>{data.join(', ')}</pre>
                <div>
                    <button onClick={deleteMin}>Delete Min</button>
                </div>
            </div>
            <div>
                <h4>binary heap</h4>
                <pre>
                    {heap.items.join(', ')}
                </pre>
            </div>
            <div>
                <h4>tree</h4>
                <StaticTreeView data={treeData} width={600} height={500} />
            </div>
        </div>
    );
}

export default enhancer(BinaryHeap);