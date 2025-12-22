import TablaUsuarios from "../components/tablaUsuarios";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../api/api";

export default function RegistrosUsuarios() {
  const { data: usuarios, isLoading, isError } = useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllUsers,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-2xl font-bold text-gray-700">Cargando usuarios...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-2xl font-bold text-red-600">Error al cargar usuarios</p>
      </div>
    );

  return <TablaUsuarios usuarios={usuarios || []} />;
}
