import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";

type AppLayoutProps = {
  user: any; // luego lo tipas
};

export default function AppLayout({ user }: AppLayoutProps) {
  const [open, setOpen] = useState(false);

  // Ajusta a tu data real cuando ya tengas role en backend
  const isAdmin = user?.role?.nombre === "ADMIN" || user?.role === "ADMIN" || user?.isAdmin === true;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onOpenSidebar={() => setOpen(true)} />
      <Sidebar isOpen={open} onClose={() => setOpen(false)} isAdmin={isAdmin} />

      {/* contenido */}
      <main className="p-5 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
