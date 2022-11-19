import { boot } from "quasar/wrappers";
import axios from "axios";

let token = localStorage.getItem("userToken");

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.defaults.headers.common["authorization"] = `Bearer ${token}`;

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});
export { api };
