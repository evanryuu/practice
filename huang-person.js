class Person {
  constructor(name) {
    this.tasks = [];
    this.tasks.push(() => console.log("我的名字"));
    this.executor();
  }
  executor() {
    if (this.tasks.length === 0) return;
    const task = this.tasks.shift();
    if (typeof task === "function") {
      task();
    }
    return this;
  }
  schedule(word, time) {
    this.tasks.push(() => {
      console.log(word);
    });
    setTimeout(() => this.executor(), time);
    return this;
  }
  sleep(time) {
    return this.schedule("sleep", time);
  }
  eat(time) {
    return this.schedule("eat", time);
  }
  run(time) {
    return this.schedule("run", time);
  }
}

const person = new Person("xiaoming");
person.eat(2000).sleep(1000).run(1500).sleep(500);
