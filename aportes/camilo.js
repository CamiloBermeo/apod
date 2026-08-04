const contenedor = document.querySelector('#listaFavoritos');

const columna = document.createElement('div');
columna.className = 'col';

columna.innerHTML = `
  <article class="card h-100 tarjeta-favorito">
    <img src="..." class="card-img-top imagen-favorito" alt="...">
    <div class="card-body cuerpo-favorito">
      <p class="card-text descripcion-favorito">Descripción</p>
      <button class="btn boton-quitar-favorito">Quitar de favoritos</button>
    </div>
  </article>
`;

contenedor.appendChild(columna);