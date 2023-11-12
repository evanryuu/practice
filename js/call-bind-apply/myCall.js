Function.prototype.myCall = function(obj) {

  const s = Symbol('fn')
  obj[s] = this
  obj[s](...[...arguments].slice(1))
  delete obj[s]
}

const name = 'nihao'

const obj = {
  name: 'obj name',
  showName: function (age, gender) {
    console.log(this.name, 'age is ', age, ', gender is ', gender)
  }
}

const {showName} = obj
showName()
showName.call(obj, 18, 'male')
showName.myCall(obj, 18, 'male')
