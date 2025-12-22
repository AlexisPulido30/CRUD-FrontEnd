import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import AuthLayout from "./layouts/AuthLayout";
import IndexLayout from "./layouts/IndexLayout";
import RegistrosUsuarios from "./views/RegistrosUsuarios";
import Perfil from "./views/Perfil";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>

        {/* RUTA pRIVADA */}
        <Route element={<IndexLayout />}>
          <Route path="/registrosUsuarios" element={<RegistrosUsuarios/>} />
          <Route path="/perfil" element={<Perfil/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
