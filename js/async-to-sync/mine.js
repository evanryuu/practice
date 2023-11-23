const syncFetch = (url) => {

}

function getUser() {
  const user = fetch('https://jsonplaceholder.typicode.com/todos/1')
  return user

}

function m1() {
  const user = getUser()
  // other works
  return user
}

function m2() {
  const user = m1()
  // other works
  return user
}
function m3() {
  const user = m2()
  // other works
  return user
}
function main() {
  const user = m3()
  // other works
  console.log(user)
}

function run(func) {
  const cache = {
    state: 'pending',
    value: null,
    reason: null
  }
  // 如果没有的话，修改fetch方法
  const oldFetch = fetch
  globalThis.fetch = function(...args) {
    // 查询缓存，有的话则返回
    if (cache.state === 'fulfilled') {
      return cache.value
    } else if (cache.state === 'rejected') {
      return cache.reason
    }
    const p = oldFetch(...args).then(async (res) => {
      const data = await res.json()
      cache.state = 'fulfilled'
      cache.value = data
    }, err => {
      cache.state = 'rejected'
      cache.reason = err
    })
    throw p
  }
  // 请求结束之后，给cache赋值，并把fetch恢复
  try {
    func()
  } catch(err) {
    if (err instanceof Promise) {
      err.finally(() => {
        func()
        globalThis.fetch = oldFetch
      })
    }
  }
}

run(main)
