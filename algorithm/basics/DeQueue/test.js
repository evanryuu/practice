const ArrayQueue = require('./arr')

const arrQueue = new ArrayQueue(10)

arrQueue.pushFirst(0)
arrQueue.pushFirst(1)
arrQueue.pushLast(2)
console.log(arrQueue.peekFirst())
console.log(arrQueue.popFirst());
console.log(arrQueue.peekFirst())
console.log(arrQueue.popFirst());
console.log(arrQueue.peekFirst())
console.log(arrQueue.popFirst());
