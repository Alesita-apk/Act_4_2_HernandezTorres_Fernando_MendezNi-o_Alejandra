import { SIEElement } from "../SIEElement.js";
import { emit, icon } from "../utils.js";


//Avisos


export class SIENotices extends SIEElement {
  connectedCallback() {
    this.paint(`
      <section class="panel">
        <h2>Avisos</h2>
        <small>2 avisos · 1 requiere tu atención</small>

        <article class="urgent">
          <div class="alert-title">
            ${icon("warning")}
            <div>
              <h3 class="danger">Acción requerida</h3>
              <small>Servicios escolares · 16 feb</small>
            </div>
          </div>

          <p>Confirma tu carga académica antes del 20 de febrero.</p>
          <button data-view="aviso">Abrir aviso</button>
        </article>

        <article>
          <span class="badge">Informativo</span>
          <h3>Calendario de evaluaciones</h3>
          <p>
            Ya puedes consultar las fechas del primer parcial
            en la sección Calendario.
          </p>
          <small>Coordinación académica · 15 feb</small>
          <button class="text-button" data-view="calendario">
            Ver calendario
          </button>
          <button class="text-button" id="institutional">
            Ver información institucional ↗
          </button>
          <small>Información externa · Sitio institucional</small>
        </article>
      </section>
    `, `
      article { padding: 20px 16px; }
      article:last-child { border-top: 1px solid #ddd; }
      .alert-title { display: flex; gap: 14px; align-items: center; }
      .alert-title .icon { width: 46px; height: 46px; color: #f00; }
      h3 { margin: 10px 0; }
      p { font-size: 14px; margin: 12px 0; }
      small { display: block; }
      .text-button { display: flex; margin-top: 8px; }
    `);

    this.shadowRoot.addEventListener("click", event => {
      const button = event.target.closest("[data-view]");
      if (button) {
        emit(this, "sie-navigate", { view: button.dataset.view });
      }

      if (event.target.closest("#institutional")) {
        emit(this, "sie-institutional", { id: "informacion" });
      }
    });
  }
}
