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

export const ICON_PATH = "img/";


export const icon = name => `
  <span class="icon"
        style="--icon: url('${ICON_PATH}${name}.svg')"
        aria-hidden="true"></span>
`;
