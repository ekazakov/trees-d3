import {
    createTree,
    insertLeft,
    insertRight,
} from './TreeFn';

const isLeftParen = (ch) => ch === '(';
const isRightParen = (ch) => ch === ')';
const isOp = (ch) => '+*-/'.includes(ch);
const isNumber = Number.isFinite;

export function createExpressionTree(tokens) {
    const tree = createTree();
    let current = tree;

    for (let token of tokens) {
        if (isLeftParen(token)) {
            current = insertLeft(current, token)
        } else if (isRightParen(token)) {
            current = current.parent;
        } else if (isOp(token)) {
            current.value = token;
            current = insertRight(current, null);
        } else if (isNumber(token)) {
            current.value = token;
            current = current.parent;
        } else {
            console.error('Unknown token:', token);
        }
    }

    return tree;
}