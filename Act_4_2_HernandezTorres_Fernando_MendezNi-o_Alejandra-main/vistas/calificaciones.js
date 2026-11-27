import { Vista } from "./vista.js";

export class VistaCalificaciones extends Vista {
  static contenido = `
    <div class="row heading">
      <div>
        <h1 tabindex="-1">Calificaciones</h1>
        <p>Consulta tus resultados del periodo 2025-2026/II.</p>
      </div>
      <button data-view="inicio">Regresar a inicio</button>
    </div>
    <div class="stack">
      <sie-stats>
        <sie-stat value="6" label="Materias inscritas"></sie-stat>
        <sie-stat value="0/6" label="Con notas publicadas"></sie-stat>
        <sie-stat value="—" label="Promedio del periodo"></sie-stat>
      </sie-stats>
      <sie-grades></sie-grades>
    </div>
  `;
}
