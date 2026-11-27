import { Vista } from "./vista.js";

export class VistaInicio extends Vista {
  static contenido = `
    <div class="row heading">
      <div>
        <h1 tabindex="-1">Inicio</h1>
        <p>Lunes, 16 de febrero de 2026</p>
      </div>
    </div>
    <div class="stack">
      <sie-quick-links></sie-quick-links>
      <section>
        <h2 class="title">Resumen académico</h2>
        <sie-stats>
          <sie-stat value="6" label="Materias inscritas"></sie-stat>
          <sie-stat value="3" label="Entregas pendientes"></sie-stat>
          <sie-stat value="1" label="Aviso por atender"></sie-stat>
        </sie-stats>
      </section>
      <div class="grid">
        <sie-notices></sie-notices>
        <sie-calendar compact></sie-calendar>
      </div>
      <sie-task-list></sie-task-list>
    </div>
  `;
}
