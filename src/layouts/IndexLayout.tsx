import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from '../api/api'
import RegistrosUsuarios from "../views/RegistrosUsuarios";

export default function IndexLayout() {
  // React Query para obtener usuario autenticado
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  
  // Mientras carga
  if (isLoading) return <p>Cargando...</p>;

  // Si hay error redirige al login
  if (isError || !data) return <Navigate to="/auth/login" replace />;

  // Si hay datos del usuario
  return <RegistrosUsuarios />
}
