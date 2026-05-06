import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const success = await login(username, password);
        if (!success) {
          showAlert("error", "Error de autenticaicón", "Usuario o contraseña incorrectos");
        }
    } catch (err) {
        showAlert("error", "Error en login", "Ha ocurrido un error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login Bibliotecario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
