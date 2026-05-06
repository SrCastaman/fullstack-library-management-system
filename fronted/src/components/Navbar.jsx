import React from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ toggleSidebar }) {
  const { logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-blue-700"
        >
          <Menu size={24}/>
        </button>
        <h1 className="text-xl font-bold">Library Dashboard</h1>
      </div>
      <div className="ml-auto">
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
