import { Edit, Trash2 } from "lucide-react";

export default function RegistrosUsuarios() {
  const usuarios = [
    {
      nombre: "Luis Alexis Pulido Lugo",
      correo: "alexis@gmail.com",
      telefono: "55-68-72-74-33",
      fechaNacimiento: "30-10-2002",
      genero: "Masculino",
    },
    {
      nombre: "Esmeralda Jimenez Vazques",
      correo: "esme@gmail.com",
      telefono: "55-63-43-32-12",
      fechaNacimiento: "15-09-2003",
      genero: "Femenino",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold text-center text-gray-800">Registros de Usuarios</h1>

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
            {usuarios.map((usuario, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{usuario.nombre}</td>
                <td className="px-6 py-3">{usuario.correo}</td>
                <td className="px-6 py-3">{usuario.telefono}</td>
                <td className="px-6 py-3">{usuario.fechaNacimiento}</td>
                <td className="px-6 py-3">{usuario.genero}</td>
                <td className="flex justify-center px-6 py-3 space-x-4 text-center">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
