import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean; // pásalo desde tu estado (ej. user.role === "ADMIN")
};

const linkBase = "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors";
const linkActive = "bg-blue-600 text-white";
const linkInactive = "text-slate-200 hover:bg-slate-800 hover:text-white";

export default function Sidebar({ isOpen, onClose, isAdmin = false }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-50 md:z-30 inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          <div className="font-semibold tracking-wide text-white">Panel</div>

          <button
            onClick={onClose}
            className="md:hidden text-slate-300 hover:text-white"
            aria-label="Cerrar menú"
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="p-3 space-y-1">
          <NavLink
            to="/registrosUsuarios"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
            onClick={onClose}
          >
            <span>👤</span>
            <span>Usuarios</span>
          </NavLink>

          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
            onClick={onClose}
          >
            <span>⚙️</span>
            <span>Mi perfil</span>
          </NavLink>

          {isAdmin && (
            <>
              <div className="px-4 mt-3 mb-1 text-xs tracking-wider uppercase text-slate-400">
                Admin
              </div>

              <NavLink
                to="/roles"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
                onClick={onClose}
              >
                <span>🔐</span>
                <span>Roles y permisos</span>
              </NavLink>

              <NavLink
                to="/audit"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
                onClick={onClose}
              >
                <span>📋</span>
                <span>Historial</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Footer Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-xs border-t border-slate-800 text-slate-400">
          CRUD • Alexis Pulido 
        </div>
      </aside>
    </>
  );
}
