class Queue {
  #queue = {}
  #first = 0
  #end = 0
  // 实现一个删除时间复杂度为1的队列
  constructor(initialValue = []) {
    this.#queue = {
      ...initialValue
    }

    this.#end = initialValue.length
  }

  enqueue(data) {
    this.#queue[this.#end++] = data
    return this.#end
  }

  dequeue() {
    const data = this.#queue[this.#first++]
    return data
  }

  get size() {
    return this.#end - this.#first
  }

  peek() {
    return this.#queue[this.#first]
  }

  clear() {
    this.#queue = {}
    this.#end = 0
    this.#first = 0
  }

  isEmpty() {
    return this.#end - this.#first === 0
  }
}


module.exports = Queue
