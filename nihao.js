const heavyTask = async () => {
  // Promise.resolve().then(() => {
  return new Promise((resolve) => resolve()).then(() => {
    let str = "";
    for (let i = 0; i < 20 * 1000; i++) {
      str += "1";
    }
    console.log("heavy done");
  });

  // });
};

const task1 = async () => {
  console.log(1);
  await heavyTask();
  // ...
  console.log(3);
};

const task2 = () => {
  console.log("update dom");
};

task1();
task2();
