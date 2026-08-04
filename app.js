const btnAgregarFavoritos = document.getElementById('btn-agregar-favoritos')

btnAgregarFavoritos.addEventListener("click", async ()=>{
  try{
    const infoApod = await getApod();
    const favoritos = JSON.parse(localStorage.getItem("favoritos"))|| [];
    favoritos.push(infoApod);
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
    alert("Añadido a favoritos")
  } catch(error){

  };
});
