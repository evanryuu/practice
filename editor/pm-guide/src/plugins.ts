import { EditorState, Plugin, Transaction } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export const keydownPlugin = new Plugin({
  props: {
    handleKeyDown(view, event) {
      if (event.key.toUpperCase() === "ENTER") {
        const tr = view.state.tr;
        tr.delete(tr.selection.from, tr.selection.to);
        const newState = tr.split(tr.selection.to);
        view.dispatch(newState);
      }
      return false;
    },
  },
});
export const transactionCounter = new Plugin({
  state: {
    init() {
      return 0;
    },
    apply(tr, value) {
      if (tr.getMeta(transactionCounter)) return value;
      return value + 1;
    },
  },
});
export function getTransactionCount(state: EditorState) {
  return transactionCounter.getState(state);
}
export function markAsUncounted(tr: Transaction) {
  tr.setMeta(transactionCounter, true);
}

export const purplePlugin = new Plugin({
  props: {
    decorations(state) {
      return DecorationSet.create(state.doc, [
        Decoration.inline(0, state.doc.content.size, {
          style: "color: purple",
        }),
      ]);
    },
  },
});

export const specklePlugin: Plugin<any> = new Plugin({
  state: {
    init(_, { doc }) {
      let speckles = [];
      for (let pos = 1; pos < doc.content.size; pos += 4)
        speckles.push(
          Decoration.inline(pos - 1, pos, { style: "background: yellow" })
        );
      return DecorationSet.create(doc, speckles);
    },
    apply(tr, set) {
      return set.map(tr.mapping, tr.doc);
    },
  },
  props: {
    decorations(state) {
      // console.log(specklePlugin.getState(state));

      // return specklePlugin.getState(state);
      let speckles = [];
      for (let pos = 1; pos < state.doc.content.size; pos += 4)
        speckles.push(
          Decoration.inline(pos - 1, pos, { style: "background: yellow" })
        );
      return DecorationSet.create(state.doc, speckles);
    },
  },
});
