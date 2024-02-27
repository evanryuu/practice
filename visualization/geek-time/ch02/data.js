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

  draw(context, root)
  console.log('root', root)
}
const TAU = 2 * Math.PI

function draw(ctx, node, { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white' } = {}) {
  const children = node.children
  const { x, y, r } = node
  ctx.fillStyle = fillStyle
  ctx.beginPath()
  ctx.arc(x, y, r, 0, TAU)
  ctx.fill()
  if (children) {
    for (let i = 0; i < children.length; i++) {
      draw(ctx, children[i])
    }
  } else {
    const name = node.data.name
    ctx.fillStyle = textColor
    ctx.font = '1.5rem Arial'
    ctx.textAlign = 'center'
    ctx.fillText(name, x, y)
  }
}
