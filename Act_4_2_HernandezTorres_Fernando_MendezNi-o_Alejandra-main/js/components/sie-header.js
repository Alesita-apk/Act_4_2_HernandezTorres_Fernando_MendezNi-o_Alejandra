import { SIEElement } from "../SIEElement.js";
import { emit, icon } from "../utils.js";


//Encabezado institucional

export class SIEHeader extends SIEElement {
  connectedCallback() {
    this.paint(`
      <header>
        <div>
          <strong>UASLP / SIE</strong>
          <p>SISTEMA DE INFORMACIÓN ESTUDIANTIL</p>
        </div>

        <nav aria-label="Herramientas personales">
          <button data-action="avisos" aria-label="Ver avisos">
            ${icon("bell")}
          </button>
          <button data-action="perfil" aria-label="Ver perfil">
            ${icon("user")}
          </button>
        </nav>
      </header>
    `, `
      header {
        min-height: 120px;
        padding: 28px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        color: #fff;
        background: #000;
        border-bottom: 3px solid var(--blue);
      }

      strong { font-size: 36px; font-weight: 600; }
      p { margin-top: 8px; font-size: 12px; }
      nav { display: flex; gap: 8px; }
      button { padding: 8px; background: transparent; }
      .icon { width: 38px; height: 38px; }

      @media(max-width: 600px) {
        header { padding: 20px 16px; }
        strong { font-size: 26px; }
        p { font-size: 9px; }
        .icon { width: 26px; height: 26px; }
      }
    `);

    this.shadowRoot.addEventListener("click", event => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (!action) return;

      if (action === "avisos") {
        emit(this, "sie-navigate", { view: "avisos" });
      } else {
        emit(this, "sie-message", {
          message: "El perfil requiere conexión al sistema académico."
        });
      }
    });
  }
}
