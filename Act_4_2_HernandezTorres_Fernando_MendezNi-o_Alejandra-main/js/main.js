import { SIEHeader } from "./components/sie-header.js";
import { SIEToolbar } from "./components/sie-toolbar.js";
import { SIESidebar } from "./components/sie-sidebar.js";
import { SIEStat } from "./components/sie-stat.js";
import { SIETaskCard } from "./components/sie-task-card.js";
import { SIENotices } from "./components/sie-notices.js";
import { SIECalendar } from "./components/sie-calendar.js";
import { SIEUpload } from "./components/sie-upload.js";
import { SIEQuickLinks } from "./components/sie-quick-links.js";
import { SIETaskList } from "./components/sie-task-list.js";
import { SIEStats } from "./components/sie-stats.js";
import { SIEMetadata } from "./components/sie-metadata.js";
import { SIEGrades } from "./components/sie-grades.js";
import { SIENoticeAlert } from "./components/sie-notice-alert.js";
import { VistaInicio } from "../vistas/inicio.js";
import { VistaCalificaciones } from "../vistas/calificaciones.js";
import { VistaCalendario } from "../vistas/calendario.js";
import { VistaEntregas } from "../vistas/entregas.js";
import { VistaAvisos } from "../vistas/avisos.js";
import { VistaEntrega } from "../vistas/entrega.js";
import { VistaAviso } from "../vistas/aviso.js";
import { VistaBusqueda } from "../vistas/busqueda.js";
import { subjects } from "./data.js";


//Registro de Custom Elements

const components = {
  "sie-header": SIEHeader,
  "sie-toolbar": SIEToolbar,
  "sie-sidebar": SIESidebar,
  "sie-stat": SIEStat,
  "sie-task-card": SIETaskCard,
  "sie-notices": SIENotices,
  "sie-calendar": SIECalendar,
  "sie-upload": SIEUpload,
  "sie-quick-links": SIEQuickLinks,
  "sie-task-list": SIETaskList,
  "sie-stats": SIEStats,
  "sie-metadata": SIEMetadata,
  "sie-grades": SIEGrades,
  "sie-notice-alert": SIENoticeAlert,
  "vista-inicio": VistaInicio,
  "vista-calificaciones": VistaCalificaciones,
  "vista-calendario": VistaCalendario,
  "vista-entregas": VistaEntregas,
  "vista-avisos": VistaAvisos,
  "vista-entrega": VistaEntrega,
  "vista-aviso": VistaAviso,
  "vista-busqueda": VistaBusqueda
};

for (const [name, component] of Object.entries(components)) {
  if (!customElements.get(name)) {
    customElements.define(name, component);
  }
}

const content = document.querySelector("#content");
const message = document.querySelector("#message");
const pages = Array.from(content.querySelectorAll("[data-page]"));
const searchResults = document.querySelector("#search-results");
const upload = document.querySelector("sie-upload");

function showPage(page) {
  upload.reset();
  for (const item of pages) item.hidden = item !== page;
  searchResults.hidden = page !== searchResults;
  message.textContent = "";
}

function renderView() {
  const requested = location.hash.slice(1);
  const page = pages.find(item => item.dataset.page === requested) || pages[0];
  showPage(page);
}

function navigate(view, id) {
  if (!pages.some(item => item.dataset.page === view)) return;
  if (id) upload.setAttribute("task-id", id);
  if (location.hash === `#${view}`) renderView();
  else location.hash = view;
}

function search(query) {
  if (!query) {
    renderView();
    return;
  }

  const normalize = text => text.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
  const catalog = [
    ...subjects.map(title => ({ title, view: "calificaciones" })),
    { title: "Actividad 3.1 · SIE responsivo", view: "entrega" },
    { title: "Confirmación de carga académica", view: "aviso" },
    { title: "Calendario de evaluaciones", view: "calendario" },
    ...pages.map(page => ({
      title: page.querySelector("h1").textContent,
      view: page.dataset.page
    }))
  ];
  const results = catalog.filter(item =>
    normalize(item.title).includes(normalize(query))
  );

  document.querySelector("#search-summary").textContent =
    `${results.length} resultados para «${query}»`;
  const list = searchResults.querySelector(".results");
  list.replaceChildren();
  for (const result of results) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.dataset.view = result.view;
    button.textContent = result.title;
    item.append(button);
    list.append(item);
  }
  showPage(searchResults);
}

document.addEventListener("sie-navigate", event => {
  navigate(event.detail.view, event.detail.id);
});
document.addEventListener("sie-search", event => search(event.detail.query));
document.addEventListener("sie-message", event => {
  message.textContent = event.detail.message;
});
document.addEventListener("sie-institutional", event => {
  message.textContent = `El enlace «${event.detail.id}» necesita su URL institucional.`;
});
content.addEventListener("click", event => {
  const button = event.target.closest("[data-view]");
  if (button) navigate(button.dataset.view);
});
window.addEventListener("hashchange", renderView);
renderView();
