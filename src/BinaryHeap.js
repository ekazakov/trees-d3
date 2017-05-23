import { createTree, insertLeft, insertRight } from './TreeFn';
export const createHeap = () => ({ items: [0] });

export const percolateUp = (heap, initialIndex) => {
    const { items } = heap;
    let index = initialIndex;

    while (index > 0) {
        const parentIndex = Math.floor(index / 2);
        const parent = items[parentIndex];
        const child = items[index];

        if (parent > child) {
            items[parentIndex] = child;
            items[index] = parent;
        }

        index = parentIndex;
    }
};

export const percolateDown = (heap, initialIndex) => {
    const { items } = heap;
    let index = initialIndex;

    while(index * 2 < items.length) {
        const minIndex = minChildIndex(heap, index);

        if (items[index] > items[minIndex]) {
            const tmp = items[index];
            items[index] = items[minIndex];
            items[minIndex] = tmp;
        }

        index = minIndex;
    }
};

function minChildIndex(heap, index) {
    const { items } = heap;

    if (index * 2 + 1 >= items.length) {
        return index * 2;
    }

    if (items[index * 2 + 1] > items[index * 2]) {
        return index * 2;
    }

    return index * 2 + 1;
}

export const insert = (heap, value) => {
    heap.items.push(value);
    percolateUp(heap, heap.items.length - 1);
};

export const deleteMin = (heap) => {
    const first = heap.items[1];
    heap.items[1] = heap.items[heap.items.length - 1];
    heap.items.pop();
    percolateDown(heap, 1);
    return first;
};


export const toBinaryTree = (heap) => {
    const items = heap.items;
    const tree = createTree({
        value: heap.items[1]
    });

    function append(tree, index) {
        if (2 * index < items.length) {
            insertLeft(tree, items[2 * index]);
            append(tree.left, 2 * index);
        }

        if (2 * index + 1 < items.length) {
            insertRight(tree, items[2 * index + 1]);
            append(tree.right, 2 * index + 1);
        }
    }

    append(tree, 1);

    return tree;
};

export const heapFromArray = (items) => {
    const heap = createHeap();
    heap.items = heap.items.concat(items);
    // items.forEach(item => insert(heap, item));
    let index = Math.floor(items.length / 2);

    while (index > 0) {
        percolateDown(heap, index);
        index--;
    }

    return heap;
};