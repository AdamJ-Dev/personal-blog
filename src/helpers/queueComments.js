import {Node, Queue, queueToArray} from "./queue"

/* 
We can assume comments are received ordered by creation date. This
means that no parent comment can ever precede a child, which will
justify the use of some of our below logic.
*/

const getSiblingsDictionary = (comments) => {
    const siblings = {};

    for (let comment of comments) {
        siblings[comment.id] = new Queue();
    }

    for (let comment of comments) {
        if (comment.parentId) siblings[comment.parentId].enqueue(new Node(comment));
    }

    return siblings
} 

const unravelThread = (comment, siblingsDictionary, threadHistory) => {
    let thread = new Queue({ queue: threadHistory });
    thread.enqueue(new Node(comment));
    
    const childrenQueue = siblingsDictionary[comment.id];

    while (childrenQueue.length) { 
        thread = new Queue({ queue: unravelThread(childrenQueue.head.val, siblingsDictionary, thread) });
        childrenQueue.dequeue(); 
    }

    return thread;
}

export const orderComments = (comments) => {
    const commentSection = new Queue();
    const depthZeroComments = new Queue();
    const siblingsDictionary = getSiblingsDictionary(comments);

    for (let comment of comments) {
        if (comment.depth === 0) depthZeroComments.enqueue(new Node(comment));
    }

    while (depthZeroComments.length) {
        const depthZeroComment = depthZeroComments.head.val;
        const depthZeroCommentThread = unravelThread(depthZeroComment, siblingsDictionary, new Queue());
        commentSection.concat(depthZeroCommentThread);
        depthZeroComments.dequeue();
    }
    
    return queueToArray(commentSection);
}
