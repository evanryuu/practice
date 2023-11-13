class ConcurrentController {
  constructor(max) {
    this.max = max
    this.stack = []
  }
  // add
  add = (urls) => {
    if (!Array.isArray(urls)) {
      urls = [urls]
    }

    this.stack.push(...urls.map((url) => () => fetch(url)))

    return this
  }
  // 进行触发
  trigger = () => {
    return new Promise((resolve) => {
      if (!this.stack.length) return resolve([])
      const result = []
      let current = 0
      const len = Math.min(this.stack.length, this.max)
      const total = this.stack.length
      const request = async () => {
        if (!this.stack.length) return
        const req = this.stack.shift()
        const res = await req()
        result[current++] = res
        if (current === total) {
          resolve(result)
        }
        request()
      }
      for (let i = 0; i < len; i++) {
        request()
      }
    })
  }
}

