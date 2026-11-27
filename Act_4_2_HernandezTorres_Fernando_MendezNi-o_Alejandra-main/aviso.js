import { Vista } from "./vista.js";

export class VistaAviso extends Vista {
  static contenido = `
    <div class="row heading">
      <div>
        <h1 tabindex="-1">Detalle de aviso</h1>
        <p>Ejemplo de comunicado · Periodo 2025-2026/II.</p>
      </div>
      <button data-view="inicio">Regresar a inicio</button>
    </div>
    <div class="stack">
      <section class="panel">
        <sie-notice-alert></sie-notice-alert>
        <p class="notice-text">Confirma tu carga académica antes del 20 de febrero.</p>
      </section>
      <sie-metadata>
        <div class="metadata-item"><small>Emisor</small><strong>Servicios escolares</strong></div>
        <div class="metadata-item"><small>Publicado</small><strong>16 de febrero de 2026</strong></div>
        <div class="metadata-item"><small>Fecha límite</small><strong>20 de febrero de 2026</strong></div>
      </sie-metadata>
      <section class="panel prose"><h2>Confirmación de carga académica</h2>Estudiante:Confirma tu carga académica antes del 20 de febrero. Revisa las materias inscritas del periodo 2025-2026/II y comprueba que correspondan a tu carga académica.Si encuentras una diferencia o necesitas una corrección, consulta con Servicios Escolares antes de la fecha indicada.</section>
      <section class="panel">
        <h2>¿Qué necesitas hacer?</h2>
        <ol>
          <li>Revisa las materias de tu periodo académico.</li>
          <li>Verifica que correspondan a tu carga académica.</li>
          <li>Consulta con Servicios escolares si necesitas corregir algún dato.</li>
        </ol>
        <p class="muted">
          Este ejemplo muestra el aviso; no modifica ni confirma tu carga académica.
        </p>
      </section>
      <div><button data-view="avisos">Volver a avisos</button></div>
    </div>
  `;
}
