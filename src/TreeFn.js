import { hierarchy } from 'd3';
import { compact } from 'lodash';
export function createTree(params = {}) {
    return params;
}

function insertBranch(branch) {
    return (tree, value) => {
        const parent = tree;
        if (tree[branch]) {
            const newBranch = tree[branch];
            tree[branch] = createTree({ value, parent, [branch]: newBranch });
        } else {
            tree[branch] = createTree({ value, parent });
        }

        return tree[branch];
    }
}

export const insertLeft = insertBranch('left');
export const insertRight = insertBranch('right');
export const isLeaf = (tree) => !tree.left && !tree.right;
export const isRoot = (tree) => tree.parent == null;
export const hasAnyChildren = (tree) => tree.left || tree.right;
export const hasBothChildren = (tree) => tree.left && tree.right;

export const isLeftChild = (tree) => tree.parent != null && tree.parent.left === tree;
export const isRightChild = (tree) => tree.parent != null && tree.parent.right === tree;
export const isChild = (tree) => tree.parent != null && tree.parent.left === tree;

export const updateData = (tree, params = {}) => {
    Object.assign(tree, params);

    if (tree.left) {
        tree.left.parent = tree;
    }

    if (tree.right) {
        tree.right.parent = tree;
    }
};


export function * iterate(node, fn = (node) => node.key) {
    if (node) {
        if (node.left) {
            yield * iterate(node.left, fn);
        }

        yield fn(node);

        if (node.right) {
            yield * iterate(node.right, fn);
        }
    }
}

export function treeHeight(node) {
    if (!node) return -1;

    return Math.max(
        treeHeight(node.left),
        treeHeight(node.right)
    ) + 1;
}

export function stringify(tree) {
    return JSON.stringify(
        tree,
        (key, value) => {
            if(key !== 'parent') {
                return value;
            }
        },
        '  '
    );
}

export function edges(tree) {
    return compact([...iterate(tree, (node) => {
        if (node.parent) {
            return { from: node.parent, to: node }
        }
    })])
}

// function traversePreorder(tree, cb) {
//     if (!tree) {
//         return;
//     }
//
//     cb(tree);
//     traversePreorder(tree.left, cb);
//     traversePreorder(tree.right, cb);
// }

export function toHierarchy(tree) {
    return hierarchy(tree, (data) => {
        const children = [];
        if (data.left) children.push(data.left);
        if (data.right) children.push(data.right);

        return children.length > 0 ? children : null
    })
}

export function prepareTree(tree, width, height) {
    const levelHeight = height / (treeHeight(tree.root) || 1);

    addTreeViewData(tree.root, 0, width);

    function addTreeViewData(tree, from, to, depth = 0) {
        tree.depth = depth;
        tree.height = treeHeight(tree);
        tree.x = (from + to) / 2;
        tree.y = levelHeight * depth;

        if (tree.left) {
            addTreeViewData(tree.left, from, (from + to) / 2, depth + 1);
        }

        if (tree.right) {
            addTreeViewData(tree.right, (from + to) / 2, to, depth + 1);
        }
    }
}
