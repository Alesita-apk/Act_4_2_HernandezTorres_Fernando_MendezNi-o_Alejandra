import { SIEElement } from "../SIEElement.js";
import { icon } from "../utils.js";

export class SIENoticeAlert extends SIEElement {
  connectedCallback() {
    this.paint(`
      <div>
        ${icon("warning")}
        <section>
          <h3>Acción requerida</h3>
          <small>Servicios escolares · 16 feb</small>
        </section>
      </div>
    `, `
      div { display: flex; gap: 14px; align-items: center; }
      .icon { width: 46px; height: 46px; color: var(--danger); }
      h3 { color: var(--danger); margin: 0 0 6px; }
    `);
  }
}
