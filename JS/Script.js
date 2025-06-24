const API_URL = 'https://6859c2339f6ef9611154276d.mockapi.io/AC/Carros';
const container = document.getElementById('autos-cargados');
const modal = document.getElementById("modal");
 
// Cargar autos al iniciar
document.addEventListener("DOMContentLoaded", () => {
  Cargarcarro();
});
 
// Cargar los autos desde la API
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
 
// Crear las tarjetas con los datos recibidos
function CargarTarjetas(autos) {
  container.innerHTML = '';
 
  if (autos.length === 0) {
    container.innerHTML = "<p>No hay autos registrados</p>";
    return;
  }
 
  autos.forEach(auto => {
    container.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${auto.imagen}" class="card-img-top" alt="Auto de ${auto.propietario}">
        <div class="card-body">
          <h5 class="card-title">${auto.propietario}</h5>
          <p class="card-text">Marca: ${auto.marca}</p>
          <p class="card-text">Modelo: ${auto.modelo}</p>
          <p class="card-text">Precio: $${auto.precio}</p>
          <button class="btn btn-primary" onclick="abrirModalConDatos(
            '${auto.id}','${auto.marca}','${auto.modelo}','${auto.anio}','${auto.propietario}','${auto.observaciones}','${auto.precio}','${auto.tipodevehiculo}','${auto.combustible}'
          )">
            Ver Más
          </button>
        </div>
      </div>
    `;
  });
}
 
// Abrir modal con los datos del auto
function abrirModalConDatos(id, marca, modelo, anio, propietario, observaciones, precio, tipodevehiculo, combustible) {
  console.log("Datos del modal:", { id, marca, modelo, anio, propietario, observaciones, precio, tipodevehiculo, combustible });
 
  document.getElementById("idEditar").value = id;
  document.getElementById("Marca").textContent = marca;
  document.getElementById("Modelo").textContent = modelo;
  document.getElementById("Anio").textContent = anio;
  document.getElementById("Propietario").textContent = propietario;
  document.getElementById("Observaciones").textContent = observaciones;
  document.getElementById("Precio").textContent = `$${precio}`;
  document.getElementById("TipoVehiculo").textContent = tipodevehiculo;
  document.getElementById("Combustible").textContent = combustible;
 
  modal.showModal();
}
 
// Cerrar el modal
function cerrarModal() {
  modal.close();
}