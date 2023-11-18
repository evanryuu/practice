const ArrayQueue = require('./arr')
const NodeQueue = require('./node')

// const queue = new ArrayQueue(10)
const queue = new NodeQueue(10)

queue.pushFirst(0)
queue.pushFirst(1)
queue.pushLast(2)
console.log(queue.peekFirst())
console.log(queue.popFirst());
console.log(queue.peekFirst())
console.log(queue.popFirst());
console.log(queue.peekFirst())
console.log(queue.popFirst());


