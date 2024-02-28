import { addEvent, init } from './data'
import './style.css'

document.querySelector('#app').innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="42" cy="42" r="40" stroke="black"
  stroke-width="2" fill="orange" />
</svg>
`

init()
addEvent()
