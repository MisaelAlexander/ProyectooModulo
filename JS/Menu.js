/*Enlasamos la API */
const API_URL = "https://6859c2339f6ef9611154276d.mockapi.io/AC/Carros";
const IMG_API_URL = 'https://api.imgbb.com/1/upload?key=99f84e0bab707d47c84f0499ce6af4d7';
/*Funcion principal para mostrar autos*/
async function ObtenerAutos() {
    try {
        /*Mostramos mensaje de carga */
        /*Era un mensaje de carga peroa l final opte por una bolita rodando */
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
        if (!respuesta.ok) throw new Error("Error al obtener datos");
        /*Transformamos la respuesta a json*/
        const datos = await respuesta.json();
        /* Cargamos el evento crear tabla*/
        CrearTabla(datos);
    }
    catch(error) { 
        /*Tenemos e pro */
        console.error("Error al cargar autos: ", error);
        document.querySelector("#tabla tbody").innerHTML = `
                    <tr>
                        <td colspan="11" class="text-center text-danger">
                            Error al cargar los datos: ${error.message}
                        </td>
                    </tr>`;
    }
}

function CrearTabla(carros) {
    const tabla = document.querySelector("#tabla tbody"); 
    if(!carros || carros.length === 0) { /*En caso no halla nada */
        tabla.innerHTML = `
         <tr>
            <td colspan="11" class="text-center text-muted">
                No hay vehículos registrados
            </td>
        </tr>`;
        return;
    }
    /*En casi no halla obervaciones no msotrar obervaciones */
    tabla.innerHTML = carros.map(carro => `
                <tr>
                    <td>${carro.id}</td>
                    <td>${carro.marca}</td>
                    <td>${carro.modelo}</td>
                    <td>${carro.anio}</td>
                    <td>${carro.propietario}</td>
                    <td class="small">${carro.observaciones || "Sin observaciones"}</td>
                    <td>$${carro.precio ? carro.precio.toLocaleString() : "N/A"}</td>
                    <td>${carro.imagen ? `<img src="${carro.imagen}" alt="${carro.marca}" class="imgcarro">` : "Sin imagen"}</td>
                    <td>${carro.tipodevehiculo}</td>
                    <td>${carro.combustible}</td>
                    <td>
                        <div class="d-flex flex-wrap">
                            <button class="btn btn-warning btn-sm" onclick="EditarAuto('${carro.id}')">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="EliminarAuto('${carro.id}')">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </div>
                    </td>
                </tr>
            `).join("");
}
/*Borrar Personas*/
async function EliminarAuto(id) {
    const confirmacion = confirm('¿Eliminar a esta persona?');
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