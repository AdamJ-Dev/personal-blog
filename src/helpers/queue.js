export class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

export class Queue {
    constructor({node, queue}={}) {
        if (queue) {
            this.head = queue.head;
            this.tail = queue.tail;
            this.length = queue.length;
        } else if (node) {
            this.head = node;
            this.tail = node;
            this.length = 1;
        } else {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
        
    }

    enqueue(node) {
        if (this.length === 0) this.head = this.tail = node;
        else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    dequeue() {
        if (this.length === 1) this.head = this.tail = null;
        if (this.length > 1) this.head = this.head.next ;
        this.length--;
    }

    concat(queue) {
        if (queue.length) {
            if (!this.length) this.head = queue.head
            else this.tail.next = queue.head
            this.tail = queue.tail
        }
        this.length += queue.length
        return this
    }
}

export const queueToArray = (queue) => {
    const queueCopy = new Queue({ queue })
    const arr = []
    while (queueCopy.length) {
        arr.push(queueCopy.head.val)
        queueCopy.dequeue()
    }
    return arr
}
