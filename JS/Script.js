const API_URL = 'https://6859c2339f6ef9611154276d.mockapi.io/AC/Carros';
 
const container = document.getElementById('autos-cargados'); // Aquí se cargarán las tarjetas
 
async function Cargarcarro() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    CargarTarjetas(data);
  } catch (err) {
    console.error('Error al cargar los datos: ', err);
    container.innerHTML = '<p>Error al cargar los Autos</p>';
  }
}
 
function CargarTarjetas(autos) {
  container.innerHTML = ''; // Limpiar el contenido previo
 
  if (autos.length === 0) {
    container.innerHTML = "<p>No hay autos registrados</p>";
    return;
  }
 
  autos.forEach(auto => {
    container.innerHTML += `
      <div class="card" style="width:350px">
        <img src="${auto.imagen}" alt="Foto de perfil de ${auto.propietario}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${auto.propietario}</h5>
          <p class="card-text">Marca: ${auto.marca}</p>
          <p class="card-text">Modelo: ${auto.modelo}</p>
          <p class="card-text">Precio: $${auto.precio}</p>
          <button class="btn btn-primary btn-vermas" onclick="abrirModal('${auto.id}')">Ver Más</button>
        </div>
      </div>
    `;
  });
}
 
 
 
 
function abrirModal() {
  document.getElementById("modalAuto").style.display = "flex";
 
}
 
function cerrarModal() {
  document.getElementById("modalAuto").style.display = "none";
}
 
 
document.addEventListener("DOMContentLoaded", () => {
  // Cargar los datos de los autos al iniciar
  Cargarcarro();
});