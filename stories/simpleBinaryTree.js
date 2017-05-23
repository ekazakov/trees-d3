import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BinaryTreeAnimationScene from '../src/Components/BinaryTreeAnimationScene';
import ExpressionParseTree from '../src/ExpressionParseTree';
import BinaryHeapView from '../src/Components/BinaryHeapView';
import BinarySearchTreeView from '../src/Components/BinarySearchTreeView';

storiesOf('Trees', module)
    .add('Step by step animation', () => <BinaryTreeAnimationScene />)
    .add('Expression parse tree', () => <ExpressionParseTree/> )
    .add('Binary Heap', () =>
        <BinaryHeapView data={[43, 53, 24, 54, 20, 19, 8, 4, 9, 2]} />
    )
    .add('Binary Search Tree', () =>
        <BinarySearchTreeView data={[17, 5, 2, 16, 35, 38, 29, 33, 19]} />
    )
;