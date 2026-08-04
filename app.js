/* ==================================================
   CALENDARIO APOD - APORTE DE ESTEFANÍA
   ================================================== */

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


function solicitarApod(fecha) {
  if (!validarFecha(fecha)) {
    return;
  }

  actualizarEstado(
    `Consultando el registro del ${fecha}...`,
    "cargando",
  );

  /*
   * Este evento entrega la fecha al código principal
   * encargado de consultar la API de NASA.
   */
  document.dispatchEvent(
    new CustomEvent("apod:buscar-fecha", {
      detail: {
        fecha,
      },
    }),
  );

  console.log("Fecha APOD seleccionada:", fecha);
}


formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  solicitarApod(campoFecha.value);
});


botonHoy.addEventListener("click", () => {
  campoFecha.value = FECHA_ACTUAL;

  solicitarApod(FECHA_ACTUAL);
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