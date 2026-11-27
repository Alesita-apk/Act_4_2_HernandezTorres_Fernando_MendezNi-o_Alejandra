import { SIEElement } from "../SIEElement.js";
import { emit, icon } from "../utils.js";

export class SIEQuickLinks extends SIEElement {
  connectedCallback() {
    const links = [
      ["calificaciones", "award", "Calificaciones"],
      ["calendario", "calendar", "Calendario"],
      ["entregas", "check", "Entregas"],
      ["avisos", "bell", "Avisos"]
    ];

    this.paint(`
      <section>
        <h2>Accesos rápidos</h2>
        <nav aria-label="Secciones académicas">
          ${links.map(([view, symbol, label]) => `
            <button data-view="${view}">${icon(symbol)} ${label}</button>
          `).join("")}
        </nav>
      </section>
    `, `
      h2 { margin-bottom: 12px; }
      nav {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
        padding: 20px;
        border-radius: 7px;
        background: #000;
      }
      button { padding: 6px; min-height: 56px; }
      .icon { width: 38px; height: 38px; }
      @media(max-width: 1000px) {
        nav { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media(max-width: 600px) {
        button { flex-direction: column; font-size: 12px; }
      }
    `);

    this.shadowRoot.addEventListener("click", event => {
      const button = event.target.closest("[data-view]");
      if (button) emit(this, "sie-navigate", { view: button.dataset.view });
    });
  }
}
