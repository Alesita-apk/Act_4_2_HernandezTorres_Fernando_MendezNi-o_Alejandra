import { SIEElement } from "../SIEElement.js";
import { emit, escapeHTML } from "../utils.js";
import { agenda } from "../data.js";

//Calendario y agenda


export class SIECalendar extends SIEElement {
  connectedCallback() {
    const compact = this.hasAttribute("compact");
    const dates = compact
      ? [16, 17, 18, 19, 20, 21, 22]
      : Array.from({ length: 35 }, (_, index) => {
          if (index < 6) return 26 + index;
          if (index === 34) return 1;
          return index - 5;
        });

    const compactEvents = [
      { day: 17, title: "Asignacion 1", detail: "Diseño de Interfaces · 23:59 h" },
      { day: 19, title: "Asignacion 2", detail: "Programación de Videojuegos · 23:59 h" },
      {
        day: 20,
        title: "Asignacion 3",
        detail: "Administración de Proyectos II · 23:59 h"
      }
    ];

    this.paint(`
      <div class="${compact ? "compact" : "grid"}">
        <section class="panel">
          <h2>${compact ? "Calendario" : "Febrero de 2026"}</h2>
          <p class="muted">
            ${compact
              ? "Febrero de 2026 · Semana del 16 al 22"
              : "Hoy: lunes 16 · Periodo 2025-2026/II"}
          </p>

          <div class="calendar" aria-label="Febrero de 2026">
            ${["L", "M", "X", "J", "V", "S", "D"].map(day =>
              `<span class="weekday">${day}</span>`
            ).join("")}

            ${dates.map((day, index) => {
              const outside = !compact && (index < 6 || index === 34);
              const today = !outside && day === 16;
              const hasEvent = !outside && [12, 17, 19, 20].includes(day);

              return `
                <button type="button"
                  data-day="${day}"
                  ${outside ? "disabled" : ""}
                  ${today ? 'aria-current="date"' : ""}
                  aria-label="${day} de ${outside ? "mes adyacente" : "febrero de 2026"}"
                  class="${today ? "today" : hasEvent ? "event" : ""}">
                  ${day}
                  ${!compact && today ? "<small>Hoy</small>" : ""}
                  ${!compact && hasEvent ? "<small>Entrega</small>" : ""}
                </button>
              `;
            }).join("")}
          </div>

          <p id="selected" class="muted" aria-live="polite"></p>

          ${compact ? `
            ${this.eventList(compactEvents)}
            <button data-calendar>Ver calendario</button>
          ` : ""}
        </section>

        ${compact ? "" : `
          <section class="panel">
            <h2>Fechas y actividades</h2>
            <p class="muted">Febrero de 2026 · Fechas de Inicio</p>
            ${this.eventList(agenda)}
          </section>
        `}
      </div>
    `, `
      .calendar {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 5px;
        margin: 16px 0;
      }

      .weekday { text-align: center; font-size: 12px; }

      .calendar button {
        flex-direction: column;
        padding: 8px 2px;
        min-height: ${compact ? "44px" : "64px"};
        background: #fff;
        color: #000;
      }

      .calendar button:disabled { color: #666; background: #fff; }
      .calendar .event { background: #e0e0e0; }
      .calendar .today { background: var(--blue); color: #fff; }
      .calendar button:hover:not(:disabled) { outline: 1px solid var(--blue); }
      .calendar button small { color: var(--blue); font-size: 10px; }
      .calendar .today small { color: #fff; }

      .events { display: grid; gap: 16px; margin: 20px 0; }

      .event-item { display: flex; align-items: center; gap: 12px; }

      time {
        display: grid;
        gap: 4px;
        min-width: 40px;
        padding: 8px;
        text-align: center;
        border-radius: 4px;
        background: #c2d4e5;
        color: var(--blue);
      }

      time small { color: inherit; }
      h3 { margin-bottom: 6px; }
      .muted { margin-top: 12px; }
    `);

    this.shadowRoot.addEventListener("click", event => {
      if (event.target.closest("[data-calendar]")) {
        emit(this, "sie-navigate", { view: "calendario" });
      }

      const button = event.target.closest("[data-day]");
      if (!button || button.disabled) return;

      const day = Number(button.dataset.day);
      const entries = (compact ? compactEvents : agenda)
        .filter(item => item.day === day);

      this.shadowRoot.querySelector("#selected").textContent =
        `${day} de febrero: ` +
        (entries.map(item => item.title).join(", ") || "Sin actividades.");
    });
  }

  eventList(events) {
    return `
      <div class="events">
        ${events.map(item => `
          <div class="event-item">
            <time datetime="2026-02-${String(item.day).padStart(2, "0")}">
              <strong>${item.day}</strong>
              <small>Feb</small>
            </time>
            <div>
              <h3>${escapeHTML(item.title)}</h3>
              <small>${escapeHTML(item.detail)}</small>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }
}
