async function asyncPool(limit, array, callback) {
  const promises = []
  const pool = new Set()

  for (let i = 0; i < array.length; i++) {
    const p = Promise.resolve().then(() => callback(array[i]))
    promises.push(p)

    pool.add(p)
    const clean = () => pool.delete(p)

    p.then(clean, clean)

    if (pool.size >= limit) await Promise.race(pool)
  }

  return Promise.all(promises)
}
