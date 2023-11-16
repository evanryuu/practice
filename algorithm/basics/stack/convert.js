const Stack = require('./stack')

function convert(num, dec) {
  let stack = new Stack()
  let base = '0123456789abcdef'
  let res = ''

  while (num > 0) {
    stack.push(num % dec)
    num = Math.floor(num / dec)
  }

  while (stack.size) {
    res += base.charAt(stack.pop())
  }

  return res
}

console.log(convert(50, 2))
console.log(convert(50, 8))
console.log(convert(500, 16))

module.exports = {
  convert
}
