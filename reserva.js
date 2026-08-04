
function construirTarjeta(info) {
    const contenedor = document.querySelector('#listaFavoritos');
    if (!contenedor) return;

    const columna = document.createElement('div');
    columna.className = 'col';

    columna.innerHTML = `
    <article class="card h-100 tarjeta-favorito">
        <img src=${info.url} class="card-img-top imagen-favorito" alt="...">
        <div class="card-body cuerpo-favorito">
            <h4>${info.title}</h4>
            <p class="card-text descripcion-favorito">${info.explanation}</p>
            <button class="btn boton-quitar-favorito">Quitar de favoritos</button>
        </div>
    </article>
    `;

    contenedor.appendChild(columna);
}
document.addEventListener("DOMContentLoaded", () => {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos.forEach((info) => construirTarjeta(info));
});