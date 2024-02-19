import { EditorView } from 'prosemirror-view'

declare global {
  interface Window {
    editorView: EditorView
  }
}
