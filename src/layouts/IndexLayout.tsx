import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/api";
import AppLayout from "./AppLayout";

export default function IndexLayout() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !data) return <Navigate to="/auth/login" replace />;

  return <AppLayout user={data} />;
}
