async function getUser() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')

  return await res.json()
}

async function m1() {
  const user = await getUser()
  // other works
  return user
}

async function m2() {
  const user = await m1()
  // other works
  return user
}
async function m3() {
  const user = await m2()
  // other works
  return user
}
async function main() {
  const user = await m3()
  // other works
  console.log(user)
}

main()
