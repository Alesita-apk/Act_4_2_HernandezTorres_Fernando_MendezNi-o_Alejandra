import { SIEElement } from "../SIEElement.js";
import { emit, icon } from "../utils.js";


//Búsqueda y periodo académico

export class SIEToolbar extends SIEElement {
  connectedCallback() {
    this.paint(`
      <section class="tools" aria-label="Herramientas de consulta">
        <form role="search">
          <label for="search">Buscar en SIE</label>

          <div class="search">
            <div class="input">
              ${icon("search")}
              <input id="search" name="q" type="search"
                placeholder="Buscar materias, avisos o entregas">
            </div>
            <button type="submit">Buscar</button>
          </div>

          <small>Consulta el contenido del periodo seleccionado.</small>
        </form>

        <div>
          <label for="period">Periodo académico</label>
          <small>Actual · Enero – junio de 2026</small>
          <select id="period" aria-describedby="period-help">
            <option value="2025-2026/II">2025-2026/II</option>
          </select>
          <small id="period-help">
            Selecciona el actual o tus periodos cursados.
          </small>
        </div>
      </section>
    `, `
      .tools {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        padding: 24px 32px 44px;
      }

      .search {
        display: flex;
        gap: 12px;
        margin: 10px 0 6px;
      }

      .input { position: relative; flex: 1; min-width: 0; }
      .input .icon { position: absolute; left: 14px; top: 9px; }
      input { padding-left: 54px; }
      button { min-width: 150px; }
      small { display: block; margin-top: 6px; }
      select { margin: 10px 0 4px; text-align: center; }

      @media(max-width: 800px) {
        .tools {
          grid-template-columns: 1fr;
          padding: 20px 16px 28px;
        }
        button { min-width: auto; }
      }
    `);

    this.shadowRoot.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      emit(this, "sie-search", {
        query: new FormData(event.currentTarget).get("q").trim()
      });
    });
  }
}
