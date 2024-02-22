import { Schema } from 'prosemirror-model'

export const schema = new Schema({
  nodes: {
    doc: {
      content: 'tile+',
    },
    text: {
      group: 'inline',
    },
    block_tile: {
      content: 'block',
      group: 'tile',
      draggable: true,
      inline: false,
      toDOM: () => {
        const blockTile = document.createElement('div')
        blockTile.classList.add('block_tile')
        const handle = document.createElement('span')
        handle.classList.add('drag-handle')
        handle.innerHTML = '<i class="ri-draggable"></i>'
        blockTile.appendChild(handle)
        const content = document.createElement('div')
        blockTile.appendChild(content)
        return {
          dom: blockTile,
          contentDOM: content,
        }
      },
      parseDOM: [{ tag: 'div.block_tile' }],
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      toDOM: () => {
        return ['p', 0]
      },
      parseDOM: [{ tag: 'p' }],
    },
    heading: {
      attrs: {
        level: {
          default: 1,
        },
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      toDOM: (node) => {
        const tag = 'h' + node.attrs.level
        return [tag, 0]
      },
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
      ],
    },
    blockquote: {
      content: 'paragraph+',
      group: 'block',
      defining: true,
      isolating: true,
      toDOM: () => {
        return ['blockquote', 0]
      },
      parseDOM: [{ tag: 'blockquote' }],
    },
    datetime: {
      group: 'inline',
      inline: true,
      atom: true,
      attrs: {
        timestamp: {
          default: null,
        },
      },
      toDOM: (node) => {
        const dom = document.createElement('span')
        dom.classList.add('datetime')
        let time = ''

        if (node.attrs.timestamp) {
          const date = new Date(node.attrs.timestamp)
          time = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        }

        const label = document.createElement('label')
        label.innerText = '请选择时间: '
        const input = document.createElement('input')
        input.type = 'date'
        input.value = time

        input.addEventListener('input', (e: Event) => {
          dom.dataset.timestamp = new Date((e.target as HTMLInputElement).value).getTime().toString()
        })

        dom.appendChild(label)
        dom.appendChild(input)
        return {
          dom,
        }
      },
      parseDOM: [
        {
          tag: 'span.datetime',
          getAttrs: (node) => {
            if (typeof node !== 'string') {
              const timestamp = node.dataset.timestamp
              return {
                timestamp: timestamp ? Number(timestamp) : null,
              }
            }
            return {
              timestamp: null,
            }
          },
        },
      ],
    },
  },
  topNode: 'doc',
})
