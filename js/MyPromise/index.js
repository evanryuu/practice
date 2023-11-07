const MyPromise = require('./MyPromise')

const p1 = new MyPromise((resolve, reject) => {
  console.log('MyPromise!')
  resolve('Data')
})

const p2 = new MyPromise((resolve, reject) => {
  console.log('MyPromise!')
  setTimeout(() => {
    resolve('2000ms later Data')
  }, 2000)
})

p1.then((res) => {
  console.log('p1 then!', res)
  return new MyPromise((resolve) => {
    resolve('other')
  })
}).then((res) => {
  console.log('p1, return, ', res)
})

p2.then(console.log).then(() => {
  console.log('chain then')
  return new MyPromise((resolve) => {
    resolve('chain resolve')
  })
}).then((res) => {
  console.log('hello~~', res)
})
