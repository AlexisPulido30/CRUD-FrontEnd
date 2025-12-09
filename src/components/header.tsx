import { useQueryClient } from '@tanstack/react-query'

export default function Header() {
     const queryClient = useQueryClient()

     const logout = () =>{
      localStorage.removeItem('AUTH_TOKEN')
      queryClient.invalidateQueries({queryKey: ['user']})
     }
  return (

    <header className="flex items-center justify-between px-6 py-3 text-white bg-gray-900 shadow-md">
      <div className="flex items-center space-x-2">
        <span className="text-2xl">💻</span>
        <h1 className="text-lg font-semibold">CRUD</h1>
      </div>
      <button className="px-4 py-2 text-sm font-medium transition-all bg-red-600 rounded-lg hover:bg-red-700"
      onClick={logout}>
        Cerrar sesión
      </button>
    </header>
  );
}
