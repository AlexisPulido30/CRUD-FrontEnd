// components/TablaUsuarios.tsx
import { Trash2, Edit } from "lucide-react";
import { useState } from "react";
import ModalAgregarUsuario from "./ModalAgregarUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/api";
import { toast } from "sonner";
interface TablaUsuariosProps {
    usuarios: any[];
}

export default function TablaUsuarios({ usuarios }: TablaUsuariosProps) {

    const [modalOpen, setModalOpen] = useState(false);

    //Refrescar la informacion
    const queryClient = useQueryClient();


    //mutacion para eliminar usuario
    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("Usuario eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["allUsers"] }); 
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error);
        }
    });


    //funcion para el boton de eliminar 
    const handleDelete = (id: number) => {
        if (confirm("¿Seguro que deseas eliminar este usuario?")) {
            deleteMutation.mutate(id);
        }
    };


    return (
        <div className="p-6">

            <div className="mb-4 text-center">
                <h1 className="text-xl font-bold text-gray-800">
                    Registros de Usuarios
                </h1>
            </div>

            {/* BOTON*/}
            <div className="flex justify-end mb-4">
                <button onClick={() => setModalOpen(true)}
                    className="px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
                    Agregar Usuario
                </button>
            </div>


            {/* TABLA DE MIS USUARIOS*/}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="text-white bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left">Nombre completo</th>
                            <th className="px-6 py-3 text-left">Correo electrónico</th>
                            <th className="px-6 py-3 text-left">Número de teléfono</th>
                            <th className="px-6 py-3 text-left">Fecha de nacimiento</th>
                            <th className="px-6 py-3 text-left">Género</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(Array.isArray(usuarios) ? usuarios : []).map((usuario, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-3">{usuario.nombre}</td>
                                <td className="px-6 py-3">{usuario.correo}</td>
                                <td className="px-6 py-3">{usuario.telefono}</td>
                                <td className="px-6 py-3">
                                    {usuario.fechaNacimiento
                                        ? new Date(usuario.fechaNacimiento).toLocaleDateString("es-MX")
                                        : "-"}
                                </td>
                                <td className="px-6 py-3">{usuario.genero}</td>
                                <td className="flex justify-center px-6 py-3 space-x-4 text-center">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <Edit size={20} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(usuario.id)}>
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* MODAL DE AGREGAR USUARIOS*/}
            <ModalAgregarUsuario isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}
