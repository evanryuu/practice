function limitConcurrency(tasks, concurrency) {
  let index = 0;
  const results = [];
  const executing = [];

  function runTask(task) {
    const taskIndex = index;
    index++;

    const promise = Promise.resolve()
      .then(() => task())
      .then(result => {
        results[taskIndex] = result;
      })
      .finally(() => {
        executing.splice(executing.indexOf(promise), 1);
        runNextTask();
      });

    executing.push(promise);
  }

  function runNextTask() {
    if (index < tasks.length) {
      runTask(tasks[index]);
    }

    if (index === tasks.length && executing.length === 0) {
      // 所有任务完成，返回所有结果
      return Promise.resolve(results);
    }
  }

  // 启动初始的任务
  while (index < concurrency && index < tasks.length) {
    runTask(tasks[index]);
  }

  // 返回一个 Promise，该 Promise 在所有任务完成后被解析
  return runNextTask();
}

// 示例用法
function asyncTask(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Task ${id} completed`);
      resolve(`Result from Task ${id}`);
    }, 1000);
  });
}

const tasksToRun = [
  () => asyncTask(1),
  () => asyncTask(2),
  () => asyncTask(3),
  () => asyncTask(4),
  () => asyncTask(5),
];

// 控制并发数为2
limitConcurrency(tasksToRun, 2)
  .then(results => {
    console.log("All tasks completed:", results);
  })
  .catch(error => {
    console.error("Error:", error);
  });
