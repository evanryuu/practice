import { Schema } from 'prosemirror-model'

export const old_schema = new Schema({
  nodes: {
    doc: {
      content: 'tile+',
    },
    text: {
      group: 'inline',
    },
    block_tile: {
      inline: false,
      content: 'block',
      group: 'tile',
      toDOM: () => {
        // return ['div', { class: 'block_tile' }, 0]
        const blockTile = document.createElement('div')
        blockTile.classList.add('block_tile')
        // 返回一个对象，dom 代表当前要转换成的 html
        // contentDOM 代表子节点应该填充在哪个 dom 元素里，这里就直接填充在 blockTile 中
        // 这种方法语义化清晰，但通过还是通过 上面数组的方式来定义
        // 如果当前节点不需要子节点填充，contentDOM 可以不填，此时也可以直接 return blockTile
        return {
          dom: blockTile,
          contentDOM: blockTile,
        }
      },
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      toDOM: () => {
        return ['p', 0]
      },
      parseDOM: [
        {
          tag: 'p',
        },
      ],
    },
    heading: {
      attrs: {
        level: {
          default: 1,
        },
      },
      content: 'inline*',
      group: 'block',
      // defining: 特殊属性，为 true 代表如果在当前标签内（以 h1 为例），全选内容，直接粘贴新的内容后，这些内容还会被 h1 标签包裹
      // 如果为 false, 整个 h1 标签（包括内容与标签本身）将会被替换为其他内容，删除亦如此。
      // 还有其他的特殊属性，后续细说
      defining: true,
      toDOM(node) {
        const tag = `h${node.attrs.level}`
        return [tag, 0]
      },
      // 从别处复制进来的富文本内容，根据标签序列化为当前 heading 节点，并填充对应的 level 属性
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
      ],
    },
    code: {
      group: 'block',
      content: 'inline*',
      toDOM(_node) {
        return ['code', 0]
      },
      parseDOM: [{ tag: 'code' }],
    },
    // 除了上面定义 node 节点，一些富文本样式，可以通过 marks 定义
    marks: {
      // 文本加粗
      strong: {
        // 对于加粗的部分，使用 strong 标签包裹，加粗的内容位于 strong 标签内(这里定义的 0 与上面一致，也念做 “洞”，也类似 vue 中的 slot)
        toDOM() {
          return ['strong', 0]
        },
        // 从别的地方复制过来的富文本，如果有 strong 标签，则被解析为一个 strong mark
        parseDOM: [{ tag: 'strong' }],
      },
    },
  },
})
