import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || "Erro inesperado.";
    const status = error.response?.status || 500;

    if (status === 401) {
      toast.error("Sessão expirada. Faça login novamente.");
      window.location.href = "/auth";
    }

    toast.error(message);

    return Promise.reject(error);
  }
);

export default api;
