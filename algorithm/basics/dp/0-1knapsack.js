function knapsackDP(wgt, val, cap) {
  // dp[n][cap]
  // 第i个物品,wgt[i - 1], val[i - 1]
  // dp[i][c] = 前i个物品在剩余容量为c时的最大价值
  // dp[i][c] = Math.max(dp[i - 1][c], dp[i][c - wgt[i - 1]] + val[i - 1]) // 不放入更大还是放入更大
  const n = wgt.length
  const dp = Array(n + 1).fill(0).map(() => Array(cap + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let c = 1; c <= cap; c++) {
      if (wgt[i] > c) {
        // 当前重量如果大于剩余重量的话则跳过
        dp[i][c] = dp[i - 1][c]
        continue
      }
      // 不放入更大还是放入更大
      dp[i][c] = Math.max(
        dp[i - 1][c],
        dp[i][c - wgt[i - 1]] + val[i - 1]
      )
    }
  }

  return dp[n][cap]
}
