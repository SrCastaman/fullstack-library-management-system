// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Libros from "./pages/Libros";
import Reservas from "./pages/Reservas";
import { useAuth } from "./context/AuthContext";
import LoginForm from "./components/Forms/LoginForm";
import { AlertProvider } from "./context/AlertContext";

function App() {
  const { auth, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if(loading) return <p>Cargando...</p>;

  if (!auth.isLogged) {return (
  <AlertProvider>
    <LoginForm/>
  </AlertProvider>)};


  return (
    <AlertProvider>
      <Router>
        <div className="flex h-screen">
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 z-50
              ${isSidebarOpen ? "translate x-0" : "-translate-x-full"}`}
          >
            <Sidebar/>
          </div>

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <div className="flex-1 flex flex-col">
            <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/libros" element={<Libros />} />
                <Route path="/reservas" element={<Reservas />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AlertProvider>
  );
}

export default App;
