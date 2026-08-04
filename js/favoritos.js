
function construirTarjeta(info) {
  const contenedor = document.querySelector('#listaFavoritos');
  if (!contenedor) return;

  const columna = document.createElement('div');
  columna.className = 'col';
  columna.dataset.date = info.date;

  columna.innerHTML = `
    <article class="card h-100 tarjeta-favorito">
        <img src=${info.url} class="card-img-top imagen-favorito" alt="${info.title}">
        <div class="card-body cuerpo-favorito">
            <h4>${info.title}</h4>
            <p class="card-text descripcion-favorito">${info.explanation}</p>
            <button class="btn boton-quitar-favorito" data-date="${info.date}">Quitar de favoritos</button>
        </div>
    </article>
    `;

  contenedor.appendChild(columna);
}

function eliminarFavorito(date) {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const favoritosActualizados = favoritos.filter(fav => fav.date !== date);
  localStorage.setItem("favoritos", JSON.stringify(favoritosActualizados));

  // Eliminar la tarjeta del DOM
  const columna = document.querySelector(`[data-date="${date}"]`);
  if (columna) {
    columna.remove();
  }

  // Si no hay más favoritos, mostrar mensaje
  const contenedor = document.querySelector('#listaFavoritos');
  if (contenedor && contenedor.children.length === 0) {
    contenedor.innerHTML = '<p class="text-center">No tienes favoritos guardados.</p>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    const contenedor = document.querySelector('#listaFavoritos');
    if (contenedor) {
      contenedor.innerHTML = '<p class="text-center">No tienes favoritos guardados.</p>';
    }
  } else {
    favoritos.forEach((info) => construirTarjeta(info));
  }

  // Agregar evento para eliminar favoritos
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton-quitar-favorito')) {
      const date = e.target.dataset.date;
      if (date) {
        eliminarFavorito(date);
      }
    }
  });
});