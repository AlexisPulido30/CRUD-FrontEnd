// api/users.ts
import api from "../config/axios";

//Funcion para obtener un usuario
export async function getUser() {
  try {
    const { data } = await api.get("/user"); 
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error al obtener usuario");
  }
}

//Funcion para obtener todos los usuarios
export async function fetchAllUsers() {
  try {
    const { data } = await api.get("/users");
    return data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error al obtener usuarios");
  }
}