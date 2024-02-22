import { Schema } from 'prosemirror-model'
export const schema = new Schema({
  nodes: {
    doc: {
      content: 'tile+',
    },
    block_tile: {
      content: 'block+',
      group: 'tile',
      inline: false,
      toDOM: () => {
        return ['div', { class: 'block_tile' }, 0]
      },
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      toDOM: () => {
        return ['p', 0]
      },
    },
    heading: {
      attrs: {
        level: {
          default: 1,
        },
      },
      content: 'inline*',
      group: 'block',
      toDOM: (node) => {
        const tag = 'h' + node.attrs.level
        return [tag, 0]
      },
    },
    text: {
      group: 'inline',
    },
  },
  topNode: 'doc',
})
