import { useQueryClient } from "@tanstack/react-query";

type HeaderProps = {
  onOpenSidebar?: () => void;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 text-white shadow-md bg-slate-900">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          className="px-3 py-2 bg-gray-800 rounded-lg md:hidden hover:bg-gray-700"
          onClick={onOpenSidebar}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-2xl">💻</span>
          <h1 className="text-lg font-semibold">CRUD</h1>
        </div>
      </div>

      <button
        className="px-4 py-2 text-sm font-medium transition-all bg-red-600 rounded-lg hover:bg-red-700"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </header>
  );
}
