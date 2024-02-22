import './style.css'
import { setupEditor } from './view'
import 'remixicon/fonts/remixicon.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
<h3>从第一个 prosemirror 案例开始认识它</h3>
<div id="editorContainer"></div>
</div>
`

setupEditor(document.querySelector('#editorContainer'))
