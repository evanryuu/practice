class Person {
  constructor(name) {
    this.name = name
    this.jobs = []
    this.working = false
  }

  trigger() {
    if (!this.jobs.length) return Promise.resolve()
  
    const end = () => new Promise((resolve) => {
      this.jobs.length = 0
      resolve()
    })
    this.jobs.push(end)

    return this.jobs.reduce((prev, cur) => {
      return prev.then(cur)
    }, Promise.resolve())
  }

  schedule(word, duration = 0) {
    const p = () => new Promise((resolve) => {
      setTimeout(() => {
        console.log(word)
        resolve()
      }, duration)
    })

    this.jobs.push(p)

    if (!this.working) {
      this.working = true
      setTimeout(() => {
        this.trigger()
      }, 0)
    }

    return this
  }

  sayName() {
    return this.schedule(`My name is ${this.name}`)
  }

  eat(duration) {
    return this.schedule(`Eat for ${duration} ms`, duration)
  }
  sleep(duration) {
    return this.schedule(`Sleep for ${duration} ms`, duration)
  }
  jog(duration) {
    return this.schedule(`Jog for ${duration} ms`, duration)
  }

}


const person = new Person('Evan')
person.sayName().eat(2000).jog(3000).sleep(500).eat(2000).jog(650)
