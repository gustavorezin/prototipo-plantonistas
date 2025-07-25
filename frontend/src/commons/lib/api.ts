import { isIOS } from "@commons/utils/isIOS";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (isIOS()) {
    const token = sessionStorage.getItem("ios_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message: string = error.response?.data?.message || "Erro inesperado.";
    const status = error.response?.status || 500;

    if (status === 401 && message.toLowerCase().includes("token")) {
      window.location.href = "/auth";
      toast.error("Sessão expirada. Faça login novamente.");
    }

    toast.error(message);

    return Promise.reject(error);
  }
);

export default api;
