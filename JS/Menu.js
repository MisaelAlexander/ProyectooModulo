/*Enlasamos la API */
const API_URL = "https://6859c2339f6ef9611154276d.mockapi.io/AC/Carros";
const IMG_API_URL = 'https://api.imgbb.com/1/upload?key=99f84e0bab707d47c84f0499ce6af4d7';
const tbody= document.getElementById('carros-tbody');


/*Funcion principal para mostrar autos*/
async function ObtenerAutos() {
    try {
        /*Mostramos mensaje de carga */
        /*Era un mensaje de carga pero al final opte por una bolita rodando */
        document.querySelector("#tabla tbody").innerHTML = `
                    <tr>
                        <td colspan="11" class="text-center">
                            <div class="spinner-border text-primary" role="status">
                            </div>
                        </td>
                    </tr>`;
                    /*Vinculamos la API*/
        const respuesta = await fetch(API_URL);
        /*En caso falle la conexion*/
        if (!respuesta.ok) throw new Error(" Fallo en la conexion");
        /*Transformamos la respuesta a json*/
        const datos = await respuesta.json();
        /* Cargamos el evento crear tabla*/
        CrearTabla(datos);
    }
    catch(error) { 
        /*Tenemos e pro */
        document.querySelector("#tabla tbody").innerHTML = `
                    <tr>
                        <td colspan="11" class="text-center text-danger">
                            Error al cargar los datos: ${error.message}
                        </td>
                    </tr>`;
    }
}
/*Ingreso de los datos desde la tabla*/
function CrearTabla(carros) {
    const tbody = document.querySelector("#tabla tbody"); 
    if(!carros || carros.length === 0) { /*En caso no halla nada */
        tbody.innerHTML = `
         <tr>
            <td colspan="11" class="text-center text-muted">
                No hay vehículos registrados
            </td>
        </tr>`;
        return;
    }
    tbody.innerHTML = '';
    carros.forEach(carro => {
        tbody.innerHTML += `
    <tr>
                    <td>${carro.id}</td>
                    <td>${carro.marca}</td>
                    <td>${carro.modelo}</td>
                    <td>${carro.anio}</td>
                    <td>${carro.propietario}</td>
                    <td class="small">${carro.observaciones || "Sin observaciones"}</td>
                    <td>$${carro.precio ? carro.precio.toLocaleString() : "N/A"}</td>
                    <td><img src="${carro.imagen}" alt="${carro.marca}" class="imgcarro"></td>
                    <td>${carro.tipodevehiculo}</td>
                    <td>${carro.combustible}</td>
                    <td>
                        <div class="d-flex flex-wrap">
                            <button class="btn btn-warning btn-sm" onclick="EditarAuto('${carro.id}', '${carro.marca}','${carro.modelo}','${carro.anio}','${carro.propietario}','${carro.observaciones}','${carro.precio}','${carro.tipodevehiculo}','${carro.combustible}')">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="EliminarAuto('${carro.id}')">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </div>
                    </td>
                </tr>
        `;
    });
   
}
/*Borrar carros*/
async function EliminarAuto(id) {
    const confirmacion = confirm('¿Eliminar a esta carro?');
    if(confirmacion)
    {
        await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        ObtenerAutos();
        alert("El registro fue eliminado");
    }
    else
    {
        alert("Se canceló la acción");
        return;
    }
}
// Cargar los datos cuando la página esté lista
document.addEventListener("DOMContentLoaded", ObtenerAutos);

/*Agregar Vehiculos */
const modal = document.getElementById("dialogAgregar");
const btnAgregar = document.getElementById("btnAbrirDialog");
const btnCerrar = document.getElementById("btnCerrarModal");
const tipodevehiculo = document.getElementById("opciones-vehiculo");
const combustible = document.getElementById("opciones-combustible");
const imagen = document.getElementById("imagen-file");
const anio = document.getElementById("anio");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const vendedor = document.getElementById("vendedor");
const precio = document.getElementById("precio");
const id = document.getElementById("auto-id");
const imgurl = document.getElementById("imagen-url");
const comentario = document.getElementById("comentario");

btnAgregar.addEventListener("click",()=>{
    modal.showModal();
  });
btnCerrar.addEventListener("click",()=>{
    modal.close();
  });

  /*Carga de la imagen */
  async function subirimagen(file) 
  {
  const fd = new FormData();
  fd.append('image', file) 
  const res = await fetch(IMG_API_URL, {method:'POST',body: fd});
  const obj = await res.json();
  return obj.data.url;
  }
 
document.getElementById("dialogAgregar").addEventListener("submit",async e => {
    e.preventDefault();//Evita que el formulario se envie
    let imageURL = imgurl.value;
    if(imagen.files.length > 0)
    {
        imageURL = await subirimagen(imagen.files[0]);
    }
    const datos =
    {
        marca: marca.value,
        modelo: modelo.value,
        anio: anio.value,
        propietario: vendedor.value,
        observaciones: comentario.value,
        precio: precio.value,
        imagen: imageURL,
        tipodevehiculo: tipodevehiculo.value,
        combustible: combustible.value
    }
    if(id.value)
    {
        await fetch(`${API_URL}/${id.value}`,{
            method:'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        });
        alert("Registro Actualizado")
        ObtenerAutos();
        modal.close();
        
    }
    else
    {
        await fetch(API_URL,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        });
        alert("Registro Agregado")
        ObtenerAutos();
        modal.close();
    }
    
  });//Fin del formulario

  function EditarAuto(id,marca,modelo,anio,propietario,observaciones,precio,tipodevehiculo,combustible)
  {
document.getElementById("auto-id").value = id;    
document.getElementById("marca").value = marca;
document.getElementById("modelo").value = modelo;
document.getElementById("anio").value = anio;
document.getElementById("vendedor").value = propietario;
document.getElementById("comentario").value = observaciones;
document.getElementById("precio").value = precio;
document.getElementById("opciones-vehiculo"). value = tipodevehiculo;
document.getElementById("imagen-file"). value = '';
document.getElementById("opciones-combustible").value = combustible;
modal.showModal();
  }


  