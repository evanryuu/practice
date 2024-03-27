const PENDING = "PENDING";
const REJECTED = "REJECTED";
const FULFILLED = "FULFILLED";

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.data = null;
    this.reason = null;
    this.onfulfilledCallbacks = [];
    executor(this.resolve, this.reject);
  }
  resolve = (data) => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.data = data;

      while (this.onfulfilledCallbacks.length) {
        this.onfulfilledCallbacks.shift()(this.data);
      }
      return;
    }
  };
  reject = (reason) => {};
  then = (onfulfilled) => {
    const p = new MyPromise((resolve) => {
      if (this.state === PENDING) {
        this.onfulfilledCallbacks.push(onfulfilled);
      } else {
        resolve(onfulfilled(this.data));
      }
    });

    return p;
  };
}

new MyPromise((resolve) => {
  console.log(1);
  setTimeout(() => {
    resolve(2);
  }, 2000);
})
  .then((data) => {
    console.log(data);
    return new MyPromise((resolve) => {
      resolve(3);
    });
  })
  .then((data) => console.log(data));
