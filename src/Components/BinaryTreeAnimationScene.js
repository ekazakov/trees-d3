import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import BinaryTree from '../BinaryTree';
import BinaryTreeView from './BinaryTreeView';

function * treeGenerator() {
    const treeData = new BinaryTree({ value: 0 });
    yield treeData;

    const childB = treeData.insertLeft(1);
    yield treeData;

    const childE = treeData.insertRight(4);
    yield treeData;

    childB.insertLeft(2);
    yield treeData;

    childB.insertRight(3);
    yield treeData;

    childE.insertLeft(5);
    yield treeData;

    childE.insertRight(6);
    yield treeData;
}

export default class BinaryTreeAnimationScene extends React.Component {
    state = { treeData: null };

    componentDidMount() {
        this.iterator = treeGenerator();

        const { value: treeData, done } = this.iterator.next();
        if (!done) {
            this.setState({
                treeData: treeData
            });
        }
    }

    onStepOver = () => {
        console.log('On step over');
        const { value: treeData, done } = this.iterator.next();
        if (!done) {
            this.setState({
                treeData: cloneDeep(treeData)
            });
        }
    };

    render() {
        return <div>
            <BinaryTreeView
                width={500}
                height={500}
                treeData={this.state.treeData}
                onStepOver={this.onStepOver}
            />
        </div>;
    }
}
