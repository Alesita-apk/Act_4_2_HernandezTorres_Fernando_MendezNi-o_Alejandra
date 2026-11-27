import { SIEElement } from "../SIEElement.js";
import { subjects } from "../data.js";
import { escapeHTML } from "../utils.js";

export class SIEGrades extends SIEElement {
  connectedCallback() {
    this.paint(`
      <section class="panel">
        <h2>Resultados por asignatura</h2>
        <div class="table-scroll" tabindex="0" role="region"
             aria-label="Tabla de calificaciones">
          <table>
            <caption>Periodo 2025-2026/II · 6 materias inscritas</caption>
            <thead>
              <tr>
                ${["Asignatura", "Parcial 1", "Parcial 2", "Parcial 3", "Final", "Estado"]
                  .map(label => `<th scope="col">${label}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${subjects.map(subject => `
                <tr>
                  <td>${escapeHTML(subject)}</td>
                  <td>—</td><td>—</td><td>—</td><td>—</td>
                  <td>Sin publicar</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `, `
      .table-scroll { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; min-width: 680px; }
      caption { text-align: left; margin: 12px 0; color: #424242; }
      th { background: #e0e0e0; text-align: left; font-weight: 500; }
      th, td { padding: 20px 14px; font-size: 12px; }
      td:not(:first-child), th:not(:first-child) { text-align: center; }
    `);
  }
}
