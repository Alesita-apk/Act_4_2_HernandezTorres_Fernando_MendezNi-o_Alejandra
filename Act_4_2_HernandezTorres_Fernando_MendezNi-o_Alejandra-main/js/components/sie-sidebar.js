import { SIEElement } from "../SIEElement.js";
import { emit } from "../utils.js";


//Menú institucional

export class SIESidebar extends SIEElement {
  connectedCallback() {
    const items = [
      ["kardex", "Kardex"],
      ["portal", "Portal Alumnos Ing"],
      ["caja", "Caja Virtual"],
      ["agenda", "Agenda Ing"]
    ];

    this.paint(`
      <nav aria-label="Enlaces institucionales">
        <div>
          ${items.map(([id, label], index) => `
            <button data-id="${id}" class="${index === 0 ? "primary" : ""}">
              ${label}
            </button>
          `).join("")}
        </div>
      </nav>
    `, `
      :host { height: 100%; }
      nav { background: #fff; padding: 16px; height: 100%; }
      nav > div { padding: 16px 26px; background: var(--background); }
      button { width: 100%; margin-bottom: 8px; background: #fff; color: #000; }
      button:last-child { margin-bottom: 0; }
      button.primary, button:hover { background: var(--blue); color: #fff; }

      @media(max-width: 900px) {
        nav > div { display: flex; flex-wrap: wrap; gap: 8px; padding: 10px; }
        button { flex: 1 1 130px; margin: 0; }
      }
    `);

    this.shadowRoot.addEventListener("click", event => {
      const button = event.target.closest("[data-id]");
      if (!button) return;

      emit(this, "sie-institutional", { id: button.dataset.id });
    });
  }
}
