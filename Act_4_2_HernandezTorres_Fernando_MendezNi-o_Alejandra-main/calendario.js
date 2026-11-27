import { Vista } from "./vista.js";

export class VistaCalendario extends Vista {
  static contenido = `
    <div class="row heading">
      <div>
        <h1 tabindex="-1">Calendario</h1>
        <p>Organiza tus actividades y consulta las fechas del periodo.</p>
      </div>
      <button data-view="inicio">Regresar a inicio</button>
    </div>
    <div class="stack">
      <sie-calendar></sie-calendar>
    </div>
  `;
}
