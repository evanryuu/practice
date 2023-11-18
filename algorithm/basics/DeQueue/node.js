class NodeDeque {
  #capacity = 0
  #first = null
  #rear = null
  #queueSize = 0
  constructor(capacity) {
    this.#capacity = capacity
  }

  get capacity() {
    return this.#capacity
  }

  get size() {
    return this.#queueSize
  }

  pushFirst(data) {
    if (this.size === this.capacity) return undefined

    const node = new ListNode(data)
  
    if (this.size === 0) {
      this.#first = node
      this.#rear = node
    } else {
      this.#first.prev = node
      node.next = this.#first
      this.#first = node
    }

    this.#queueSize++
  }

  pushLast(data) {
    if (this.size === this.capacity) return

    const node = new ListNode(data)
    if (this.size === 0) {
      this.#first = node
      this.#rear = node
    } else {
      this.#rear.next = node
      node.prev = this.#rear
      this.#rear = node
    }

    this.#queueSize++
  }

  popFirst() {
    if (this.size === 0) return
    const next = this.#first.next
    const val = this.#first.val
    if (next !== null) {
      next.prev = null;
      this.#first.next = null;
  }
    this.#first = next
    this.#queueSize--
    return val
  }

  popLast() {
    if (this.size === 0) return
    const val = this.#rear.val
    const prev = this.#rear.prev

    if (prev !== null) {
      prev.next = null
      this.#rear.prev = null
    }
    this.#rear = prev
    this.#queueSize--
    return val
  }

  peekFirst() {
    if (this.size === 0) return
    return this.#first.val
  }

  peekLast() {
    if (this.size === 0) return
    return this.#rear.val
  }
}

class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
} 

module.exports = NodeDeque
