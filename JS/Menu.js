const API_URL = "https://mockapi.io/projects/6859c2339f6ef9611154276e";

async function ObtenerAutos() 
{
const Res = await fetch(API_URL);
const Data = await Res.Json();
CreaeTabla(Data);    
}