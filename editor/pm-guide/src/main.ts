import { history, redo, undo } from "prosemirror-history";
import { schema } from "prosemirror-schema-basic";
import { EditorState, Plugin, TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import "./style.css";
import { keymap } from "prosemirror-keymap";
import { DOMParser, Schema } from "prosemirror-model";
import {
  getTransactionCount,
  keydownPlugin,
  markAsUncounted,
  purplePlugin,
  specklePlugin,
} from "./plugins";
import { ImageView, ParagraphView } from "./views";

let isEditable = true;
const groupSchema = new Schema({
  nodes: {
    doc: { content: "block+" },
    paragraph: {
      group: "block",
      content: "text*",
      toDOM(node) {
        return ["div", 0];
      },
    },
    heading: {
      group: "block",
      content: "text*",
      marks: "",
      attrs: {
        level: {
          default: 1,
        },
      },
    },
    blockquote: { group: "block", content: "block+" },
    text: { group: "inline", inline: true },
  },
  marks: {
    strong: {},
    em: {},
  },
});
let state = EditorState.create({
  // doc: DOMParser.fromSchema(schema).parse(content!),
  schema,
  plugins: [
    keydownPlugin,
    // purplePlugin,
    specklePlugin,
    // history(),
    // keymap({ "Mod-z": undo, "Mod-y": redo }),
  ],
});
let view = new EditorView(document.body.querySelector("#app"), {
  state,
  editable() {
    return isEditable;
  },
  nodeViews: {
    image(node, view, getPos) {
      return new ImageView(node, view, getPos);
    },
    paragraph(node) {
      return new ParagraphView(node);
    },
  },
  dispatchTransaction(transaction) {
    console.log(
      "Document size went from",
      transaction.before.content.size,
      transaction.doc.content.size
    );
    console.log(getTransactionCount(state));
    let newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});

markAsUncounted(view.state.tr);

console.log(view);

const btn1 = document.querySelector("#btn1");
btn1?.addEventListener("click", () => {
  const tr = view.state.tr;
  tr.delete(5, 7);
  tr.split(5);
  view.dispatch(tr);
  console.log(tr.doc.toString());
});

const replace = document.querySelector("#replace");
replace?.addEventListener("click", () => {
  console.log(state);
  const tr = view.state.tr;
  view.dispatch(tr.deleteSelection().insertText("Hello").deleteSelection());
});

const editable = document.querySelector("#editable");
editable?.addEventListener("click", () => {
  isEditable = !isEditable;
  view.setProps({
    editable() {
      return isEditable;
    },
  });
});

function deleteSelection(state: EditorState, view: EditorView) {
  if (state.selection.empty) return false;
  if (view.dispatch) view.dispatch(state.tr.deleteSelection());
  return true;
}
