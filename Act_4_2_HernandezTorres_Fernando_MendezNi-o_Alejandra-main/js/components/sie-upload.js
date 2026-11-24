import { SIEElement } from "../SIEElement.js";
import { emit } from "../utils.js";


//Formulario de entrega

export class SIEUpload extends SIEElement {
  connectedCallback() {
    this.paint(`
      <form class="panel">
        <h2>Tu entrega</h2>
        <p>Adjunta las vistas de Inicio para móvil, tablet y escritorio.</p>

        <div class="attachment">
          <div>
            <strong id="filename">Sin archivos adjuntos</strong>
            <small>Selecciona un archivo para preparar tu entrega.</small>
          </div>

          <label class="button" for="attachment">Adjuntar archivo</label>
          <input id="attachment" type="file" hidden>
        </div>

        <label>
          Comentario (opcional)
          <textarea name="comment" rows="3"
            placeholder="Agrega un comentario para tu docente"></textarea>
        </label>

        <button type="submit" disabled>Enviar entrega</button>
        <p class="muted" id="status" role="status"></p>
      </form>
    `, `
      p { margin: 16px 0; font-size: 14px; }

      .attachment {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin: 16px 0;
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      #filename { display: block; overflow-wrap: anywhere; }
      small { display: block; margin-top: 6px; }
      button[type=submit] { margin-top: 16px; }
      #status:empty { display: none; }
    `);

    const input = this.shadowRoot.querySelector("#attachment");
    const submit = this.shadowRoot.querySelector("[type=submit]");
    const status = this.shadowRoot.querySelector("#status");

    input.addEventListener("change", () => {
      const file = input.files[0];

      this.shadowRoot.querySelector("#filename").textContent =
        file ? file.name : "Sin archivos adjuntos";

      submit.disabled = !file;
      status.textContent = "";
    });

    this.shadowRoot.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      const file = input.files[0];
      if (!file) return;

      emit(this, "sie-submit", {
        taskId: this.getAttribute("task-id"),
        file,
        comment: this.shadowRoot.querySelector("textarea").value.trim()
      });

      status.textContent =
        "Entrega preparada localmente. No se ha enviado a un servidor.";
    });
  }
}
