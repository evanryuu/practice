const MyPromise = require('./MyPromise1')

const p = new MyPromise((resolve, reject) => {
  console.log('init')
  // setTimeout(() => {
  //   resolve('2000ms later, settimeout resolve')
  // }, 2000)'
  resolve('haha')
})

p.then((res) => {
  console.log('first then', res)
  return new MyPromise((resolve) => {
    console.log('hello')
    resolve(' world')
  })
}).then((res) => {
  console.log('second then', res)
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve('2000ms later')
    }, 2000)
  })
}).then(console.log)
