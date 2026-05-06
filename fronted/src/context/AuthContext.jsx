import { createContext, useState, useContext, useMemo, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: "", isLogged: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      setAuth(JSON.parse(saved));
    }
    setLoading(false); 
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/login", { username, password });
      const newAuth = { token: res.data.token, isLogged: true };
      setAuth(newAuth);
      localStorage.setItem("auth", JSON.stringify(newAuth));
      return true;
    } catch (err) {
      console.error("Error en login:", err);
      return false;
    }
  };

  const logout = () => {
    setAuth({ token: "", isLogged: false });
    localStorage.removeItem("auth");
  };

  const api = useMemo(() => {
    const instance = axios.create({ baseURL: "http://localhost:8080/api" });
    instance.interceptors.request.use(config => {
      if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`;
      return config;
    });
    return instance;
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, api, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
