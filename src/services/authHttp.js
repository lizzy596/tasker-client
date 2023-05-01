import axios from "axios";
import authService from "./auth.service";

const addAuthHeader = (config) => {
  const { token } = authService.userValue;
  Object.assign(config, {
    withCredentials: false,
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      common: {
        'Authorization': `Bearer ${token}`
      }
    }
  });
}

const authHttp = axios.create();

authHttp.interceptors.request.use(function (config) {
  addAuthHeader(config);
  return config;
}, function (error) {
  return Promise.reject(error);
});


authHttp.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const { config } = error;
  if (!config) {
    return Promise.reject(error);
  }

  const authError = error.response.status >= 400 && error.response.status < 404


  if (authError && !config._retry) {
    try {
      await authService.refreshToken();
      config._retry = true;
      addAuthHeader(config);
      return authHttp(config)

    } catch {
      console.log("Caught");
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

export default authHttp;