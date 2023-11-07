const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  /**
   * @param {(resolve: (data: unknown) => void, reject: (reason: unknown) => void) => void} executor 
   */
  constructor(executor) {
    this.state = PENDING
    this.value = null
    this.reason = null

    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    executor(this.resolve, this.reject)
  }

  resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value

      while (this.onResolvedCallbacks.length) {
        this.onResolvedCallbacks.shift()(value)
      }
    }
  }

  reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason

      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then = (onResolved, onRejected) => {
    const p = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        // 如果返回的也是Promise，则需要进行resolve
        const x = onResolved(this.value)
        resolvePromise(x, resolve, reject)
      } else if (this.state === REJECTED) {
        return onRejected(this.reason)
      } else {
        this.onResolvedCallbacks.push(onResolved)
        this.onRejectedCallbacks.push(onRejected)
      }
    })

    return p
  }

}

function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise
