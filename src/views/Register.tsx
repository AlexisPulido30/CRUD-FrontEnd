import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import api from '../config/axios'
import { toast } from 'sonner'

export default function Register() {
  const navigate = useNavigate()

  const initialValues = {
    name: '',
    email: '',
    number: '',
    fechaNacimiento: '',
    genero: ''
  }

  const { register, handleSubmit, formState: { errors }, reset } =
    useForm({ defaultValues: initialValues })

  const handleRegister = async (formData: typeof initialValues) => {
    try {
      const payload = {
        nombre: formData.name,
        correo: formData.email,
        telefono: formData.number,
        fechaNacimiento: formData.fechaNacimiento,
        genero: formData.genero,
      }

      await api.post('/register', payload)

      
      toast.success('Usuario registrado correctamente')
      
      setTimeout(() => {
        toast.success(`Correo enviado a: ${formData.email}`)
      }, 800)

      setTimeout(() => {
        navigate('/registrosUsuarios')
      }, 1200)

      reset()
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error || 'Error al registrar')
      } else {
        toast.error('Error al registrar')
        console.error(error)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-16">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl"
      >
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
          Crear cuenta
        </h1>

        {/* Nombre */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm text-gray-600">Nombre Completo</label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="w-full p-2 text-sm text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            {...register('name', { required: 'El nombre es obligatorio*' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-gray-600">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Correo Electrónico"
            className="w-full p-2 text-sm text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            {...register('email', {
              required: 'El email es obligatorio*',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail no válido' }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Número de teléfono */}
        <div className="space-y-2">
          <label htmlFor="number" className="text-sm text-gray-600">Número de Teléfono</label>
          <input
            id="number"
            type="text"
            inputMode="numeric"
            placeholder="Ingresa tu número telefónico"
            className="w-full p-2 text-sm text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            {...register('number', {
              required: 'El número telefónico es obligatorio*',
              pattern: { value: /^[0-9]{10}$/, message: 'El número debe tener 10 dígitos numéricos' }
            })}
          />
          {errors.number && <ErrorMessage>{errors.number.message}</ErrorMessage>}
        </div>

        {/* Fecha de nacimiento */}
        <div className="space-y-2">
          <label htmlFor="fechaNacimiento" className="text-sm text-gray-600">Fecha de Nacimiento</label>
          <input
            id="fechaNacimiento"
            type="date"
            className="w-full p-2 text-sm text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            {...register('fechaNacimiento', { required: 'La fecha de nacimiento es obligatoria*' })}
          />
          {errors.fechaNacimiento && <ErrorMessage>{errors.fechaNacimiento.message}</ErrorMessage>}
        </div>

        {/* Género */}
        <div className="space-y-2">
          <label htmlFor="genero" className="text-sm text-gray-600">Género</label>
          <select
            id="genero"
            className="w-full p-2 text-sm text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            {...register('genero', { required: 'Selecciona un género*' })}
          >
            <option value="">Selecciona una opción</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
          {errors.genero && <ErrorMessage>{errors.genero.message}</ErrorMessage>}
        </div>

        {/* Botón */}
        <input
          type="submit"
          className="w-full p-2 font-semibold text-white transition bg-blue-800 rounded-lg hover:bg-blue-600"
          value="Crear Cuenta"
        />

        <nav className="text-center">
          <Link className="block mt-3 text-sm text-blue-800 hover:underline" to="/auth/login">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </nav>
      </form>
    </div>
  )
}
