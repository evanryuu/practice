import * as d3 from 'd3'
const dataSource = 'https://s5.ssl.qhres2.com/static/b0695e2dd30daa64.json'
export async function init(context) {
  const data = await (await fetch(dataSource)).json()
  console.log('data', data)
  // d3.hierarchy(data).sum(…).sort(…) 将省份数据按照包含城市的数量，从多到少排序
  const regions = d3
    .hierarchy(data)
    .sum((d) => 1)
    .sort((a, b) => b.value - a.value)

  /**
   * 假设，我们要将它们展现在一个画布宽高为 1600 * 1600 的 Canvas 中
   * 那我们可以通过 d3.pack() 将数据映射为一组 1600 宽高范围内的圆形。
   * 不过，为了展示得美观一些，在每个相邻的圆之间我们还保留 3 个像素的 padding
   * （按照经验，我们一般是保留 3 个像素 padding 的，但这也要根据实际的设计需求来更改）。
   */
  const pack = d3.pack().size([800, 800]).padding(3)

  const root = pack(regions)

  draw(document.querySelector('svg'), root)
}
const TAU = 2 * Math.PI

function draw(parent, node, { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white' } = {}) {
  // const { x, y, r, children } = node
  // const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  // circle.setAttribute('cx', x)
  // circle.setAttribute('cy', y)
  // circle.setAttribute('r', r)
  // circle.setAttribute('fill', fillStyle)
  // parent.appendChild(circle)
  // if (children) {
  //   const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  //   for (let i = 0; i < children.length; i++) {
  //     draw(group, children[i], { fillStyle, textColor })
  //   }
  //   parent.appendChild(group)

  const { x, y, r, children } = node

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('cx', x)
  circle.setAttribute('cy', y)
  circle.setAttribute('r', r)
  circle.setAttribute('fill', fillStyle)
  circle.setAttribute('data-name', node.data.name)
  parent.appendChild(circle)

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      draw(group, children[i], { fillStyle, textColor })
      group.setAttribute('data-name', node.data.name)
      parent.appendChild(group)
    }
  } else {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('fill', textColor)
    text.setAttribute('font-family', 'Arial')
    text.setAttribute('font-size', '1.5rem')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('x', x)
    text.setAttribute('y', y)
    const name = node.data.name
    text.textContent = name
    parent.appendChild(text)
  }
}

export function addEvent(root) {
  root = root || document.querySelector('svg')
  let activeTarget = null
  root.addEventListener('mousemove', (evt) => {
    let target = evt.target
    if (target.nodeName === 'text') target = target.parentNode
    if (activeTarget !== target) {
      if (activeTarget) {
        activeTarget.setAttribute('fill', 'rgba(0, 0, 0, 0.2)')
      }
    }
    target.setAttribute('fill', 'rgba(0, 128, 0, 0.1)')
    document.querySelector('#title').innerText = getTitle(target)
    activeTarget = target
  })
}

function getTitle(target) {
  const name = target.getAttribute('data-name')
  if (target.parentNode && target.parentNode.nodeName === 'g') {
    const parentName = target.parentNode.getAttribute('data-name')
    return `${parentName}-${name}`
  }
  return name
}
