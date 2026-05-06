// src/components/Sidebar.jsx
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <ul>
        <li className="py-2 pl-2 hover:bg-gray-700 rounded"><a href="/">Dashboard</a></li>
        <li className="py-2 pl-2 hover:bg-gray-700 rounded"><a href="/usuarios">Usuarios</a></li>
        <li className="py-2 pl-2 hover:bg-gray-700 rounded"><a href="/libros">Libros</a></li>
        <li className="py-2 pl-2 hover:bg-gray-700 rounded"><a href="/reservas">Reservas</a></li>
      </ul>
    </aside>
  );
}
