// components/TablaUsuarios.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalEditarUsuario from "./ModalEditarUsuario";
import ModalAgregarUsuario from "./ModalAgregarUser";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Trash2, Edit } from "lucide-react";
import { deleteUser } from "../api/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface TablaUsuariosProps {
    usuarios: any[];

}


interface JwtPayload {
    id: number;
}

export default function TablaUsuarios({ usuarios }: TablaUsuariosProps) {

    // estados para brir Modal para agregar usuario
    const [modalOpen, setModalOpen] = useState(false);

    //estados para biri modal y ver si hay usuario sellecionado
    const [modalEditOpen, setModalEditOpen] = useState(false); // editar usuario
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>(null);

    // estado para modal de eliminar
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState<number | null>(null);


    //id del usuario logueado
    const [loggedUserId, setLoggedUserId] = useState<number | null>(null);

    //Refrescar la informacion
    const queryClient = useQueryClient();

    useEffect(() => {
        try {
            const token = localStorage.getItem("AUTH_TOKEN"); 
            if (!token) return;

            const [, payloadBase64] = token.split(".");

            //  En esta parte se normaliza el jwt 
            const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
            const payloadString = atob(base64);
            const payload: JwtPayload = JSON.parse(payloadString);

            //Guardamos el id del usairos logueado
            setLoggedUserId(payload.id); 
        } catch (e) {
            console.error("No se pudo leer el JWT:", e);
        }
    }, []);


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

    // Cuando se hace clic en el botón de eliminar
    const handleDeleteClick = (id: number) => {
        setUsuarioAEliminar(id);
        setOpenDeleteModal(true);
    };

    // Confirmar eliminación desde el modal
    const handleConfirmDelete = () => {
        if (usuarioAEliminar == null) return;
        deleteMutation.mutate(usuarioAEliminar);
        setOpenDeleteModal(false);
    };


    // Abrir modal de edición
    const handleEdit = (usuario: any) => {
        setUsuarioSeleccionado(usuario);
        setModalEditOpen(true);
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
                        {(Array.isArray(usuarios) ? usuarios : []).map((usuario, index) => {
                            const esMismoUsuario = loggedUserId === usuario.id;

                            return (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">{usuario.nombre}</td>
                                    <td className="px-6 py-3">{usuario.correo}</td>
                                    <td className="px-6 py-3">{usuario.telefono}</td>
                                    <td className="px-6 py-3">
                                        {usuario.fechaNacimiento
                                            ? (() => {
                                                const fechaStr = String(usuario.fechaNacimiento).substring(0, 10);
                                                const [year, month, day] = fechaStr.split("-");
                                                return `${day}/${month}/${year}`;
                                            })()
                                            : "-"}
                                    </td>

                                    <td className="px-6 py-3">{usuario.genero}</td>
                                    <td className="flex justify-center px-6 py-3 space-x-4 text-center">
                                        {/* BOTON DE EDITAR */}
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => handleEdit(usuario)}
                                        >
                                            <Edit size={20} />
                                        </button>

                                        {/* BOTON DE ELILIMAR */}
                                        <button
                                            className="text-red-600 hover:text-red-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-red-600"
                                            disabled={esMismoUsuario}
                                            onClick={() => {
                                                if (esMismoUsuario) return; 
                                                handleDeleteClick(usuario.id);
                                            }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>



                </table>
            </div>

            {/* MODAL DE AGREGAR USUARIOS*/}
            <ModalAgregarUsuario
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)} />


            {/* Modal de confirmación de eliminación */}
            <ConfirmDeleteModal
                open={openDeleteModal}
                message="¿Seguro que deseas eliminar este usuario? Esta acción no se puede deshacer."
                loading={deleteMutation.isPending}
                onConfirm={handleConfirmDelete}
                onClose={() => {
                    if (!deleteMutation.isPending) {
                        setOpenDeleteModal(false);
                        setUsuarioAEliminar(null);
                    }
                }}
            />


            {/* MODAL EDITAR */}
            {modalEditOpen && usuarioSeleccionado && (
                <ModalEditarUsuario
                    isOpen={modalEditOpen}
                    onClose={() => setModalEditOpen(false)}
                    usuario={usuarioSeleccionado}
                />
            )}

        </div>
    );
}
