import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // IMPORTANTE: usar api del contexto

export function useAxios(endpoint, method = "GET", body = null) {
  const { api } = useAuth(); // Tomamos la instancia que ya tiene el interceptor
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(method === "GET");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (method.toUpperCase() !== "GET") return;

    let isMounted = true;
    setLoading(true);

    api.get(endpoint)
      .then(res => {
        if (isMounted) setData(res.data);
      })
      .catch(err => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint, method, api]); // AÑADIMOS api como dependencia

  const sendRequest = async (customBody = null) => {
    setLoading(true);
    setError(null);

    try {
      let res;
      const payload = customBody || body;

      switch (method.toUpperCase()) {
        case "POST":
          res = await api.post(endpoint, payload);
          break;
        case "PUT":
          res = await api.put(endpoint, payload);
          break;
        case "PATCH":
          res = await api.patch(endpoint, payload);
          break;
        case "DELETE":
          res = await api.delete(endpoint);
          break;
        default:
          res = await api.get(endpoint);
      }

      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, setData, sendRequest };
}
