import { SIEElement } from "../SIEElement.js";
import { escapeHTML, icon } from "../utils.js";
import { subjects, views } from "../data.js";


//Aplicación y sus siete vistas


export class SIEApp extends SIEElement {
  constructor() {
    super();
    this.activeTask = "1";
    this.onHashChange = () => this.renderView();
  }

  connectedCallback() {
    this.paint(`
      <sie-header></sie-header>
      <sie-toolbar></sie-toolbar>

      <div class="layout">
        <sie-sidebar></sie-sidebar>

        <main>
          <div id="content"></div>
          <p id="message" role="status" aria-live="polite"></p>
        </main>
      </div>
    `, `
      :host {
        min-height: 100vh;
        background: var(--background);
        font-size: 14px;
      }

      .layout {
        display: grid;
        grid-template-columns: 257px minmax(0, 1fr);
        gap: 24px;
        padding: 0 32px 32px;
      }

      main { min-width: 0; }
      .heading { margin-bottom: 24px; align-items: flex-start; }
      .heading p { margin-top: 12px; color: var(--muted); }

      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .quick {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
        padding: 20px;
        border-radius: 7px;
        background: #000;
      }

      .quick button { padding: 6px; min-height: 56px; }
      .quick .icon { width: 38px; height: 38px; }

      .tasks {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .tasks > :last-child:nth-child(odd) { grid-column: 1 / -1; }

      .table-scroll { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; min-width: 680px; }
      caption { text-align: left; margin: 12px 0; color: #424242; }
      th { background: #e0e0e0; text-align: left; font-weight: 500; }
      th, td { padding: 20px 14px; font-size: 12px; }
      td:not(:first-child), th:not(:first-child) { text-align: center; }

      .metadata {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
        padding: 10px 0;
      }

      .metadata strong { display: block; margin-top: 6px; }

      .prose { white-space: pre-line; font-size: 14px; line-height: 1.5; }
      .prose h2 { margin-bottom: 16px; }
      ol { padding-left: 20px; line-height: 1.6; }

      .alert { display: flex; align-items: center; gap: 14px; }
      .alert .icon { color: #f00; width: 44px; height: 44px; }

      #message {
        padding: 12px;
        background: #fff;
        border-radius: 6px;
        margin-top: 20px;
      }
      #message:empty { display: none; }

      .results { display: grid; gap: 12px; padding: 0; list-style: none; }
      .results button { width: 100%; justify-content: flex-start; }

      @media(max-width: 1000px) {
        .layout { grid-template-columns: 220px minmax(0, 1fr); }
        .quick { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }

      @media(max-width: 900px) {
        .layout { grid-template-columns: 1fr; padding: 0 16px 24px; }
      }

      @media(max-width: 600px) {
        .tasks, .metadata { grid-template-columns: 1fr; }
        .heading { gap: 20px; }
        .quick button { flex-direction: column; font-size: 12px; }
      }
    `);

    this.shadowRoot.addEventListener("sie-navigate", event => {
      this.navigate(event.detail.view, event.detail.id);
    });

    this.shadowRoot.addEventListener("sie-search", event => {
      this.search(event.detail.query);
    });

    this.shadowRoot.addEventListener("sie-message", event => {
      this.message(event.detail.message);
    });

    this.shadowRoot.addEventListener("sie-institutional", event => {
      this.message(
        `El enlace «${event.detail.id}» necesita su URL institucional.`
      );
    });

    this.shadowRoot.addEventListener("click", event => {
      const button = event.target.closest("[data-view]");
      if (button) this.navigate(button.dataset.view);
    });

    window.addEventListener("hashchange", this.onHashChange);
    this.renderView();
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.onHashChange);
  }

  navigate(view, id) {
    if (!views[view]) return;
    if (id) this.activeTask = id;

    if (location.hash === `#${view}`) {
      this.renderView();
    } else {
      location.hash = view;
    }
  }

  message(text) {
    this.shadowRoot.querySelector("#message").textContent = text;
  }

  stats(items) {
    return `
      <div class="stats">
        ${items.map(([value, label]) => `
          <sie-stat
            value="${escapeHTML(value)}"
            label="${escapeHTML(label)}">
          </sie-stat>
        `).join("")}
      </div>
    `;
  }

  tasks(title = "Próximas entregas") {
    return `
      <section class="panel">
        <h2>${title}</h2>
        <small>3 pendientes · Ordenadas por fecha</small>

        <div class="tasks">
          ${[1, 2, 3].map(id => `
            <sie-task-card task-id="${id}"></sie-task-card>
          `).join("")}
        </div>
      </section>
    `;
  }

  metadata(items) {
    return `
      <div class="metadata">
        ${items.map(([label, value]) => `
          <div>
            <small>${escapeHTML(label)}</small>
            <strong>${escapeHTML(value)}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  renderView() {
    const requested = location.hash.slice(1);
    const view = Object.hasOwn(views, requested) ? requested : "inicio";
    const [title, subtitle] = views[view];

    this.shadowRoot.querySelector("#content").innerHTML = `
      <div class="row heading">
        <div>
          <h1 tabindex="-1">${title}</h1>
          <p>${subtitle}</p>
        </div>

        ${view !== "inicio" ? `
          <button data-view="inicio">Regresar a inicio</button>
        ` : ""}
      </div>

      <div class="stack">${this.viewContent(view)}</div>
    `;

    this.message("");
  }

  viewContent(view) {
    switch (view) {
      case "inicio":
        return `
          <section>
            <h2 class="title">Accesos rápidos</h2>
            <nav class="quick" aria-label="Secciones académicas">
              ${[
                ["calificaciones", "award", "Calificaciones"],
                ["calendario", "calendar", "Calendario"],
                ["entregas", "check", "Entregas"],
                ["avisos", "bell", "Avisos"]
              ].map(([route, symbol, label]) => `
                <button data-view="${route}">
                  ${icon(symbol)} ${label}
                </button>
              `).join("")}
            </nav>
          </section>

          <section>
            <h2 class="title">Resumen académico</h2>
            ${this.stats([
              ["6", "Materias inscritas"],
              ["3", "Entregas pendientes"],
              ["1", "Aviso por atender"]
            ])}
          </section>

          <div class="grid">
            <sie-notices></sie-notices>
            <sie-calendar compact></sie-calendar>
          </div>

          ${this.tasks()}
        `;

      case "calificaciones":
        return `
          ${this.stats([
            ["6", "Materias inscritas"],
            ["0/6", "Con notas publicadas"],
            ["—", "Promedio del periodo"]
          ])}

          <section class="panel">
            <h2>Resultados por asignatura</h2>
            <div class="table-scroll" tabindex="0"
                 role="region" aria-label="Tabla de calificaciones">
              <table>
                <caption>Periodo 2025-2026/II · 6 materias inscritas</caption>
                <thead>
                  <tr>
                    ${[
                      "Asignatura", "Parcial 1", "Parcial 2",
                      "Parcial 3", "Final", "Estado"
                    ].map(label => `<th scope="col">${label}</th>`).join("")}
                  </tr>
                </thead>

                <tbody>
                  ${subjects.map(subject => `
                    <tr>
                      <td>${subject}</td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                      <td>Sin publicar</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </section>
        `;

      case "calendario":
        return `<sie-calendar></sie-calendar>`;

      case "entregas":
        return `
          ${this.stats([
            ["3", "Entregas pendientes"],
            ["17 feb", "Próximo vencimiento"],
            ["23:59 h", "Hora límite"]
          ])}
          ${this.tasks("Entregas pendientes")}
        `;

      case "avisos":
        return `
          ${this.stats([
            ["2", "Avisos del periodo"],
            ["1", "Requiere tu atención"]
          ])}
          <sie-notices></sie-notices>
        `;

      case "entrega":
        return `
          ${this.metadata([
            ["Asignatura", "Diseño de interfaces"],
            ["Fecha límite", "17 de febrero de 2026"],
            ["Hora límite", "23:59 h"]
          ])}

          <section class="panel prose"><h2>Instrucciones</h2>Entrega las vistas de Inicio para móvil, tablet y escritorio.

Revisa que los componentes conserven su organización y se adapten al ancho de cada pantalla. Comprueba la navegación antes de preparar tu entrega.</section>

          <sie-upload task-id="${escapeHTML(this.activeTask)}"></sie-upload>
        `;

      case "aviso":
        return `
          <section class="panel">
            <div class="alert">
              ${icon("warning")}
              <div>
                <h2 class="danger">Acción requerida</h2>
                <small>Servicios escolares · 16 feb</small>
              </div>
            </div>
            <p style="margin-top:16px">
              Confirma tu carga académica antes del 20 de febrero.
            </p>
          </section>

          ${this.metadata([
            ["Emisor", "Servicios escolares"],
            ["Publicado", "16 de febrero de 2026"],
            ["Fecha límite", "20 de febrero de 2026"]
          ])}

          <section class="panel prose"><h2>Confirmación de carga académica</h2>Estudiante:

Confirma tu carga académica antes del 20 de febrero. Revisa las materias inscritas del periodo 2025-2026/II y comprueba que correspondan a tu carga académica.

Si encuentras una diferencia o necesitas una corrección, consulta con Servicios Escolares antes de la fecha indicada.</section>

          <section class="panel">
            <h2>¿Qué necesitas hacer?</h2>
            <ol>
              <li>Revisa las materias de tu periodo académico.</li>
              <li>Verifica que correspondan a tu carga académica.</li>
              <li>
                Consulta con Servicios escolares si necesitas
                corregir algún dato.
              </li>
            </ol>
            <p class="muted">
              Este ejemplo muestra el aviso; no modifica ni confirma
              tu carga académica.
            </p>
          </section>

          <div><button data-view="avisos">Volver a avisos</button></div>
        `;
    }
  }

  search(query) {
    if (!query) {
      this.renderView();
      return;
    }

    const normalize = text => text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es");

    const catalog = [
      ...subjects.map(title => ({
        title,
        view: "calificaciones"
      })),
      { title: "Actividad 3.1 · SIE responsivo", view: "entrega" },
      { title: "Confirmación de carga académica", view: "aviso" },
      { title: "Calendario de evaluaciones", view: "calendario" },
      ...Object.entries(views).map(([view, [title]]) => ({
        title,
        view
      }))
    ];

    const results = catalog.filter(item =>
      normalize(item.title).includes(normalize(query))
    );

    this.shadowRoot.querySelector("#content").innerHTML = `
      <div class="row heading">
        <h1>Resultados de búsqueda</h1>
        <button data-view="inicio">Regresar a inicio</button>
      </div>

      <section class="panel">
        <p>
          ${results.length} resultados para
          «${escapeHTML(query)}»
        </p>

        <ul class="results">
          ${results.map(item => `
            <li>
              <button data-view="${item.view}">
                ${escapeHTML(item.title)}
              </button>
            </li>
          `).join("")}
        </ul>
      </section>
    `;

    this.message("");
  }
}
