import { Vista } from "./vista.js";

export class VistaEntregas extends Vista {
  static contenido = `
    <div class="row heading">
      <div>
        <h1 tabindex="-1">Entregas</h1>
        <p>Consulta tus actividades pendientes del periodo 2025-2026/II.</p>
      </div>
      <button data-view="inicio">Regresar a inicio</button>
    </div>
    <div class="stack">
      <sie-stats>
        <sie-stat value="3" label="Entregas pendientes"></sie-stat>
        <sie-stat value="17 feb" label="Próximo vencimiento"></sie-stat>
        <sie-stat value="23:59 h" label="Hora límite"></sie-stat>
      </sie-stats>
      <sie-task-list heading="Entregas pendientes"></sie-task-list>
    </div>
  `;
}
