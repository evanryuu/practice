class DEQueue {
  #arr = []
  #first = 0
  #queueSize = 0
  constructor(capacity = 0) {
    this.#arr = new Array(capacity)
    this.#queueSize = 0
  }

  /**
   * 当前存放的元素量
   */
  get size() {
    return this.#queueSize
  }

  /**
   * 该队列总容量
   */
  get capacity() {
    return this.#arr.length
  }

  /* 计算环形数组索引 */
  index(i) {
    // 通过取余操作实现数组首尾相连
    // 当 i 越过数组尾部后，回到头部
    // 当 i 越过数组头部后，回到尾部
    return (i + this.capacity) % this.capacity;
  }

  pushFirst(data) {
    if (this.size === this.capacity) return

    this.#first = this.index(this.#first - 1)
    this.#arr[this.#first] = data
    this.#queueSize++
    return this.#queueSize
  }

  pushLast(data) {
    if (this.size === this.capacity) return

    const last = this.index(this.#first + this.#queueSize)
    this.#arr[last] = data
    this.#queueSize++
    return this.#queueSize
  }

  popFirst() {
    if (this.size === 0) return undefined

    const data = this.#arr[this.#first]
    this.#first = this.index(this.#first + 1)
    this.#queueSize--
    return data
  }

  popLast() {
    if (this.size === 0) return undefined

    const last = this.index(this.#first + this.#queueSize - 1)
    const data = this.#arr[last]
    this.#queueSize--
    return data
  }

  peekFirst() {
    return this.#arr[this.#first]
  }

  peekLast() {
    const last = this.index(this.#first + this.#queueSize - 1)

    return this.#arr[last]
  }

  toArray() {
    const res = []
    for (let i = 0, j = this.#first; i < this.#queueSize.length; i++, j++) {
      res[i] = this.#arr[this.index(j)]
    }

    return res
  }
}

module.exports = DEQueue
