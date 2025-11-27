// src/layouts/AuthLayout.jsx
import { Component } from "react";
import { Outlet } from "react-router-dom";

export default class AuthLayout extends Component {
  render() {
    return (
      <div className="flex flex-col min-h-screen text-white ">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 text-white bg-gray-900 shadow-md">
          {/* Icono de programador */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💻</span>
            <h1 className="text-lg font-semibold">CRUD</h1>
          </div>

          {/* Botón cerrar sesión */}
          <button className="px-4 py-2 text-sm font-medium transition-all bg-red-600 rounded-lg hover:bg-red-700">
            Cerrar sesión
          </button>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    );
  }
}
