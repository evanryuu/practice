Promise.myAll = function (promises) {
  const arr = [];
  let current = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p).then((res) => {
        arr[i] = res;
        current++;
        if (current === promises.length) {
          resolve(arr);
        }
      }, reject);
    });
  });
};

Promise.myRace = function (promises) {
  let result = null;
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
};
const p1 = new Promise((resolve) => setTimeout(() => resolve("p1"), 500));
const p2 = new Promise((resolve) => setTimeout(() => resolve("p2"), 1500));
const p3 = new Promise((resolve) => setTimeout(() => resolve("p3"), 2500));
Promise.myRace([p1, p2, p3]).then(console.log);
Promise.myAll([p1, p2, p3]).then(console.log);
