import { SIEElement } from "../SIEElement.js";

export class SIEStats extends SIEElement {
  connectedCallback() {
    this.paint(`<div><slot></slot></div>`, `
      div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }
    `);
  }
}
