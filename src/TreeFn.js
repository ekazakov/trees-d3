import { hierarchy } from 'd3';
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


export function * iterate(node) {
    if (node) {
        if (node.left) {
            yield * iterate(node.left);
        }

        yield node.key;

        if (node.right) {
            yield * iterate(node.right);
        }
    }
}

export function treeHeight(node) {
    if (!node) return;

    if (node.left) {
        return
    }
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

function traversePreorder(tree, cb) {
    if (!tree) {
        return;
    }

    cb(tree);
    traversePreorder(tree.left, cb);
    traversePreorder(tree.right, cb);
}

export function toHierarchy(tree) {
    return hierarchy(tree, (data) => {
        const children = [];
        if (data.left) children.push(data.left);
        if (data.right) children.push(data.right);

        return children.length > 0 ? children : null
    })
}