import { SIEElement } from "../SIEElement.js";
import { escapeHTML } from "../utils.js";

export class SIETaskList extends SIEElement {
  connectedCallback() {
    this.paint(`
      <section class="panel">
        <h2>${escapeHTML(this.getAttribute("heading") || "Próximas entregas")}</h2>
        <small>3 pendientes · Ordenadas por fecha</small>
        <div class="tasks">
          ${[1, 2, 3].map(id => `
            <sie-task-card task-id="${id}"></sie-task-card>
          `).join("")}
        </div>
      </section>
    `, `
      .tasks {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      .tasks > :last-child:nth-child(odd) { grid-column: 1 / -1; }
      @media(max-width: 600px) {
        .tasks { grid-template-columns: 1fr; }
      }
    `);
  }
}
