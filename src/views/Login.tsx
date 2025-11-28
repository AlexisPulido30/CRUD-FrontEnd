import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage'
import api from '../config/axios'
import { toast } from 'sonner'

export default function Login() {
  const initialValues = {
    correo: '',
    password: '',
  }
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

 const handleLogin = async (formData: typeof initialValues) => {
  try {
    const { data } = await api.post("/auth/login", formData);

    localStorage.setItem("AUTH_TOKEN", data.token);

    toast.success("Inicio de sesión exitoso");

    setTimeout(() => {
      navigate("/registrosUsuarios");
    }, 800);

  } catch (error: any) {
    const msg = error.response?.data?.error || "Error al iniciar sesión";
    toast.error(msg);
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen py-16">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl"
      >
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
          Iniciar Sesion
        </h1>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-gray-600">Correo Electrónico</label>
          <input
            id="correo"
            type="email"
            autoComplete="email"
            placeholder="Correo Electrónico"
            className="w-full p-2 text-sm text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            {...register('correo', {
              required: 'El email es obligatorio*',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'E-mail no válido'
              }
            })}
          />
          {errors.correo && <ErrorMessage>{errors.correo.message}</ErrorMessage>}
        </div>


        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block mb-2 text-lg font-medium text-slate-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            className="w-full p-2 text-sm text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El password debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        {/* Boton */}
        <input
          type="submit"
          className="w-full p-2 font-semibold text-white transition bg-blue-800 rounded-lg hover:bg-blue-600"
          value="Inicar Sesion"
        />

        {/*   link para navegar a registro */}
        <nav className="text-center">
          <Link className="block mt-3 text-sm text-blue-800 hover:underline" to="/auth/register">
            ¿No tienes una cuenta? Registrate aqui.
          </Link>
        </nav>
      </form>
    </div>
  )
}





