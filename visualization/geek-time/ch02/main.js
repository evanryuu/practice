import { init } from './data'
import './style.css'
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const rectSize = [100, 100]
context.fillStyle = 'teal'
// 法1：
// context.rect(0.5 * (canvas.width - rectSize[0]), 0.5 * (canvas.height - rectSize[1]), ...rectSize)
// 法2
context.save()
context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1])
context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize)
// context.translate(0.5 * rectSize[0], 0.5 * rectSize[1])
context.fill()
// context.restore()

init(context)
