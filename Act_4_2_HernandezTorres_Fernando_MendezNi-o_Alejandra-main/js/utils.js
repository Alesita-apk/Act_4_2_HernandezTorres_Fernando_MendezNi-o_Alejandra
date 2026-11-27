//Utilidades compartidas

//Convierte los caracteres que tienen significado especial en HTML en texto inofensivo.
export const escapeHTML = (value = "") => String(value).replace(
  /[&<>"']/g,
  character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]
);

//
export const emit = (element, name, detail) => {
  element.dispatchEvent(new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true
  }));
};

const icons = {
  award: "Award.svg",
  bell: "Bell.svg",
  calendar: "Calendario.svg",
  check: "Check.svg",
  search: "Search.svg",
  user: "User.svg",
  warning: "Alert triangle.svg"
};

export const icon = name => `
  <span class="icon"
        style="--icon: url('Iconos/${icons[name]}')"
        aria-hidden="true"></span>
`;
