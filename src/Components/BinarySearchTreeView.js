import React  from 'react';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import {
    createBst,
    put,
    bstToHierarchy, arrayToBst,
} from '../binarySearchTree';
// import { toHierarchy } from '../TreeFn';
import StaticTreeView from './StaticTreeView';
import { iterate } from '../TreeFn';

const buildTreeHierarchy = compose(
    bstToHierarchy,
    arrayToBst,
);

// const enhancer = compose(
//     withState('heap', 'updater', (props) => {
//         // debugger;
//         return heapFromArray(props.data);
//     }),
//     withHandlers({
//         deleteMin: (props) => () => {
//             const { heap, updater } = props;
//             deleteMin(heap);
//             updater({ items: heap.items });
//         }
//     })
// );

function BinarySearchTreeView({ data }) {
    const treeData = buildTreeHierarchy(data);
    return (
        <div>
            <div>
                <h4>data</h4>
                <pre>{data.join(', ')}</pre>
                {/*<div>*/}
                    {/*<button onClick={deleteMin}>Delete Min</button>*/}
                {/*</div>*/}
            </div>
            <div>
                <h4>tree</h4>
                <StaticTreeView data={treeData} width={600} height={300} />
            </div>
            <div>
                <h4>iterate</h4>
                <pre>
                    {[...iterate(arrayToBst(data).root)].join(', ')}
                </pre>
            </div>
        </div>
    );
}

export default BinarySearchTreeView;