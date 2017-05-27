import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BinaryTreeAnimationScene from '../src/Components/BinaryTreeAnimationScene';
import ExpressionParseTree from '../src/ExpressionParseTree';
import BinaryHeapView from '../src/Components/BinaryHeapView';
import BinarySearchTreeView from '../src/Components/BinarySearchTreeView';
import {
    times,
    shuffle,
} from 'lodash';

storiesOf('Trees', module)
    .add('Step by step animation', () => <BinaryTreeAnimationScene />)
    .add('Expression parse tree', () => <ExpressionParseTree/> )
    .add('Binary Heap', () =>
        <BinaryHeapView data={[43, 53, 24, 54, 20, 19, 8, 4, 9, 2]} />
    )
    .add('Random Binary Heap', () =>
        <BinaryHeapView data={shuffle(times(14))} />
    )
    .add('Binary Search Tree', () =>
        <BinarySearchTreeView data={[17, 5, 2, 16, 35, 38, 29, 33, 19]} />
    )
    .add('Left BST', () =>
        <BinarySearchTreeView data={[1,2,3,4,5,6,7,8,9,10]} />
    )
    .add('Right BST', () =>
        <BinarySearchTreeView data={[10,9,8,7,6,5,4,3,2,1]} />
    )
    .add('random BST', () =>
        <BinarySearchTreeView data={shuffle(times(14))} />
    )
;