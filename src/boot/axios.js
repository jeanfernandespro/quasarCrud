import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    if (error.response && error.response.status === 401) {
      const res = await refreshToken(error);
      const token = res.data.data.token;
      config.headers["Authorization"] = `Bearer ${token}`;
      return api(config);
    }
    console.log("testee");
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("logout");
    window.location.href = "/";
    return Promise.reject(error);
  }
);

async function refreshToken(error) {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = localStorage.getItem("refreshToken");
      const parameters = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      };

      const body = {
        refresh_token,
      };

      axios
        .post(process.env.API_URL + "refresh", body, parameters)
        .then(async (res) => {
          localStorage.setItem("userToken", res.data.data.token);
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
          return resolve(res);
        })
        .catch((err) => {
          localStorage.removeItem("userToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("admin");
          localStorage.removeItem("logout");
          window.location.href = "/";
          return reject(error);
        });
    } catch (err) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("admin");
      localStorage.removeItem("logout");
      window.location.href = "/";
      return reject(err);
    }
  });
}

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});
export { api };
