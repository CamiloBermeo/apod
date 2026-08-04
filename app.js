const API_KEY =
  import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";

const API_URL = "https://api.nasa.gov/planetary/apod";
const PRIMER_APOD = "1995-06-16";

const formulario =
  document.getElementById("formulario-fecha");

const campoFecha =
  document.getElementById("fecha-apod");

const botonHoy =
  document.getElementById("boton-fecha-hoy");

const mensaje =
  document.getElementById("mensaje-fecha");

const indicador =
  document.querySelector(".estado-indicador");

const resultado =
  document.getElementById("resultado-apod");

const multimedia =
  document.getElementById("apod-multimedia");

const titulo =
  document.getElementById("apod-titulo");

const fechaTexto =
  document.getElementById("apod-fecha");

const copyright =
  document.getElementById("apod-copyright");

const explicacion =
  document.getElementById("apod-explicacion");


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
    indicador.style.backgroundColor = "#a85d3f";
  } else if (tipo === "cargando") {
    indicador.style.backgroundColor = "#c29a62";
  } else {
    indicador.style.backgroundColor = "#5e6245";
  }
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
      "El archivo APOD comenzó el 16 de junio de 1995.",
      "error",
    );

    return false;
  }

  if (fecha > FECHA_ACTUAL) {
    actualizarEstado(
      "No existen registros astronómicos del futuro.",
      "error",
    );

    return false;
  }

  return true;
}


async function obtenerApod(fecha) {
  if (!validarFecha(fecha)) {
    return;
  }

  actualizarEstado(
    `Consultando el archivo del ${fecha}...`,
    "cargando",
  );

  const parametros = new URLSearchParams({
    api_key: API_KEY,
    date: fecha,
    thumbs: "true",
  });

  try {
    const respuesta = await fetch(
      `${API_URL}?${parametros.toString()}`,
    );

    if (!respuesta.ok) {
      throw new Error(
        `NASA respondió con el estado ${respuesta.status}.`,
      );
    }

    const datos = await respuesta.json();

    mostrarApod(datos);

    actualizarEstado(
      `Registro del ${datos.date} cargado correctamente.`,
    );
  } catch (error) {
    console.error(error);

    actualizarEstado(
      "No fue posible consultar la NASA. Revisa la conexión y la clave.",
      "error",
    );
  }
}


function mostrarApod(datos) {
  multimedia.replaceChildren();

  if (datos.media_type === "video") {
    const video = document.createElement("iframe");

    video.src = datos.url;
    video.title = datos.title;
    video.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    video.allowFullscreen = true;

    multimedia.appendChild(video);
  } else {
    const imagen = document.createElement("img");

    imagen.src = datos.hdurl || datos.url;
    imagen.alt = datos.title;

    multimedia.appendChild(imagen);
  }

  fechaTexto.textContent = datos.date;
  titulo.textContent = datos.title;
  explicacion.textContent = datos.explanation;

  copyright.textContent = datos.copyright
    ? `Crédito: ${datos.copyright}`
    : "Crédito: NASA";

  resultado.hidden = false;

  resultado.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}


formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  obtenerApod(campoFecha.value);
});


botonHoy.addEventListener("click", () => {
  campoFecha.value = FECHA_ACTUAL;

  obtenerApod(FECHA_ACTUAL);
});


campoFecha.addEventListener("change", () => {
  const fecha = campoFecha.value;

  if (validarFecha(fecha)) {
    actualizarEstado(
      `Fecha seleccionada: ${fecha}. Presiona “Descubrir el cielo”.`,
    );
  }
});