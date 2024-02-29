function memoFactory() {
  const cache = new WeakMap();
  return (func) => {
    let map = cache.get(func);
    // 取出缓存中的方法
    if (!map) {
      cache.set(func, (map = new Map()));
    }
    return async (...rest) => {
      // 找出对应参数的缓存
      let data = map.get(JSON.stringify(rest));
      if (!data) {
        data = await func(...rest);
        map.set(JSON.stringify(rest), data);
      }
      return data;
    };
  };
}

const memory = memoFactory();

function add(a, b) {
  return new Promise((resolve) => {
    console.log("request");
    resolve(a + b);
  });
}

function sub(a, b) {
  return new Promise((resolve) => {
    console.log("request");
    resolve(a - b);
  });
}

async function init() {
  console.log(await memory(add)(1, 2)); // request
  console.log(await memory(add)(3, 4)); // request
  console.log(await memory(add)(1, 2)); //
  console.log(await memory(sub)(1, 2)); // request
  console.log(await memory(sub)(2, 1)); // request
  console.log(await memory(sub)(1, 2)); //
  console.log(await memory(sub)(2, 1)); //
}

init();
