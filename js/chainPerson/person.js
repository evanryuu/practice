class Person {
  constructor(name) {
    this.name = name;
    this.working = false;
    this.jobs = [];
  }
  trigger = async () => {
    this.working = true;
    const end = () =>
      new Promise((resolve) => {
        this.working = false;
        this.jobs.length = 0;
        resolve();
      });
    this.jobs.push(end);

    while (this.jobs.length) {
      if (!this.working) {
        const id = this.jobs.findIndex((v) => v === end);
        this.jobs.splice(id, 1);
        break;
      } else {
        await this.jobs.shift()();
      }
    }

    // 也可以reduce
    // this.jobs.reduce((prev, cur) => {
    //   return prev.then(cur);
    // }, Promise.resolve());
  };
  pause = () => {
    this.working = false;
  };
  schedule = (word, time) => {
    const p = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          if (this.working) {
            console.log(word);
            resolve();
          } else {
            this.jobs.unshift(p);
          }
        }, time);
      });
    this.jobs.push(p);

    if (!this.working) {
      this.working = true;
      setTimeout(() => {
        this.trigger();
      }, 0);
    }

    return this;
  };
  run = (time) => {
    return this.schedule(`run for ${time} ms`, time);
  };
  sleep = (time) => {
    return this.schedule(`sleep for ${time} ms`, time);
  };
  eat = (time) => {
    return this.schedule(`eat for ${time} ms`, time);
  };
  shout = (time) => {
    return this.schedule(this.name, time);
  };
}

// const xiaoming = new Person("xiaoming");
// xiaoming.shout().run(2000).eat(1500).sleep(3000).run(200);
