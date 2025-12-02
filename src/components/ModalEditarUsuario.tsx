import { useQueryClient, useMutation } from '@tanstack/react-query';
import ErrorMessage from '../components/ErrorMessage';
import { useForm } from "react-hook-form";
import { updateUser } from "../api/api";
import { toast } from 'sonner';


interface ModalEditarUsuarioProps {
    isOpen: boolean;  
    onClose: () => void; 
    usuario: any;     
}

//Estructura que se mandara a mi backend 
interface UpdatePayload {
    id: number;
    data: {
        nombre: string;
        correo: string;
        telefono: string;
        fechaNacimiento: string;
        genero: string;
    };
}

export default function ModalEditarUsuario({ isOpen, onClose, usuario }: ModalEditarUsuarioProps) {

    // modal cerrado
    if (!isOpen) return null;

    const queryClient = useQueryClient();

    // Formulario con valores iniciales precargados del usuario
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: usuario?.nombre || "",
            email: usuario?.correo || "",
            number: usuario?.telefono || "",
            fechaNacimiento: usuario?.fechaNacimiento?.substring(0, 10) || "",
            genero: usuario?.genero || ""
        }
    });

    // Mutacion para editar usuario
    const mutation = useMutation({
        
        mutationFn: ({ id, data }: UpdatePayload) => updateUser(id, data),

        
        onSuccess: () => {
            toast.success("Usuario actualizado correctamente"); 
            queryClient.invalidateQueries({ queryKey: ["allUsers"] }); 
            onClose(); 
        },

        onError: () => toast.error("Error al actualizar usuario")
    });

    // Funcion qeu se ejecuta al enviar el fomrilaro 
    const handleUpdate = (form: any) => {

        console.log("Datos enviados al backend", form)
        mutation.mutate({
            id: usuario.id,  
            data: {
                nombre: form.name,
                correo: form.email,
                telefono: form.number,
                fechaNacimiento: form.fechaNacimiento,
                genero: form.genero
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            {/* Contenedor del modal */}
            <div className="relative w-full max-w-md p-6 bg-white shadow-lg rounded-xl">

                {/* Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
                >
                    ✕
                </button>
                
                <h2 className="mb-4 text-2xl font-bold text-center">Editar Usuario</h2>
                <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">

                    {/* Input: Nombre */}
                    <div>
                        <label className="block mb-1">Nombre completo</label>
                        <input
                            className="w-full p-2 border rounded-lg"
                            {...register("name", { required: "El nombre es obligatorio*" })}
                        />
                        {errors.name && <ErrorMessage>{String(errors.name.message)}</ErrorMessage>}
                    </div>

                    {/* Input: Correo */}
                    <div>
                        <label className="block mb-1">Correo</label>
                        <input
                            className="w-full p-2 border rounded-lg"
                            {...register("email", { required: "El correo es obligatorio*" })}
                        />
                        {errors.email && <ErrorMessage>{String(errors.email.message)}</ErrorMessage>}
                    </div>

                    {/* Input: Teléfono */}
                    <div>
                        <label className="block mb-1">Teléfono</label>
                        <input
                            className="w-full p-2 border rounded-lg"
                            {...register("number", { required: "El teléfono es obligatorio*" })}
                        />
                        {errors.number && <ErrorMessage>{String(errors.number.message)}</ErrorMessage>}
                    </div>

                    {/* Input: Fecha nacimiento */}
                    <div>
                        <label className="block mb-1">Fecha nacimiento</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded-lg"
                            {...register("fechaNacimiento", { required: "Campo obligatorio*" })}
                        />
                        {errors.fechaNacimiento && <ErrorMessage>{String(errors.fechaNacimiento.message)}</ErrorMessage>}
                    </div>

                    {/* Input: Género */}
                    <div>
                        <label className="block mb-1">Género</label>
                        <select
                            className="w-full p-2 border rounded-lg"
                            {...register("genero", { required: "Selecciona un género*" })}
                        >
                            <option value="">Selecciona</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.genero && <ErrorMessage>{String(errors.genero.message)}</ErrorMessage>}
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Actualizar usuario
                    </button>

                </form>
            </div>
        </div>
    );
}
