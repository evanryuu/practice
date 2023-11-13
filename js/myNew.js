function myNew (constructor, ...args) {
  const obj = {}

  Object.setPrototypeOf(obj, constructor.prototype)

  const result = constructor.apply(obj, args)

  return result instanceof Object ? result : obj
}

function Person(name) {
  this.name = name
}

const p1 = new Person('Evan')
const p2 = myNew(Person, 'Evan')

console.log(p1)
console.log(p2)
