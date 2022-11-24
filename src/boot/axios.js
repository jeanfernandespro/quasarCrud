import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use((request) => {
    // Buscando seu token salvo no localstorage ou qualquer outro local
    const token = localStorage.getItem("userToken");

    if(token) {
        // Authorization geralmente é o header padrão para envio de token, mas isso não é uma regra. O endpoint pode requisitar outro header.
        request.headers.Authorization = `Bearer ${token}`;
    }
    // Este return é necessário para continuar a requisição para o endpoint.
    return request;
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});
export { api };
