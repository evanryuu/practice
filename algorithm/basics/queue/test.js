const Queue = require('./queue')

const queue = new Queue([1, 2, 3])

console.log('init', queue.size)
console.log('first', queue.peek())
console.log('dequeue', queue.dequeue())
console.log('dequeue', queue.dequeue())
console.log('dequeue', queue.dequeue())
console.log('dequeue', queue.isEmpty())
queue.enqueue(4)
console.log('enqueue', queue, queue.size)
console.log('isEmpty?', queue.isEmpty())
queue.clear()
console.log('isEmpty?', queue.isEmpty())
