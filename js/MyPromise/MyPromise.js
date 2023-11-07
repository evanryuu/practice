// MyPromise.js

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// 新建 MyPromise 类
class MyPromise {
  /**
   * @param {(resolve: (value: any) => void, reject: (reason: any) => void) => void} executor 
   */
  constructor(executor) {
    this.state = PENDING
    this.value = null
    this.reason = null

    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch(err) {
      this.reject(err)
    }
  }
  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 更改成功后的状态
  resolve = (data) => {
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = data
      while (this.onResolvedCallbacks.length) {
        this.onResolvedCallbacks.shift()(this.value)
      }

    }
  }
  // 更改失败后的状态
  reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(this.reason)
      }
    }
  }
  then = (onResolved, onRejected) => {
    const p = new MyPromise((resolve, reject) => {
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => onResolved(this.value))
        this.onRejectedCallbacks.push(() => onRejected(this.reason))
      } else if (this.state === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onResolved(this.value)
            resolvePromise(p, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      } else {
        onRejected(this.reason)
      }
    })
    return p
  }
}

function resolvePromise(p, x, resolve, reject) {
  if (p === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise
