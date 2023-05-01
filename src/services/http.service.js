import axios from "axios";



export const http = axios.create({
  withCredentials: false,
  baseURL: import.meta.env.VITE_API_URL,
});


export function createCaller(options) {
  const authHttp = axios.create({
    withCredentials: false,
    ...options,
  });
  //authHttp.interceptors.response.use(null, interceptorCallback);

  return authHttp;
}

export function createAuthCaller(token) {
  const axiosCaller = axios.create({
    withCredentials: false,
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      common: {
        'Authorization': `Bearer ${token}`
      }
    }
  });
  return axiosCaller;
}



const exports = {
  http,
  createCaller,
  createAuthCaller
}

export default exports