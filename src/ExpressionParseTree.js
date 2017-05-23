import React  from 'react';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import { tokenizeExpression } from './TokenizeExpression';
import { createExpressionTree } from './CreateExpressionTree';
import {
    stringify,
    toHierarchy,
} from './TreeFn';
import StaticTreeView from './Components/StaticTreeView';

const enhancer = compose(
    withState('expr', 'updater', '(((2*3)+((3-2)*(8+11)))-4)'),
    withHandlers({
        onChange: ({ updater }) => ({ target: { value }}) => updater(value)
    })
);

const inputStyle = {
    fontSize: 20,
    width: 400,
    textAlign: 'center',
    padding: 5,
    fontFamily: 'sans-serif',
};

const buttonStyle = {
    borderRadius: 3,
    border: 'none',
    padding: 5,
    marginLeft: 10,
};

const buildTreeHierarchy = compose(
    toHierarchy,
    createExpressionTree,
    tokenizeExpression,
);

function ExpressionParseTree({ expr, onChange }) {
    const treeData = buildTreeHierarchy(expr);

    return (
        <div>
            <div>
                <input
                    style={inputStyle}
                    type="text"
                    onChange={onChange}
                    value={expr}
                />
                {/*<button style={buttonStyle}>Parse</button>*/}
            </div>
            <div>
                <h4>tokens</h4>
                <pre>
                    {tokenizeExpression(expr).join('|')}
                </pre>
            </div>
            <div>
                <h4>tree</h4>
                <StaticTreeView data={treeData} width={600} height={500} />
            </div>
        </div>
    );
}

export default enhancer(ExpressionParseTree);