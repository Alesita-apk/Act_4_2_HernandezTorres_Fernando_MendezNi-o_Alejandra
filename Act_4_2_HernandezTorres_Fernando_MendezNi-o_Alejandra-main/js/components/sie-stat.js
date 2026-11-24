import { SIEElement } from "../SIEElement.js";
import { escapeHTML } from "../utils.js";


//Indicador académico

export class SIEStat extends SIEElement {
  static get observedAttributes() {
    return ["value", "label"];
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    this.paint(`
      <div>
        <strong>${escapeHTML(this.getAttribute("value"))}</strong>
        <small>${escapeHTML(this.getAttribute("label"))}</small>
      </div>
    `, `
      div { padding: 20px; background: #fff; border-radius: 8px; }
      strong { display: block; margin-bottom: 8px; color: var(--blue); }
      small { display: block; }
    `);
  }
}
