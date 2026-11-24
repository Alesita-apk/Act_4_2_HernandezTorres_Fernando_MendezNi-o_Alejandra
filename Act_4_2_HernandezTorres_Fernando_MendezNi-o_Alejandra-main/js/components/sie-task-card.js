import { SIEElement } from "../SIEElement.js";
import { emit } from "../utils.js";


//Tarjeta de actividad

export class SIETaskCard extends SIEElement {
  connectedCallback() {
    this.paint(`
      <article class="panel">
        <div class="row">
          <small>17 feb · 23:59 h</small>
          <span class="badge danger">Pendiente</span>
        </div>

        <h3>Actividad 3.1 · SIE responsivo</h3>
        <small>Diseño de interfaces</small>

        <p>
          Entrega las vistas de Inicio para móvil, tablet y escritorio.
        </p>

        <button>Abrir</button>
      </article>
    `, `
      article { border-left: 3px solid #f00; height: 100%; }
      h3 { margin: 16px 0 4px; }
      p { margin: 12px 0; font-size: 14px; }
    `);

    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      emit(this, "sie-navigate", {
        view: "entrega",
        id: this.getAttribute("task-id")
      });
    });
  }
}
