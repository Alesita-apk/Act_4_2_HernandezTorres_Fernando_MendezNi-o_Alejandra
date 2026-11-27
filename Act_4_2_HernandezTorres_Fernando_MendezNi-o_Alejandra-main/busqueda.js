import { Vista } from "./vista.js";

export class VistaBusqueda extends Vista {
  static contenido = `
    <div class="row heading">
      <h1>Resultados de búsqueda</h1>
      <button data-view="inicio">Regresar a inicio</button>
    </div>
    <section class="panel">
      <p id="search-summary"></p>
      <ul class="results"></ul>
    </section>
  `;
}
