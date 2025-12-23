import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";
import { getUser, updateUser } from "../api/api";

interface UpdatePayload {
  id: number;
  data: {
    nombre: string;
    telefono: string;
    fechaNacimiento: string;
    genero: string;
  };
}

export default function Perfil() {
  const queryClient = useQueryClient();

  const { data: usuario, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      number: "",
      fechaNacimiento: "",
      genero: "",
    },
  });

  useEffect(() => {
    if (!usuario) return;

    reset({
      name: usuario?.nombre || "",
      email: usuario?.correo || "",
      number: usuario?.telefono || "",
      fechaNacimiento: usuario?.fechaNacimiento?.substring(0, 10) || "",
      genero: usuario?.genero || "",
    });
  }, [usuario, reset]);

  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdatePayload) => updateUser(id, data),
    onSuccess: () => {
      toast.success("Perfil actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] }); 
    },
    onError: () => toast.error("Error al actualizar el perfil ❌"),
  });

  const handleUpdate = (form: any) => {
    if (!usuario?.id) return;

    mutation.mutate({
      id: usuario.id,
      data: {
        nombre: form.name, 
        telefono: form.number,
        fechaNacimiento: form.fechaNacimiento,
        genero: form.genero,
      },
    });
  };

  const formatDate = (value?: string) => {
    if (!value) return "—";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
  };

  const roleName =
    usuario?.role?.nombre || usuario?.role || (usuario?.isAdmin ? "ADMIN" : "USER");

  const isActivo = usuario?.activo ?? true;

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-2xl font-bold text-gray-700">Cargando perfil...</p>
      </div>
    );

  if (isError || !usuario)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-2xl font-bold text-red-600">Error al cargar perfil</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* FORMULARIO PERFIL */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center">Mi perfil</h2>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block mb-1">Nombre completo</label>
            <input
              className="w-full p-2 border rounded-lg"
              {...register("name", { required: "El nombre es obligatorio*" })}
            />
            {errors.name && <ErrorMessage>{String(errors.name.message)}</ErrorMessage>}
          </div>

          {/* Correo (recomendado: readOnly) */}
          <div>
            <label className="block mb-1">Correo</label>
            <input
              className="w-full p-2 border rounded-lg bg-gray-50"
              readOnly
              {...register("email", { required: "El correo es obligatorio*" })}
            />
            {errors.email && <ErrorMessage>{String(errors.email.message)}</ErrorMessage>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block mb-1">Teléfono</label>
            <input
              className="w-full p-2 border rounded-lg"
              {...register("number", { required: "El teléfono es obligatorio*" })}
            />
            {errors.number && <ErrorMessage>{String(errors.number.message)}</ErrorMessage>}
          </div>

          {/* Fecha nacimiento */}
          <div>
            <label className="block mb-1">Fecha nacimiento</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              {...register("fechaNacimiento", { required: "Campo obligatorio*" })}
            />
            {errors.fechaNacimiento && (
              <ErrorMessage>{String(errors.fechaNacimiento.message)}</ErrorMessage>
            )}
          </div>

          {/* Género */}
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

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {mutation.isPending ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>


      {/* TARJETA RESUMEN */}
<div className="p-6 bg-white shadow-lg rounded-xl">
  <h3 className="mb-6 text-xl font-semibold text-center">Resumen de mi cuenta</h3>

  <div className="flex flex-col gap-6 md:flex-row md:items-start">
    {/* FOTO */}
    <div className="flex justify-center md:justify-start">
      <div className="flex items-center justify-center w-32 h-32 text-4xl font-bold text-white rounded-xl bg-slate-900">
        {usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() : "U"}
      </div>
    </div>

    {/* INFO */}
    <div className="flex-1 space-y-4">
      <div>
        <p className="text-sm text-gray-500">Nombre</p>
        <p className="text-lg font-semibold">{usuario?.nombre || "—"}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Correo</p>
        <p className="font-medium">{usuario?.correo || "—"}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div>
          <p className="text-sm text-gray-500">Rol</p>
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white rounded-full bg-slate-900">
            {roleName || "—"}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              isActivo ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {isActivo ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Creado</p>
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
            {formatDate(usuario?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
