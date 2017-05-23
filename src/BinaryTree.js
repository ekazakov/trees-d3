export default class BinaryTree {
    constructor({ value, parent, left, right } = {}) {
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }

    insertLeft(value) {
        const parent = this;
        const { left } = this;

        if (left) {
            this.left = new BinaryTree({ value, left, parent });
        } else {
            this.left = new BinaryTree({value, parent: this});
        }

        return this.left;
    }

    insertRight(value) {
        const parent = this;
        const { right } = this;

        if (right) {
            this.right = new BinaryTree({ value, right, parent });
        } else {
            this.right = new BinaryTree({ value, parent });
        }

        return this.right;
    }

    isLeaf() {
        return this.right == null && this.left == null;
    }
}