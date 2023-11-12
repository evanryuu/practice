Function.prototype.myBind = function (context) {
  //返回一个绑定this的函数，我们需要在此保存this
  let self = this
  // 可以支持柯里化传参，保存参数
  let arg = [...arguments].slice(1)
  // 返回一个函数
  return function () {
    //同样因为支持柯里化形式传参我们需要再次获取存储参数
    let newArg = [...arguments]
    console.log(newArg)
    // 返回函数绑定this，传入两次保存的参数
    //考虑返回函数有返回值做了return
    return self.apply(context, arg.concat(newArg))
  }
}

var name = 'nihao'

const obj = {
  name: 'obj name',
  showName: function (age, gender) {
    console.log(this.name, 'age is ', age, ', gender is ', gender)
  }
}
