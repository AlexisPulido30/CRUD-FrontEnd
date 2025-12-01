import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import api from '../config/axios'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query';

interface ModalAgregarUsuarioProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalAgregarUsuario({ isOpen, onClose }: ModalAgregarUsuarioProps) {
    const queryClient = useQueryClient();  // ← Mover aquí

    const initialValues = {
        name: '',
        email: '',
        number: '',
        fechaNacimiento: '',
        genero: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: initialValues
    });  // ← También debe ir arriba

    if (!isOpen) return null; // ← Ahora sí

    const handleRegister = async (formData: typeof initialValues) => {
        try {
            const payload = {
                nombre: formData.name,
                correo: formData.email,
                telefono: formData.number,
                fechaNacimiento: formData.fechaNacimiento,
                genero: formData.genero,
            }

            const { data } = await api.post('/register', payload)

            toast.success(data.message || 'Usuario registrado correctamente')

            setTimeout(() => {
                toast.success(`Correo enviado a: ${formData.email}`)
            }, 1200)

            reset()
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });

            onClose()
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.error || 'Error al registrar')
            } else {
                toast.error('Error al registrar')
            }
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white shadow-lg rounded-xl">

                {/* Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="mb-4 text-2xl font-bold text-center">Agregar Usuario</h2>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="block mb-1 text-gray-700">Nombre completo</label>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                            {...register('name', { required: 'El nombre es obligatorio*' })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block mb-1 text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                            {...register('email', {
                                required: 'El correo es obligatorio*',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no válido' }
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block mb-1 text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            placeholder="Número de teléfono"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                            {...register('number', {
                                required: 'El número es obligatorio*',
                                pattern: { value: /^[0-9]{10}$/, message: 'Debe tener 10 dígitos' }
                            })}
                        />
                        {errors.number && <ErrorMessage>{errors.number.message}</ErrorMessage>}
                    </div>

                    {/* Fecha nacimiento */}
                    <div>
                        <label className="block mb-1 text-gray-700">Fecha de nacimiento</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                            {...register('fechaNacimiento', { required: 'La fecha es obligatoria*' })}
                        />
                        {errors.fechaNacimiento && (
                            <ErrorMessage>{errors.fechaNacimiento.message}</ErrorMessage>
                        )}
                    </div>

                    {/* Género */}
                    <div>
                        <label className="block mb-1 text-gray-700">Género</label>
                        <select
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                            {...register('genero', { required: 'Selecciona un género*' })}
                        >
                            <option value="">Selecciona</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.genero && <ErrorMessage>{errors.genero.message}</ErrorMessage>}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                        Guardar Usuario
                    </button>
                </form>
            </div>
        </div>
    );
}
