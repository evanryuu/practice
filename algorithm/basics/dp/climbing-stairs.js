// 给定一个共有n阶的楼梯，你每步可以上1阶或者2阶，请问有多少种方案可以爬到楼顶。

// 分析：
// 我们仔细观察该问题。假设我们上到第i级台阶的方案为dp[i]的话，则由于每次只能上1/2级
// 所以dp[i] = dp[i - 1] + dp[i - 2]
// 那我们可以有简单的方案 climbingStairsDFS1

function climbingStairsDFS1(n) {
  function dfs(i) {
    if (i == 1 || i == 2) return i

    const count = dfs(i - 1) + dfs(i - 2)
    return count
  }
  return dfs(n)
}

// 但是这必然是有问题的，因为我们要遍历的实在是太多了
// 因此我们可以对已经遍历过的节点进行剪枝
function climbingStairsDFS2(n) {
  const res = []
  function dfs(i) {
    if (i == 1 || i == 2) return i
    let count = res[i]
    if (res[i] == null) {
      count = dfs(i - 1) + dfs(i - 2)
      res[i] = count
    }

    return count
  }
  return dfs(n)
}

// 前两种方法都是『从顶至底』的方法：从根节点开始，递归向下求解至最小问题
// 这里我们可以看一下动态规划的『从底至顶』的思想：从最小子问题开始，迭代构建更大子问题的解
function climbingStairsDP(n) {
  if (n === 1 || n === 2) return n;

  // 初始dp表，用于存储子问题的解
  const dp = new Array(n + 1).fill(-1)
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}
