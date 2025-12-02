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

//funcion para eliminar los usuarios
export const deleteUser = async (id: number) => { 
  const token = localStorage.getItem("token");

  const { data } = await api.delete(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
};


// Función para editar usuario
export const updateUser = async (id: number, data: any) => {
  const token = localStorage.getItem("token");

  const response = await api.patch(`/user/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};




