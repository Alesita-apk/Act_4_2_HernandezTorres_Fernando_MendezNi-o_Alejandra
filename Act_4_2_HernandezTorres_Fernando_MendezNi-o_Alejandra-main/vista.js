export class Vista extends HTMLElement {
  connectedCallback() {
    if (!this.firstElementChild) {
      this.innerHTML = this.constructor.contenido;
    }
  }
}
