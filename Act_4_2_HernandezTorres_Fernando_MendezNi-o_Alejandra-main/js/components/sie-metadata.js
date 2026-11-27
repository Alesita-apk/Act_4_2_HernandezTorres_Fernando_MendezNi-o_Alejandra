import { SIEElement } from "../SIEElement.js";

export class SIEMetadata extends SIEElement {
  connectedCallback() {
    this.paint(`<div><slot></slot></div>`, `
      div {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
        padding: 10px 0;
      }
      ::slotted(*) { min-width: 0; }
      @media(max-width: 600px) {
        div { grid-template-columns: 1fr; }
      }
    `);
  }
}
