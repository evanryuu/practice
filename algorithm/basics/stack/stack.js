class Stack {
  constructor(arr = []) {
    this.stack = arr
  }

  get size() {
    return this.stack.length
  }

  push(...data) {
    for (let i = 0; i < data.length; i++) {
      this.stack.push(data[i])
    }

    return this.stack
  }

  pop() {
    return this.stack.pop()
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }

  isEmpty() {
    return this.stack.length ? false : true
  }

  clear() {
    try {
      this.stack.length = 0
      return true
    } catch(_err) {
      return false
    }
  }

}

// const stack = new Stack()
// stack.push('1')
// stack.push(2)
// stack.push(true)
// console.log('after pushed', stack, stack.size)
// console.log('popped', stack.pop())
// console.log('peek', stack.peek(), stack.size)
// console.log('isEmpty?', stack.isEmpty(), stack.size)
// stack.clear()
// console.log('isEmpty?', stack.isEmpty(), stack.size)

module.exports = Stack
