const API_KEY = '7Cpbu44pFRppWeV4bJaN4Dargtm12XFUgjazP9MK'
const URL_ENDPOINT = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

const formulario =
  document.getElementById("formulario-fecha");

const campoFecha =
  document.getElementById("fecha-apod");

const botonHoy =
  document.getElementById("boton-fecha-hoy");

const mensaje =
  document.getElementById("mensaje-fecha");

const indicador =
  document.getElementById("estado-indicador");

const PRIMER_APOD = "1995-06-16";


function obtenerFechaActual() {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

const FECHA_ACTUAL = obtenerFechaActual();

campoFecha.min = PRIMER_APOD;
campoFecha.max = FECHA_ACTUAL;
campoFecha.value = FECHA_ACTUAL;


function actualizarEstado(texto, tipo = "normal") {
  mensaje.textContent = texto;
  mensaje.classList.toggle("error", tipo === "error");

  if (tipo === "error") {
    indicador.style.backgroundColor = "#b45d38";
    indicador.style.boxShadow =
      "0 0 0 5px rgba(180, 93, 56, 0.12)";

    return;
  }

  if (tipo === "cargando") {
    indicador.style.backgroundColor = "#c29a62";
    indicador.style.boxShadow =
      "0 0 0 5px rgba(194, 154, 98, 0.14)";

    return;
  }

  indicador.style.backgroundColor = "#727653";
  indicador.style.boxShadow =
    "0 0 0 5px rgba(114, 118, 83, 0.12)";
}

function validarFecha(fecha) {
  if (!fecha) {
    actualizarEstado(
      "Selecciona una fecha para continuar.",
      "error",
    );

    return false;
  }

  if (fecha < PRIMER_APOD) {
    actualizarEstado(
      "El archivo comenzó el 16 de junio de 1995.",
      "error",
    );

    return false;
  }

  if (fecha > FECHA_ACTUAL) {
    actualizarEstado(
      "No puedes consultar una fecha futura.",
      "error",
    );

    return false;
  }

  return true;
}

// date: YYYY-MM-DD
const getApod = async (date) => {
  console.log('DAte ', date)
  const URL_ENDPOINT_DATE = `${URL_ENDPOINT}&date=${date}`

  const response = await fetch(URL_ENDPOINT_DATE);

  if (!response.ok) {
    console.log('response ', response)
    throw new Error(`Error ${response.status}: no se pudo obtener el APOD`);
  }

  const data = await response.json();
  console.log(data)
  return data
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  await renderContent(campoFecha.value)
});


botonHoy.addEventListener("click", async () => {
  campoFecha.value = FECHA_ACTUAL;

  await renderContent(campoFecha.value)
});


campoFecha.addEventListener("change", () => {
  const fecha = campoFecha.value;

  if (validarFecha(fecha)) {
    actualizarEstado(
      `Fecha seleccionada: ${fecha}.`,
    );
  }
});

document.addEventListener(
  "apod:consulta-completa",
  (evento) => {
    actualizarEstado(
      `Registro del ${evento.detail.fecha} cargado correctamente.`,
    );
  },
);


const SectionInfo = (info) => {
  const mediaHTML = info.media_type === 'video'
    ? `
      <div class="mediaWrapper">
        <iframe 
          src="${info.url}" 
          title="${info.title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          onload="this.classList.add('loaded'); this.parentElement.classList.add('loaded')">
        </iframe>
      </div>
    `
    : `
      <div class="mediaWrapper">
        <img 
          src="${info.hdurl || info.url}" 
          alt="${info.title}"
          onload="this.classList.add('loaded'); this.parentElement.classList.add('loaded')">
      </div>
    `;

  const creditHTML = info.copyright
    ? `<span class="credit">Image Credit & Copyright: ${info.copyright}</span>`
    : `<span class="credit">Image Credit: NASA</span>`;

  return `
    <div class="sectionInfo">
      ${mediaHTML}

      <div class="bodyCard">
        <div class="cardHeader">
          <span class="date">
            <i class="fa-regular fa-calendar"></i>
            ${info.date}
          </span>
        </div>

        <h1>${info.title}</h1>
        ${creditHTML}

        <p>
          ${info.explanation}
        </p>
      </div>
    </div>
  `
}

const LoadingState = () => `
  <div class="sectionInfo loading">
    <p>Cargando imagen del día...</p>
  </div>
`;

const ErrorState = (message) => `
  <div class="sectionInfo error">
    <p>${message}</p>
  </div>
`;

const renderContent = async (date) => {
  const sectionInfo = document.getElementById('sectionInfo');

  sectionInfo.innerHTML = LoadingState();

  try {
    const data = await getApod(date);

    sectionInfo.innerHTML = SectionInfo(data);

  } catch (error) {
    console.error(error);
    sectionInfo.innerHTML = ErrorState(error.message);
  }
}

const today = new Date().toISOString().split('T')[0];

renderContent(today);
