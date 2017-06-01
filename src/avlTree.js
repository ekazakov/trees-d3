import { arrayToBst, createBst } from './binarySearchTree';
import { createTree, isLeftChild, isRightChild, isRoot } from './TreeFn';

export function createAvl(...args) {
    return createBst(...args);
}

function rebalance(node) {
    if (node.balanceFactor < 0) {
        if (node.right && node.right.balanceFactor > 0) {
            rotateRight(node.right);
        }
        rotateLeft(node);
    } else if (node.balanceFactor > 0) {
        if (node.left && node.left.balanceFactor < 0) {
            rotateLeft(node.left);
        }
        rotateRight(node);
    }
}

function updateBalance(node) {
    if (node.balanceFactor > 1 || node.balanceFactor < -1) {
        rebalance(node);
        return;
    }

    if (node.parent) {
        if (isLeftChild(node)) {
            node.parent.balanceFactor += 1;
        } else if (isRightChild(node)) {
            node.parent.balanceFactor -= 1;
        }

        if (node.parent.balanceFactor !== 0) {
            updateBalance(node.parent);
        }
    }
}

function _put(tree, key, value) {
    if (tree.key > key) {
        if (tree.left) {
            _put(tree.left, key, value);
        } else {
            tree.left = createTree({ key, value, parent: tree, balanceFactor: 0 });
            updateBalance(tree.left);
        }
    } else if (tree.key < key) {
        if (tree.right) {
            _put(tree.right, key, value);
        } else {
            tree.right = createTree({ key, value, parent: tree, balanceFactor: 0 });
            updateBalance(tree.right)
        }
    } else {
        tree.value = value;
    }
}

export function put(tree, key, value) {
    if (tree.root) {
        _put(tree.root, key, value);
    } else {
        tree.root = createTree({ key, value, balanceFactor: 0 });
        tree.root.avl = tree;
    }

    tree.size++;
}

export function rotateLeft(rotRoot) {
    const newRoot = rotRoot.right;
    rotRoot.right = newRoot.left;

    if (newRoot.left) {
        newRoot.left.parent = rotRoot;
    }

    newRoot.parent = rotRoot.parent;

    if (isRoot(rotRoot)) {
        rotRoot.avl.root = newRoot;
        newRoot.avl = rotRoot.avl;
        delete rotRoot.avl;
    } else {
        if (isLeftChild(rotRoot)) {
            rotRoot.parent.left = newRoot;
        } else {
            rotRoot.parent.right = newRoot;
        }
    }

    newRoot.left = rotRoot;
    rotRoot.parent = newRoot;

    rotRoot.balanceFactor = rotRoot.balanceFactor + 1 - Math.min(newRoot.balanceFactor, 0);
    newRoot.balanceFactor = newRoot.balanceFactor + 1 + Math.max(rotRoot.balanceFactor, 0);
}

export function rotateRight(rotRoot) {
    const newRoot = rotRoot.left;
    rotRoot.left = newRoot.right;

    if (newRoot.right) {
        newRoot.right.parent = rotRoot;
    }

    newRoot.parent = rotRoot.parent;

    if (isRoot(rotRoot)) {
        rotRoot.avl.root = newRoot;
        newRoot.avl = rotRoot.avl;
        delete rotRoot.avl;
    } else {
        if (isLeftChild(rotRoot)) {
            rotRoot.parent.left = newRoot;
        } else {
            rotRoot.parent.right = newRoot;
        }
    }

    newRoot.right = rotRoot;
    rotRoot.parent = newRoot;

    rotRoot.balanceFactor = rotRoot.balanceFactor - 1 - Math.max(newRoot.balanceFactor, 0);
    newRoot.balanceFactor = newRoot.balanceFactor - 1 + Math.min(rotRoot.balanceFactor, 0);
}

export const arrayToAvl = (data) => {
    const tree = createAvl();
    data.forEach((item) => {
        put(tree, item, item);
    });

    return tree;
};