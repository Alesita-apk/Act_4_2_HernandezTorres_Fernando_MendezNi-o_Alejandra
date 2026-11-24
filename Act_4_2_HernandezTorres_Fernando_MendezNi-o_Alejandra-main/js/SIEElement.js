import { sharedStyles } from "./styles.js";


//Clase base: Shadow DOM + estilos compartidos

export class SIEElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  paint(markup, styles = "") {
    this.shadowRoot.innerHTML = `
      <style>${sharedStyles}${styles}</style>
      ${markup}
    `;
  }
}
