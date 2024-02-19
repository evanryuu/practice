import { Node } from "prosemirror-model";

export class ImageView {
  constructor(node, view, getPos) {
    this.dom = document.createElement("img");
    this.dom.src = node.attrs.src;
    this.dom.alt = node.attrs.alt;
    this.dom.addEventListener("click", (e) => {
      e.preventDefault();
      let alt = prompt("New alt text:", "");
      if (alt)
        view.dispatch(
          view.state.tr.setNodeMarkup(getPos(), null, {
            src: node.attrs.src,
            alt,
          })
        );
    });
  }

  stopEvent() {
    return true;
  }
}

export class ParagraphView {
  constructor(node) {
    this.dom = this.contentDOM = document.createElement("p");
    if (node.content.size == 0) this.dom.classList.add("empty");
  }

  update(node) {
    if (node.type.name != "paragraph") return false;
    if (node.content.size > 0) this.dom.classList.remove("empty");
    else this.dom.classList.add("empty");
    return true;
  }
}
