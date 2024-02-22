import { EditorView } from 'prosemirror-view'
import { schema } from './model'

type Schema = typeof schema

export function insertParagraph(editorView: EditorView, content: string) {
  const { state, dispatch } = editorView
  const schema: Schema = state.schema

  const paragraph = schema.node('paragraph', {}, schema.text(content))
  const block_tile = schema.node('block_tile', {}, paragraph)

  const pos = state.selection.anchor

  const tr = state.tr.insert(pos, block_tile)

  dispatch(tr)
}

export function insertHeading(editorView: EditorView, content: string, level = 1) {
  const { state, dispatch } = editorView
  const schema = state.schema
  // const heading = state.schema.node('heading', {level}, schema.text(content))
  const heading = schema.nodes.heading.create({ level }, schema.text(content))
  const block_tile = schema.nodes.block_tile.create(null, heading)
  const pos = state.selection.anchor
  const tr = state.tr.insert(pos, block_tile)

  dispatch(tr)
}

export function insertBlockQuote(editorView: EditorView, content: string = '') {
  const { state, dispatch } = editorView
  const schema = state.schema
  const node = schema.nodes.blockquote.create(null, schema.nodes.paragraph.create(null, schema.text(content)))
  const pos = state.selection.anchor
  const tr = state.tr.insert(pos, node)

  // const jsonContent = {
  //   type: 'blockquote',
  //   content: [
  //     {
  //       type: 'paragraph',
  //       content: content
  //         ? [
  //             {
  //               type: 'text',
  //               text: content,
  //             },
  //           ]
  //         : [],
  //     },
  //   ],
  // }
  // const node = schema.nodeFromJSON(jsonContent)
  // const tr = state.tr.replaceWith(state.selection.from, state.selection.to, node)
  dispatch(tr)
}

export function insertDatetime(editorView: EditorView, timestamp: number) {
  const { state, dispatch } = editorView
  const json = {
    type: 'datetime',
    attrs: {
      timestamp: timestamp || Date.now(),
    },
  }

  const node = state.schema.nodeFromJSON(json)
  const tr = state.tr.replaceWith(state.tr.selection.from, state.tr.selection.to, node)
  dispatch(tr)
}

export function markBold(editorView: EditorView) {
  const { state, dispatch } = editorView

  const mark = state.schema.marks.bold.create(null)
  const tr = state.tr.addMark(state.selection.from, state.selection.to, mark)
  dispatch(tr)
}
export function markItalic(editorView: EditorView) {
  const { state, dispatch } = editorView

  const json = {
    type: 'italic',
  }

  const mark = state.schema.markFromJSON(json)
  const tr = state.tr.addMark(state.selection.from, state.selection.to, mark)
  dispatch(tr)
}
export function markLink(editorView: EditorView) {
  const { state, dispatch } = editorView

  const json = {
    type: 'link',
    attrs: {
      href: 'https://baidu.com',
    },
  }

  const mark = state.schema.markFromJSON(json)
  const tr = state.tr.addMark(state.selection.from, state.selection.to, mark)
  dispatch(tr)
}
