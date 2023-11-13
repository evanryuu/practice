Promise.myAll = function (...promises) {
  const arr = []
  let current = 0
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p).then((res) => {
        arr[i] = res
        current++
        if (current === promises.length) {
          resolve(arr)
        }
      }, reject)
    })
  })
}

Promise.myRace = function (...promises) {
  let result = null
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, reject)
    })
  })
}
