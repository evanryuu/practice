// 堆的长度为n，从节点i开始，从顶至底堆化
function siftDown(nums, n, i) {
  while (true) {
    // 记节点 i, l, r 中最大的节点，记为ma
    let l = 2 * i + 1
    let r = 2 * i + 2
    let ma = i
    if (l < n && nums[l] > nums[ma]) {
      ma = l
    }
    if (r < n && nums[r] > nums[ma]) {
      ma = r
    }
    // 若节点i最大，或者索引l、r越界，return
    if (ma === i) {
      break
    }
    [nums[i], nums[ma]] = [nums[ma], nums[i]]
    // 向下堆化
    i = ma
  }
}
