import {
    createTree, hasAnyChildren,
    hasBothChildren,
    isLeaf,
    isLeftChild,
    isRightChild,
    toHierarchy,
    updateData,
} from './TreeFn';

export const createBst = () => ({
    root: null,
    size: 0
});

const _put = (tree, key, value) => {
    if (tree.key > key) {
        if (tree.left) {
            _put(tree.left, key, value);
        } else {
            tree.left = createTree({ key, value, parent: tree });
        }
    } else if (tree.key < key) {
        if (tree.right) {
            _put(tree.right, key, value);
        } else {
            tree.right = createTree({ key, value, parent: tree });
        }
    } else {
        tree.value = value;
    }
};

export const put = (tree, key, value) => {
    if (tree.root) {
        _put(tree.root, key, value);
    } else {
        tree.root = createTree({ key, value })
    }
    tree.size++;
};

const _get = (tree, key) => {
    if (!tree) {
        return null;
    }

    if (tree.key > key) {
        return _get(tree.left, key);
    } else if (tree.key < key) {
        return _get(tree.right, key);
    }

    return tree;
};

export const get = (tree, key) => {
    if (tree.root) {
        const result = _get(tree.root, key);

        if (result) {
            return result.value;
        }
    }

    return null;
};

const findMinChild = (node) => {
    let current = node;
    while (current.left) {
        current = current.left;
    }

    return current;
};

const findSuccessor = (node) => {
    let successor;

    if (node.right) {
        successor = findMinChild(node.right);
    } else {
        if (node.parent) {
            if (isLeftChild(node)) {
                successor = node.parent;
            } else {
                node.parent.right = null;
                findSuccessor(node.parent);
                node.parent.right = node;
            }
        }
    }

    return successor;
};

const spliceOut = (node) => {
    if (isLeaf(node)) {
        if (node.parent.left === node) {
            node.parent.left = null;
        } else {
            node.parent.right = null;
        }
    } else if (hasAnyChildren(node)){
        if (node.left) {
            node.left.parent = node.parent;
            if (isLeftChild(node)) {
                node.parent.left = node.left;
            } else if (isRightChild(node)) {
                node.parent.right = node.left;
            }
        } else {
            node.right.parent = node.parent;
            if (isLeftChild(node)) {
                node.parent.left = node.right;
            } else if (isRightChild(node)) {
                node.parent.right = node.right;
            }
        }
    }
};


const _remove = (tree, node) => {
    if (isLeaf(node)) {
        if (node.parent.left === node) {
            node.parent.left = null;
        } else {
            node.parent.right = null;
        }
    } else if (hasBothChildren(node)) {
        const successor = findSuccessor(node);
        spliceOut(successor);
        node.key = successor.key;
        node.value = successor.value;
    } else {
        if (node.left) {
            if (isLeftChild(node)) {
                node.left.parent = node.parent;
                node.parent.left = node.left;
            } else if (isRightChild(node)) {
                node.left.parent = node.parent;
                node.parent.right = node.left;
            } else {
                updateData(node, node.left)
            }
        } else {
            if (isLeftChild(node)) {
                node.right.parent = node.parent;
                node.parent.left = node.right;
            } else if (isRightChild(node)) {
                node.right.parent = node.parent;
                node.parent.right = node.right;
            } else {
                updateData(node, node.right)
            }
        }
    }
};

export const remove = (tree, key) => {
    if (tree.size > 1) {
        const node = _get(tree.root, key);

        if (node) {
            _remove(tree, node);
            tree.size--;
        } else {
            throw Error()
        }
    } else if (tree.size === 1 && tree.root.key === key) {
        tree.root = null;
        tree.size--;
    } else {
        throw Error('Key not in the tree');
    }
};

export const bstToHierarchy = (tree) => {
    return toHierarchy(tree.root);
};

export const arrayToBst = (data) => {
    const tree = createBst();
    data.forEach((item) => {
       put(tree, item, item);
    });

    return tree;
};