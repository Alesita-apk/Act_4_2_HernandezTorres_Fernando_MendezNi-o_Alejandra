import { Vista } from "./vista.js";

export class VistaEntrega extends Vista {
  static contenido = `
    <div class="row heading">
      <div>
        <h1 tabindex="-1">Entrega de actividad</h1>
        <p>Actividad 3.1 · SIE responsivo</p>
      </div>
      <button data-view="inicio">Regresar a inicio</button>
    </div>
    <div class="stack">
      <sie-metadata>
        <div class="metadata-item"><small>Asignatura</small><strong>Diseño de interfaces</strong></div>
        <div class="metadata-item"><small>Fecha límite</small><strong>17 de febrero de 2026</strong></div>
        <div class="metadata-item"><small>Hora límite</small><strong>23:59 h</strong></div>
      </sie-metadata>
      <sie-upload task-id="1"></sie-upload>
    </div>
  `;
}
