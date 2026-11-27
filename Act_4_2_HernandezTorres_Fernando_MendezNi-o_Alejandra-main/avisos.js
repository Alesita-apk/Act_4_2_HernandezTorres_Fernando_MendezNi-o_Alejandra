import { Vista } from "./vista.js";

export class VistaAvisos extends Vista {
  static contenido = `
    <div class="row heading">
      <div>
        <h1 tabindex="-1">Avisos</h1>
        <p>Consulta los comunicados del periodo 2025-2026/II y las acciones pendientes.</p>
      </div>
      <button data-view="inicio">Regresar a inicio</button>
    </div>
    <div class="stack">
      <sie-stats>
        <sie-stat value="2" label="Avisos del periodo"></sie-stat>
        <sie-stat value="1" label="Requiere tu atención"></sie-stat>
      </sie-stats>
      <sie-notices></sie-notices>
    </div>
  `;
}
