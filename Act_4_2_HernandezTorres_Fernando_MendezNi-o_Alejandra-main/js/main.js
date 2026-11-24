import { SIEHeader } from "./components/sie-header.js";
import { SIEToolbar } from "./components/sie-toolbar.js";
import { SIESidebar } from "./components/sie-sidebar.js";
import { SIEStat } from "./components/sie-stat.js";
import { SIETaskCard } from "./components/sie-task-card.js";
import { SIENotices } from "./components/sie-notices.js";
import { SIECalendar } from "./components/sie-calendar.js";
import { SIEUpload } from "./components/sie-upload.js";
import { SIEApp } from "./components/sie-app.js";


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
  "sie-app": SIEApp
};

for (const [name, component] of Object.entries(components)) {
  if (!customElements.get(name)) {
    customElements.define(name, component);
  }
}


