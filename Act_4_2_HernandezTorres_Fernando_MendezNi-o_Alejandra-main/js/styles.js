//Estilos compartidos por todos los componentes

export const sharedStyles = `
  :host {
    display: block;
    font-family: Inter, Arial, sans-serif;
    color: #000;
    --blue: #0059b3;
    --surface: #fff;
    --background: #e0e0e0;
    --muted: #424242;
    --danger: #d80000;
  }

  * { box-sizing: border-box; }

  [hidden] { display: none !important; }

  h1, h2, h3, p { margin: 0; }

  h1 { font-size: 36px; font-weight: 600; }
  h2, h3 { font-size: 16px; font-weight: 600; }

  p { line-height: 1.5; }

  small, .muted {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.5;
  }

  button, input, select, textarea { font: inherit; }

  button, .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 40px;
    padding: 10px 22px;
    border: 0;
    border-radius: 7px;
    background: #000;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  button:hover, .button:hover { background: var(--blue); }

  button:disabled {
    background: #c4c4c4;
    cursor: not-allowed;
  }

  :where(button, input, select, textarea, a):focus-visible {
    outline: 3px solid var(--blue);
    outline-offset: 3px;
  }

  input, select, textarea {
    width: 100%;
    min-height: 44px;
    border: 1px solid #ddd;
    border-radius: 7px;
    padding: 12px;
    background: #fff;
    color: #000;
  }

  textarea { resize: vertical; }

  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
  }

  label > input, label > select, label > textarea {
    margin-top: 10px;
  }

  /* Iconos (archivos en /img, coloreados con currentColor) */
  .icon {
    display: inline-block;
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    background-color: currentColor;
    -webkit-mask: var(--icon) center / contain no-repeat;
    mask: var(--icon) center / contain no-repeat;
  }

  .panel {
    padding: 20px;
    background: var(--surface);
    border-radius: 8px;
    box-shadow: 0 2px 3px #00000012;
  }

  .stack { display: grid; gap: 24px; }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .title { margin-bottom: 12px; }

  .badge {
    display: inline-block;
    border: 1px solid #777;
    border-radius: 6px;
    padding: 5px;
    font-size: 12px;
  }

  .danger { color: var(--danger); }
  .blue { color: var(--blue); }

  .text-button {
    padding: 0;
    min-height: 32px;
    color: var(--blue);
    background: transparent;
    text-align: left;
  }

  .text-button:hover {
    background: transparent;
    text-decoration: underline;
  }

  @media (max-width: 700px) {
    h1 { font-size: 28px; }
    .grid { grid-template-columns: 1fr; }
    .row { flex-wrap: wrap; }
  }
`;
